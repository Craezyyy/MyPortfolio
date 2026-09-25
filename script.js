document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));

// Small pointer response on clickable project cards. Keyboard and touch retain normal links.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduceMotion.matches) {
  document.querySelectorAll('.focus-board').forEach(board => {
    board.addEventListener('pointermove', event => {
      const box = board.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      board.style.transform = `perspective(850px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    });
    board.addEventListener('pointerleave', () => { board.style.transform = ''; });
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      card.style.transform = `perspective(850px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});
