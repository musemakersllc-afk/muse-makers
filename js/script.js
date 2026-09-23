/* Muse Makers — theme toggle (brand default: dark) + header polish */
(function () {
  var t = document.querySelector('[data-theme-toggle]');
  var r = document.documentElement;
  var d = 'dark';
  r.setAttribute('data-theme', d);

  function icon(dark) {
    return dark
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (t) {
    t.innerHTML = icon(d === 'dark');
    t.setAttribute('aria-label', 'Switch to light mode');
    t.addEventListener('click', function () {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML = icon(d === 'dark');
    });
  }

  /* Subtle shadow on the header once scrolled */
  var header = document.querySelector('.header');
  var onScroll = function () {
    header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Project gallery lightbox */
(function () {
  var dlg = document.getElementById('lightbox');
  if (!dlg) return;
  var img = document.getElementById('lb-img'), title = document.getElementById('lb-title'),
      label = document.getElementById('lb-label'), count = document.getElementById('lb-count'),
      prev = document.getElementById('lb-prev'), next = document.getElementById('lb-next');
  var list = [], i = 0, alt = '';
  function show() {
    img.src = 'assets/' + list[i] + '.webp';
    img.alt = alt + ' — image ' + (i + 1) + ' of ' + list.length;
    count.textContent = list.length > 1 ? (i + 1) + ' / ' + list.length : '';
    prev.hidden = next.hidden = list.length < 2;
  }
  document.querySelectorAll('[data-images]').forEach(function (b) {
    b.addEventListener('click', function () {
      list = b.dataset.images.split(','); i = 0;
      title.textContent = b.dataset.title; label.textContent = b.dataset.label;
      alt = b.dataset.title; show(); dlg.showModal();
    });
  });
  prev.addEventListener('click', function () { i = (i - 1 + list.length) % list.length; show(); });
  next.addEventListener('click', function () { i = (i + 1) % list.length; show(); });
  document.getElementById('lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (list.length < 2) return;
    if (e.key === 'ArrowRight') next.click();
    if (e.key === 'ArrowLeft') prev.click();
  });
})();
