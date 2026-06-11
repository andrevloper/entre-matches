var BASE = 37;
var bumpsEl = document.querySelectorAll('.bump');
var totalEl = document.getElementById('total');
var btnComprar = document.getElementById('btn-comprar');
var notaHotmart = document.getElementById('nota-hotmart');
var plataformaAtiva = 'eduzz';

var LINKS = {
  hotmart: {
    '':                  'https://pay.hotmart.com/K106274558U',
    'feminino':          'https://pay.hotmart.com/L106275018N',
    'masculino':         'https://pay.hotmart.com/W106275453U',
    'feminino+masculino':'https://pay.hotmart.com/B106275504O'
  },
  eduzz: {
    '':                  'https://chk.eduzz.com/7WXGVVX40A',
    'feminino':          'https://chk.eduzz.com/VWGN88YV07',
    'masculino':         'https://chk.eduzz.com/G96R77GYW1',
    'feminino+masculino':'https://chk.eduzz.com/Z0B1EEY49A'
  }
};

function upd() {
  var total = BASE;
  var selecionados = [];

  bumpsEl.forEach(function(b) {
    if (b.checked) {
      total += Number(b.dataset.price);
      selecionados.push(b.dataset.bump);
    }
  });

  totalEl.textContent = 'R$' + total;

  var chave = selecionados.sort().join('+');
  var links = LINKS[plataformaAtiva];
  btnComprar.href = links[chave] || links[''];

}

function setPlataforma(plat) {
  plataformaAtiva = plat;

  document.querySelectorAll('.plat-btn').forEach(function(btn) {
    var ativo = btn.dataset.plat === plat;
    var cor = btn.style.getPropertyValue('--plat-color') || '#888';
    btn.style.borderColor = ativo ? cor : '#e5e7eb';
    btn.style.backgroundColor = ativo ? cor + '1a' : '';
    btn.style.boxShadow = ativo ? '0 0 0 3px ' + cor + '33' : '';
  });

  upd();
}

document.querySelectorAll('.plat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() { setPlataforma(this.dataset.plat); });
});

bumpsEl.forEach(function(b) { b.addEventListener('change', upd); });

setPlataforma('hotmart');

document.getElementById('year').textContent = new Date().getFullYear();

var io = new IntersectionObserver(function(es) {
  es.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
