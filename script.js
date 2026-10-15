(function () {
  'use strict';

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  menuBtn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight the nav link of the section in view
  var links = nav.querySelectorAll('a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  // Project details dialog
  var dlg = document.getElementById('detailsDialog');
  document.getElementById('detailsBtn').addEventListener('click', function () {
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  });
  document.getElementById('closeDialog').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  // Contact form: validate, then open the visitor's email app
  var form = document.getElementById('contactForm');
  var err = document.getElementById('formError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var msg = document.getElementById('message').value.trim();
    if (!name || !email || !msg) {
      err.textContent = 'Please fill in your name, email, and message.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      err.textContent = 'Enter a valid email address, like name@example.com.';
      return;
    }
    err.textContent = '';
    var body = msg + '\n\nFrom: ' + name + ' (' + email + ')';
    window.location.href = 'mailto:ronquisjoverixal@gmail.com?subject=' +
      encodeURIComponent('Portfolio message from ' + name) + '&body=' + encodeURIComponent(body);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
