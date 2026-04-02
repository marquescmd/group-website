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

