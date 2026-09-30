/* Hushwell — scripts propios (sin librerías) */
(function () {
  function initReveal() {
    var els = document.querySelectorAll('.hw-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('hw-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('hw-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  function initGaleria(root) {
    var principal = root.querySelector('[data-hw-principal]');
    if (!principal) return;
    root.querySelectorAll('[data-hw-mini]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        principal.style.opacity = '0';
        setTimeout(function () {
          principal.src = btn.getAttribute('data-src');
          principal.srcset = '';
          principal.alt = btn.getAttribute('data-alt') || '';
          principal.style.opacity = '1';
        }, 150);
        root.querySelectorAll('[data-hw-mini]').forEach(function (b) { b.setAttribute('aria-current', 'false'); });
        btn.setAttribute('aria-current', 'true');
      });
    });
  }

  function formatMoney(cents, fmt) {
    var v = (cents / 100).toFixed(2);
    var parts = v.split('.');
    var entero = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (fmt || '${{amount}}').replace(/\{\{\s*amount\s*\}\}/, entero + '.' + parts[1])
      .replace(/\{\{\s*amount_no_decimals\s*\}\}/, entero)
      .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/, parts[0] + ',' + parts[1]);
  }

  function initVariantes(root) {
    var data = root.querySelector('[data-hw-variantes]');
    if (!data) return;
    var variantes = JSON.parse(data.textContent);
    var fmt = root.getAttribute('data-money-format');
    var selects = root.querySelectorAll('[data-hw-opcion]');
    var inputId = root.querySelector('input[name="id"]');
    var precio = root.querySelector('[data-hw-precio]');
    var tachado = root.querySelector('[data-hw-tachado]');
    var boton = root.querySelector('[data-hw-boton]');
    var textoBoton = boton ? boton.getAttribute('data-texto') : '';
    var textoAgotado = boton ? boton.getAttribute('data-agotado') : '';
    selects.forEach(function (sel) {
      sel.addEventListener('change', function () {
        var elegidas = Array.prototype.map.call(selects, function (s) { return s.value; });
        var v = variantes.find(function (x) {
          return x.options.every(function (o, i) { return o === elegidas[i]; });
        });
        if (!v) {
          if (boton) { boton.disabled = true; boton.querySelector('span').textContent = textoAgotado; }
          return;
        }
        inputId.value = v.id;
        if (precio) precio.textContent = formatMoney(v.price, fmt);
        if (tachado) {
          if (v.compare_at_price && v.compare_at_price > v.price) { tachado.textContent = formatMoney(v.compare_at_price, fmt); tachado.hidden = false; }
          else tachado.hidden = true;
        }
        if (boton) {
          boton.disabled = !v.available;
          boton.querySelector('span').textContent = v.available ? textoBoton : textoAgotado;
        }
      });
    });
  }

  function initCantidad(root) {
    var input = root.querySelector('[data-hw-cantidad]');
    if (!input) return;
    root.querySelectorAll('[data-hw-cant-btn]').forEach(function (b) {
      b.addEventListener('click', function () {
        var n = parseInt(input.value, 10) || 1;
        n += parseInt(b.getAttribute('data-hw-cant-btn'), 10);
        input.value = Math.max(1, n);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    document.querySelectorAll('[data-hw-producto]').forEach(function (root) {
      initGaleria(root);
      initVariantes(root);
      initCantidad(root);
    });
  });
})();
