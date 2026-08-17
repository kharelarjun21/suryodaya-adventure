document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  /* ---------- Active nav link based on current page ---------- */
  var current = (window.location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = cat === 'all' || item.getAttribute('data-category') === cat;
          item.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('.lightbox-img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var lbClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var toneClass = item.querySelector('.g-tone') ? item.querySelector('.g-tone').className : '';
        lbImg.className = 'lightbox-img ' + (item.getAttribute('data-tone') || '');
        lbImg.innerHTML = item.querySelector('.media-icon') ? item.querySelector('.media-icon').outerHTML : '';
        lbCaption.innerHTML = '<strong>' + (item.getAttribute('data-title') || '') + '</strong><br><span class="small">' + (item.getAttribute('data-desc') || '') + '</span>';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Contact form (static/no backend: validates + shows success) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var successBox = document.querySelector('.form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = form.querySelector('#name').value.trim();
      if (successBox) {
        successBox.querySelector('span').textContent =
          'Thank you, ' + name + '! Your enquiry has been prepared. Please tap "Send via WhatsApp" below to deliver it instantly, or we will reach out by phone/email shortly.';
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      var wa = document.getElementById('wa-send');
      if (wa) {
        var msg = 'Hello Suryodaya Adventures, I would like to enquire about a visit.%0A' +
          'Name: ' + name + '%0A' +
          'Phone: ' + (form.querySelector('#phone') ? form.querySelector('#phone').value.trim() : '') + '%0A' +
          'Preferred date: ' + (form.querySelector('#date') ? form.querySelector('#date').value : '') + '%0A' +
          'Group size: ' + (form.querySelector('#guests') ? form.querySelector('#guests').value : '') + '%0A' +
          'Activity interest: ' + (form.querySelector('#activity') ? form.querySelector('#activity').value : '') + '%0A' +
          'Message: ' + (form.querySelector('#message') ? form.querySelector('#message').value.trim() : '');
        wa.href = 'https://wa.me/9779840823060?text=' + msg;
      }
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
