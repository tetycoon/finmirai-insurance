import os
import zipfile

def make_zip(source_dir, output_filename):
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, source_dir)
                # Standardize to forward slash for Linux/cPanel extraction
                arcname = rel_path.replace(os.sep, '/')
                zipf.write(file_path, arcname)
                print(f"Added: {arcname}")

if __name__ == "__main__":
    out_dir = os.path.join(os.getcwd(), "out")
    target_zip = os.path.join(os.getcwd(), "finmiraiindia-cpanel-public_html.zip")
    if os.path.exists(target_zip):
        os.remove(target_zip)
    make_zip(out_dir, target_zip)
    print(f"\nSuccessfully created {target_zip} (size: {os.path.getsize(target_zip)} bytes)")
