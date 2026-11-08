/* IKFW motion: scroll reveal, hero parallax, product slider progress. Transform/opacity only; off for reduced motion. */
(function () {
  var root = document.documentElement;
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  root.classList.add("js-motion");

  // Reveal targets, staggered within their own group.
  var sel = [".title", ".lead", ".swoosh", ".about-text > p", ".about-btns", ".about-img", ".band-in > *",
             ".pcard", ".scard", ".reach-info > *", ".ri", ".form", ".mapcard", ".fgrid > div"];
  var els = [];
  sel.forEach(function (s) {
    document.querySelectorAll(s).forEach(function (e) { if (els.indexOf(e) < 0) els.push(e); });
  });
  var perParent = new Map();
  els.forEach(function (e) {
    var n = perParent.get(e.parentNode) || 0;
    perParent.set(e.parentNode, n + 1);
    e.setAttribute("data-rv", "");
    e.style.setProperty("--d", Math.min(n * 110, 440) + "ms");
  });

  if (reduce || !("IntersectionObserver" in window)) {
    root.classList.remove("js-motion");
    els.forEach(function (e) { e.classList.add("in"); e.removeAttribute("data-rv"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  if (reduce) return;

  // Hero parallax: one rAF per frame, a single CSS variable on the slider.
  var slider = document.querySelector(".slider");
  var ticking = false, lastP = 0;
  function parallax() {
    ticking = false;
    if (!slider) return;
    var r = slider.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    var p = Math.max(-60, Math.min(60, -r.top * 0.16));
    if (Math.abs(p - lastP) < 0.6) return;
    lastP = p;
    slider.style.setProperty("--py", p.toFixed(1) + "px");
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  parallax();

  // Product slider progress line (phones only; hidden by CSS elsewhere).
  var grid = document.querySelector(".pgrid");
  if (grid && grid.parentNode) {
    var prog = document.createElement("div");
    prog.className = "pprog";
    prog.setAttribute("aria-hidden", "true");
    var bar = document.createElement("i");
    prog.appendChild(bar);
    grid.parentNode.insertBefore(prog, grid.nextSibling);
    var gt = false;
    function gridProgress() {
      gt = false;
      var max = grid.scrollWidth - grid.clientWidth;
      var ratio = max > 0 ? (grid.scrollLeft / max) : 1;
      var w = 0.25 + 0.75 * Math.min(1, Math.max(0, ratio));
      bar.style.transform = "scaleX(" + (max > 0 ? w : 1).toFixed(3) + ")";
    }
    grid.addEventListener("scroll", function () { if (!gt) { gt = true; requestAnimationFrame(gridProgress); } }, { passive: true });
    gridProgress();
  }
})();
