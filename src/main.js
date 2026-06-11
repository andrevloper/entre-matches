var BASE = 37;
var bumpsEl = document.querySelectorAll('.bump');
var totalEl = document.getElementById('total');
var btnComprar = document.getElementById('btn-comprar');
var notaHotmart = document.getElementById('nota-hotmart');
var plataformaAtiva = 'eduzz';

var LINKS = {
  hotmart: {
    '':        'https://pay.hotmart.com/K106274558U',
    'feminino':'https://pay.hotmart.com/L106275018N'
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

  // Nota quando combo selecionado não tem link no Hotmart
  var semLink = plataformaAtiva === 'hotmart' && chave && !links[chave];
  notaHotmart.classList.toggle('hidden', !semLink);
}

function setPlataforma(plat) {
  plataformaAtiva = plat;

  document.querySelectorAll('.plat-btn').forEach(function(btn) {
    var ativo = btn.dataset.plat === plat;
    btn.style.borderColor = ativo ? 'var(--color-copper, #b87333)' : '';
    btn.style.backgroundColor = ativo ? 'rgba(184,115,51,0.1)' : '';
    btn.style.color = ativo ? 'var(--color-copper, #b87333)' : '';
    btn.style.fontWeight = ativo ? '700' : '500';
  });

  upd();
}

document.querySelectorAll('.plat-btn').forEach(function(btn) {
  btn.addEventListener('click', function() { setPlataforma(this.dataset.plat); });
});

bumpsEl.forEach(function(b) { b.addEventListener('change', upd); });

setPlataforma('eduzz');

document.getElementById('year').textContent = new Date().getFullYear();

var io = new IntersectionObserver(function(es) {
  es.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function(el) { io.observe(el); });
