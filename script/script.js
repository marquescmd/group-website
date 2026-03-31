// Pegadinha do botão
const button = document.getElementById('evasive-button');

button.addEventListener('mouseenter', function() {
  const randomX = Math.random() * (window.innerWidth - 200);
  const randomY = Math.random() * (window.innerHeight - 100);

  button.style.position = 'fixed';
  button.style.left = randomX + 'px';
  button.style.top = randomY + 'px';
  button.style.zIndex = '1000';
});

// Transição ao clicar no perfil
const profileLinks = document.querySelectorAll('.profile a');
const transitionOverlay = document.getElementById('transition-overlay');

profileLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    // Ativa a transição (fade in escuro)
    transitionOverlay.classList.add('active');
    
    // Redireciona após a transição
    setTimeout(function() {
      window.location.href = href;
    }, 800);
  });
});

