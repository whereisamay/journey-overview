/* Amay Design System — behaviour for the two interactive components (Accordion, PhotoCarousel). No dependencies. */
window.AmayDS = (function () {
  function initAccordions(root) {
    (root || document).querySelectorAll('.faq-item').forEach(function (item) {
      var btn = item.querySelector('.faq-question');
      if (!btn || btn.dataset.dsBound) return;
      btn.dataset.dsBound = '1';
      btn.addEventListener('click', function () {
        var open = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
  }
  function initCarousels(root) {
    (root || document).querySelectorAll('.photo-carousel').forEach(function (c) {
      var track = c.querySelector('.photo-carousel-track');
      var slides = c.querySelectorAll('.photo-carousel-slide');
      var prev = c.querySelector('[data-dir="prev"]');
      var next = c.querySelector('[data-dir="next"]');
      var dotsWrap = c.querySelector('.photo-carousel-dots');
      if (!track || !slides.length || c.dataset.dsBound) return;
      c.dataset.dsBound = '1';
      var dots = [];
      slides.forEach(function (_, i) {
        var d = document.createElement('button');
        d.type = 'button';
        d.setAttribute('aria-label', 'Go to photo ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        if (dotsWrap) dotsWrap.appendChild(d);
        dots.push(d);
      });
      function index() { return Math.round(track.scrollLeft / track.clientWidth); }
      function go(i) { track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' }); }
      function sync() {
        var i = index();
        dots.forEach(function (d, j) { d.classList.toggle('is-active', j === i); });
        if (prev) prev.disabled = i === 0;
        if (next) next.disabled = i === slides.length - 1;
      }
      if (prev) prev.addEventListener('click', function () { go(Math.max(0, index() - 1)); });
      if (next) next.addEventListener('click', function () { go(Math.min(slides.length - 1, index() + 1)); });
      track.addEventListener('scroll', function () { window.requestAnimationFrame(sync); });
      sync();
    });
  }
  return { version: '1.0.0', initAccordions: initAccordions, initCarousels: initCarousels };
})();
