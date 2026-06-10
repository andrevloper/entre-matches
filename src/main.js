var BASE=37;
  var bumps=document.querySelectorAll('.bump');
  var totalEl=document.getElementById('total');
  function upd(){var t=BASE;bumps.forEach(function(b){if(b.checked)t+=Number(b.dataset.price)});totalEl.textContent='R$'+t;}
  bumps.forEach(function(b){b.addEventListener('change',upd)});
  document.getElementById('year').textContent=new Date().getFullYear();
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});