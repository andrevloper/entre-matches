var BASE = 37;
var bumps = document.querySelectorAll('.bump');
var totalEl = document.getElementById('total');
var btnComprar = document.getElementById('btn-comprar');

var LINKS = {
  '':              'https://chk.eduzz.com/7WXGVVX40A',
  'feminino':      'https://chk.eduzz.com/VWGN88YV07',
  'masculino':     'https://chk.eduzz.com/G96R77GYW1',
  'feminino+masculino': 'https://chk.eduzz.com/Z0B1EEY49A'
};

function upd() {
  var total = BASE;
  var selecionados = [];
  bumps.forEach(function(b) {
    if (b.checked) {
      total += Number(b.dataset.price);
      selecionados.push(b.dataset.bump);
    }
  });
  totalEl.textContent = 'R$' + total;
  var chave = selecionados.sort().join('+');
  btnComprar.href = LINKS[chave] || LINKS[''];
}

bumps.forEach(function(b) { b.addEventListener('change', upd); });

document.getElementById('year').textContent = new Date().getFullYear();

var io = new IntersectionObserver(function(es) {
  es.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
