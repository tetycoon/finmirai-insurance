/**
 * Scroll-reveal + parallax runtime, inlined at the end of <body> (see app/layout.tsx).
 *
 * Why an inline script and not a React effect: effects only run after hydration, which can take
 * seconds on slow phones — anything scrolled into view before then would stay hidden. This runs
 * as soon as the HTML is parsed, and a MutationObserver picks up content from client-side
 * navigation. ~1 KB, transform/opacity only, one IntersectionObserver for the whole page.
 *
 * - [data-reveal]   → gets data-revealed="true" when it enters the viewport (CSS animates it).
 * - [data-parallax] → drifts down at `factor` × scroll speed while on screen (0 at page top).
 * - prefers-reduced-motion or no IntersectionObserver → everything revealed at once, no parallax.
 */
export const motionScript = `(function () {
  var d = document, w = window, SEL = '[data-reveal]:not([data-revealed])';
  function revealAll() { d.querySelectorAll(SEL).forEach(function (e) { e.setAttribute('data-revealed', 'true'); }); }
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in w)) {
    revealAll();
    new MutationObserver(revealAll).observe(d.documentElement, { childList: true, subtree: true });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.setAttribute('data-revealed', 'true'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  var layers = [];
  function scan() {
    d.querySelectorAll(SEL).forEach(function (e) { if (!e.__finObs) { e.__finObs = 1; io.observe(e); } });
    layers = [].slice.call(d.querySelectorAll('[data-parallax]'));
    update();
  }
  var frame = 0;
  function update() {
    frame = 0;
    var vh = w.innerHeight, y = w.scrollY;
    layers.forEach(function (el) {
      if (el.__finTop == null) { var r = el.getBoundingClientRect(); el.__finTop = r.top + y; el.__finH = r.height; }
      if (y + vh < el.__finTop || y > el.__finTop + el.__finH) return;
      var k = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      el.style.transform = 'translate3d(0,' + ((y - Math.max(0, el.__finTop - vh)) * k).toFixed(1) + 'px,0)';
    });
  }
  var t;
  new MutationObserver(function () { clearTimeout(t); t = setTimeout(scan, 50); })
    .observe(d.documentElement, { childList: true, subtree: true });
  w.addEventListener('scroll', function () { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
  scan();
})();`;
