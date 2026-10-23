import Image from "next/image";

/**
 * Homepage intro (first page load of a browser session only).
 *
 * The <head> script in app/layout.tsx adds `html.intro` before first paint when the visitor lands on "/"
 * in a fresh session (and doesn't prefer reduced motion). Without that class this overlay is display:none,
 * so returning visitors and client-side navigations never see it. The homepage renders underneath while
 * it plays; hero entrance animations are paused until it exits (see globals.css → Homepage intro).
 *
 * Sequence (after the reference animation): mark settles in → spins 360° → slides left as the wordmark
 * rises out of a mask → slogan fades in → overlay fades out at ~2.75s. Any click, key, scroll or touch skips.
 */
export function HomeIntro() {
  return (
    <>
      <div id="fin-intro" aria-hidden="true">
        <div className="intro-lockup">
          <div className="intro-mark">
            <Image src="/logo.png" alt="" width={112} height={117} loading="eager" />
          </div>
          <div className="intro-text">
            <span className="intro-mask">
              <span className="intro-line intro-line-1 font-display font-extrabold tracking-tight text-navy-900">
                Fin<span className="text-gold-500">Mirai</span>
              </span>
            </span>
            <span className="intro-mask">
              <span className="intro-line intro-line-2 font-display font-semibold uppercase text-navy-800">
                Insurance Brokers Pvt. Ltd.
              </span>
            </span>
            <p className="intro-slogan font-display font-semibold">
              <span className="text-navy-700">Protecting today.</span> <span className="text-gold-600">Securing tomorrow.</span>
            </p>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
    </>
  );
}

/**
 * Runs as soon as the overlay is parsed. Centres the mark for the spin (it starts offset by half the text
 * width, then slides into place), schedules the exit and wires up skip. The CSS var lives on <html> because
 * React ignores attribute differences there during hydration; the overlay itself is never removed from the
 * DOM, only hidden, so React's tree stays intact.
 */
const introScript = `(function () {
  var d = document.documentElement, o = document.getElementById('fin-intro');
  if (!o || !d.classList.contains('intro')) return;
  var t = o.querySelector('.intro-text');
  if (t) d.style.setProperty('--intro-shift', (t.offsetWidth + (parseFloat(getComputedStyle(t).marginLeft) || 0)) / 2 + 'px');
  var done = false, timer = setTimeout(exit, 2750), evs = ['keydown', 'wheel', 'touchstart'];
  function exit() {
    if (done) return;
    done = true;
    clearTimeout(timer);
    d.classList.remove('intro');
    d.classList.add('intro-exit');
    setTimeout(function () { d.classList.remove('intro-exit'); }, 450);
    evs.forEach(function (e) { removeEventListener(e, exit); });
  }
  evs.forEach(function (e) { addEventListener(e, exit, { passive: true }); });
  o.addEventListener('click', exit);
})();`;
