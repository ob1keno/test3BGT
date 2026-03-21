// Таймер обратного отсчета
(function(){
  let h=23,m=47,s=12;
  const th=document.getElementById('t-h'), tm=document.getElementById('t-m'), ts=document.getElementById('t-s');
  if(!th) return;
  setInterval(()=>{
    s--; if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;}
    th.textContent=String(h).padStart(2,'0');
    tm.textContent=String(m).padStart(2,'0');
    ts.textContent=String(s).padStart(2,'0');
  },1000);
})();

// Анимация прогресс-баров при скролле
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach(b=>{
        const w = b.dataset.w || '0%';
        b.style.width = w;
      });
    }
  });
},{threshold:.3});

document.querySelectorAll('.progress-list').forEach(el=>observer.observe(el));

// Выбор комплектации
function selectOption(el, price){
  document.querySelectorAll('.order-option').forEach(o=>o.classList.remove('active'));
  el.classList.add('active');
}

// AOS init
if (window.AOS) {
  AOS.init({ duration: 800, once: true, offset: 100, easing: 'ease-in-out' });
}
// GSAP ScrollTrigger для прогресс-баров (если есть)
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.progress-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 80%',
      onEnter: () => {
        const w = bar.dataset.w || '0%';
        gsap.to(bar, { width: w.trim(), duration: 1.5, ease: 'power2.out' });
      },
    });
  });
}
// IntersectionObserver для .fade-up (отдельный, чтобы не конфликтовать с другим observer)
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Canvas particles в hero-блоке (отключено, заготовка)
// (function(){
//   const canvas = document.getElementById('heroCanvas');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d');
//   let width, height, particles = [];
//
//   function resize(){
//     width = canvas.width = canvas.offsetWidth;
//     height = canvas.height = canvas.offsetHeight;
//     particles = createParticles(36);
//   }
//
//   function createParticles(count){
//     const arr = [];
//     for (let i=0;i<count;i++){
//       arr.push({
//         x: Math.random()*width,
//         y: Math.random()*height,
//         r: 1 + Math.random()*1.5,
//         vx: -0.08 + Math.random()*0.16,
//         vy: -0.04 + Math.random()*0.08,
//         a: 0.25 + Math.random()*0.25,
//       });
//     }
//     return arr;
//   }
//
//   function step(){
//     ctx.clearRect(0,0,width,height);
//     ctx.fillStyle = 'rgba(138,177,125,0.9)';
//     particles.forEach(p => {
//       p.x += p.vx;
//       p.y += p.vy;
//       if (p.x < -10) p.x = width+10;
//       if (p.x > width+10) p.x = -10;
//       if (p.y < -10) p.y = height+10;
//       if (p.y > height+10) p.y = -10;
//       ctx.globalAlpha = p.a;
//       ctx.beginPath();
//       ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
//       ctx.fill();
//     });
//     ctx.globalAlpha = 1;
//     requestAnimationFrame(step);
//   }
//
//   window.addEventListener('resize', resize);
//   resize();
//   requestAnimationFrame(step);
// })();

// Canvas waves в блоке "Как принимать" (пока отключено, оставлено как заготовка)
// (function(){
//   const canvas = document.getElementById('howtoCanvas');
//   if (!canvas) return;
//   const ctx = canvas.getContext('2d');
//   let width, height;
//   let t = 0;
//
//   function resize(){
//     width = canvas.width = canvas.offsetWidth;
//     height = canvas.height = canvas.offsetHeight;
//   }
//
//   function drawWave(ampl, freq, speed, color, offsetY){
//     ctx.beginPath();
//     for (let x = 0; x <= width; x += 6){
//       const y = offsetY + Math.sin(x * freq + t * speed) * ampl;
//       if (x === 0) ctx.moveTo(x, y);
//       else ctx.lineTo(x, y);
//     }
//     ctx.strokeStyle = color;
//     ctx.lineWidth = 2;
//     ctx.stroke();
//   }
//
//   function step(){
//     ctx.clearRect(0,0,width,height);
//     const h1 = height * 0.35;
//     const h2 = height * 0.5;
//     const h3 = height * 0.65;
//
//     ctx.globalAlpha = 0.65;
//     drawWave(26, 0.012, 0.8, '#8AB17D', h1);
//
//     ctx.globalAlpha = 0.45;
//     drawWave(32, 0.009, 0.55, '#B3C9A7', h2);
//
//     ctx.globalAlpha = 0.35;
//     drawWave(22, 0.011, 0.35, '#C7D7BD', h3);
//
//     ctx.globalAlpha = 1;
//     t += 0.03;
//     requestAnimationFrame(step);
//   }
//
//   window.addEventListener('resize', resize);
//   resize();
//   requestAnimationFrame(step);
// })();

