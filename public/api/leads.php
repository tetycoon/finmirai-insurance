<?php
/**
 * Finmirai Lead Processor for cPanel Hosting
 * Handles form submissions from /api/leads
 */

declare(strict_types=1);

// Prevent direct script errors leaking in production
ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');

// Allow same-origin and safe methods
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

// 1. Read input and enforce maximum 25KB body size
$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 25000) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Request too large.']);
    exit;
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON request.']);
    exit;
}

// 2. Honeypot check: If the hidden 'website' field is populated, silently acknowledge and drop
if (!empty($payload['website'])) {
    echo json_encode(['ok' => true, 'reference' => 'FMR-RECEIVED']);
    exit;
}

$type = isset($payload['type']) && is_string($payload['type']) ? trim($payload['type']) : 'insurance';
$data = isset($payload['data']) && is_array($payload['data']) ? $payload['data'] : [];
$meta = isset($payload['meta']) && is_array($payload['meta']) ? $payload['meta'] : [];

$validTypes = ['insurance', 'quote', 'corporate', 'claim', 'advisor', 'callback'];
if (!in_array($type, $validTypes, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid lead type.']);
    exit;
}

// 3. Generate Reference Number: FMR-{TYPE}-{YYMMDD}-{RAND}
$prefixMap = [
    'insurance' => 'INS',
    'quote'     => 'QTE',
    'corporate' => 'CORP',
    'claim'     => 'CLM',
    'advisor'   => 'ADV',
    'callback'  => 'CB',
];

$prefix = $prefixMap[$type] ?? 'INS';
$ymd = date('ymd');
try {
    $rand = strtoupper(bin2hex(random_bytes(3)));
} catch (Exception $e) {
    $rand = strtoupper(substr(md5(uniqid((string)mt_rand(), true)), 0, 6));
}
$reference = "FMR-{$prefix}-{$ymd}-{$rand}";

// 4. Identify Client Details
$clientIp = $_SERVER['HTTP_CF_CONNECTING_IP'] 
    ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
    ?? $_SERVER['REMOTE_ADDR'] 
    ?? 'unknown';
$clientIp = trim(explode(',', $clientIp)[0]);

$timestamp = date('c');

$leadRecord = [
    'id'          => uniqid('fmr_', true),
    'reference'   => $reference,
    'type'        => $type,
    'data'        => $data,
    'meta'        => $meta,
    'ip'          => $clientIp,
    'receivedAt'  => $timestamp,
];

// 5. Save lead to secure file storage
// We attempt to save outside public_html if possible, or in a protected folder
$savePaths = [
    dirname(__DIR__, 2) . '/leads.jsonl',              // Above public_html (most secure on cPanel)
    dirname(__DIR__) . '/.data/leads.jsonl',            // Fallback inside public_html/.data/
    sys_get_temp_dir() . '/finmirai_leads.jsonl',       // System temp directory
];

$saved = false;
foreach ($savePaths as $filePath) {
    $dir = dirname($filePath);
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
    }
    $line = json_encode($leadRecord, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n";
    if (@file_put_contents($filePath, $line, FILE_APPEND | LOCK_EX) !== false) {
        $saved = true;
        break;
    }
}

// 6. Send Email Notification via cPanel Local Mail Server
$recipientEmail = ($type === 'advisor') 
    ? 'advisors@finmiraiindia.com' 
    : 'support@finmiraiindia.com';

$subject = "[Finmirai Lead] {$reference} - " . ucfirst($type) . " Request";

$customerName  = htmlspecialchars((string)($data['fullName'] ?? $data['name'] ?? $data['claimantName'] ?? $data['contactPerson'] ?? 'Valued Customer'), ENT_QUOTES, 'UTF-8');
$customerPhone = htmlspecialchars((string)($data['phone'] ?? 'Not provided'), ENT_QUOTES, 'UTF-8');
$customerEmail = htmlspecialchars((string)($data['email'] ?? 'Not provided'), ENT_QUOTES, 'UTF-8');
$customerCity  = htmlspecialchars((string)($data['city'] ?? $data['location'] ?? 'Not provided'), ENT_QUOTES, 'UTF-8');

$htmlRows = '';
foreach ($data as $key => $val) {
    if ($key === 'consent' || $key === 'declaration' || $key === 'website') continue;
    $label = ucwords(preg_replace('/(?<!\ )[A-Z]/', ' $0', $key));
    if (is_array($val)) {
        $valStr = implode(', ', array_map('strval', $val));
    } else {
        $valStr = (string)$val;
    }
    $htmlRows .= '<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b;width:35%;">' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</td>';
    $htmlRows .= '<td style="padding:8px 12px;border:1px solid #e2e8f0;color:#334155;">' . nl2br(htmlspecialchars($valStr, ENT_QUOTES, 'UTF-8')) . '</td></tr>';
}

$pageSubmitted = htmlspecialchars((string)($meta['page'] ?? $_SERVER['HTTP_REFERER'] ?? '/'), ENT_QUOTES, 'UTF-8');

$emailBody = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background-color:#f8fafc;padding:24px;margin:0;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #cbd5e1;overflow:hidden;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
    <div style="background:#0b1b36;padding:20px 24px;color:#ffffff;">
      <h2 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;">Finmirai Insurance Brokers</h2>
      <p style="margin:4px 0 0 0;font-size:14px;color:#d4af37;font-weight:600;">New Form Submission: {$reference}</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;font-size:15px;color:#334155;">A new <strong>{$type}</strong> request has been received on <strong>finmiraiindia.com</strong>.</p>
      
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:20px;">
        {$htmlRows}
      </table>

      <div style="background:#f1f5f9;padding:12px 16px;border-radius:8px;font-size:13px;color:#64748b;">
        <p style="margin:2px 0;"><strong>Submission Date:</strong> {$timestamp}</p>
        <p style="margin:2px 0;"><strong>Source Page:</strong> {$pageSubmitted}</p>
        <p style="margin:2px 0;"><strong>IP Address:</strong> {$clientIp}</p>
      </div>
    </div>
    <div style="background:#f8fafc;padding:12px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center;">
      This notification was sent automatically from your website at finmiraiindia.com.
    </div>
  </div>
</body>
</html>
HTML;

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Finmirai Website <no-reply@finmiraiindia.com>\r\n";
if (!empty($customerEmail) && filter_var($customerEmail, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: {$customerEmail}\r\n";
}

// Send email notification
@mail($recipientEmail, $subject, $emailBody, $headers);

// 7. Optional: Webhook dispatch if configured via environment or local config
$webhookUrl = getenv('LEAD_WEBHOOK_URL');
if (!empty($webhookUrl)) {
    $jsonPayload = json_encode($leadRecord);
    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($jsonPayload),
    ]);
    @curl_exec($ch);
    @curl_close($ch);
}

// 8. Return standard JSON response expected by FormKit.tsx
echo json_encode([
    'ok'        => true,
    'reference' => $reference,
]);
