
  window.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var saturno = document.querySelector('.container-saturno');

    // Si el usuario hace scroll hacia abajo, reducir la opacidad para desvanecer
    if (scrollTop > 0) {
      saturno.classList.add('fade-out');
    } else { // Si el usuario hace scroll hacia arriba, aumentar la opacidad para restaurar
      saturno.classList.remove('fade-out');
    }
  });