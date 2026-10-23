(function () {
  var form = document.getElementById("enquiry");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
    var lines = ["Namaste Imran Khan Fabrication Works, enquiry:"];
    if (v("name")) lines.push("Name: " + v("name"));
    lines.push("Work: " + v("service"));
    if (v("place")) lines.push("Site: " + v("place"));
    if (v("msg")) lines.push("Details: " + v("msg"));
    var url = "https://wa.me/919166782730?text=" + encodeURIComponent(lines.join("\n"));
    window.location.href = url;
  });
})();

(function () {
  var slides = document.querySelectorAll(".slide"), dots = document.querySelectorAll(".sl-dots button"), i = 0, t;
  function go(n) { slides[i].classList.remove("is-active"); dots[i].classList.remove("is-active"); i = (n + slides.length) % slides.length; slides[i].classList.add("is-active"); dots[i].classList.add("is-active"); }
  function play() { clearInterval(t); t = setInterval(function () { go(i + 1); }, 5000); }
  dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); play(); }); });
  var p = document.querySelector(".sl-prev"), n = document.querySelector(".sl-next");
  if (p) p.addEventListener("click", function () { go(i - 1); play(); });
  if (n) n.addEventListener("click", function () { go(i + 1); play(); });
  if (slides.length > 1) play();
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("nav");
  btn.addEventListener("click", function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); nav.querySelectorAll("a").forEach(function(x){x.classList.remove("active")}); a.classList.add("active"); }); });
})();
