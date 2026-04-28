(function () {
  var els = document.querySelectorAll('section:not(.hero), .card');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
