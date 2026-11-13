(function () {
  'use strict';
  // Dates and clocks: London and Nicosia, in English and Greek.
  var now = new Date();
  function fmt(opts, lang) { try { return new Intl.DateTimeFormat(lang, opts).format(now); } catch (e) { return null; } }
  var en = fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London' }, 'en-GB');
  var gr = fmt({ weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/London' }, 'el-GR');
  if (en) document.getElementById('date-en').textContent = en;
  if (gr) document.getElementById('date-gr').textContent = gr.charAt(0).toUpperCase() + gr.slice(1);
  function tick() {
    now = new Date();
    var l = fmt({ hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }, 'en-GB');
    var n = fmt({ hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Nicosia' }, 'en-GB');
    if (l) document.getElementById('t-ldn').textContent = l;
    if (n) document.getElementById('t-nic').textContent = n;
  }
  tick();
  setTimeout(function () { tick(); setInterval(tick, 60000); }, (60 - now.getSeconds()) * 1000);

  // Phone menu
  var btn = document.querySelector('.menu-btn'), nav = document.getElementById('mainnav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }
})();
