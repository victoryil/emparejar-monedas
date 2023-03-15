// script.js
//

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const values = document.querySelectorAll('.number-card');
    let selectedCard = null;
    let selectedValue = null;
    let count = 0;

    function playJoyfulSound(id) {
        const audioElement = document.getElementById(id);
        audioElement.play();
    }

    // Ejemplo de uso: Llamar a la función playJoyfulSound() para reproducir el sonido




    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (selectedCard) return;
            selectedCard = card;
            card.style.backgroundColor = 'teal';
        });
    });

    values.forEach(value => {
        value.addEventListener('click', () => {
            selectedValue = value;
            console.log("haz click: " + value.dataset.value)
            if (!selectedCard) return;

            if (selectedCard.dataset.value === value.dataset.value) {
                selectedCard.classList.add('unclickable');
                value.classList.add('unclickable');
                playJoyfulSound('acierto');
                console.log("matched")
                selectedCard.style.backgroundColor = '#7cf475d2';
                value.style.backgroundColor = '#7cf475d2';
                selectedCard.style.pointerEvent = 'none';
                value.style.pointerEvent = 'none';
                selectedCard = null;
                selectedValue = null;
                count++;
                checkVictory();
            } else {
                selectedCard.style.backgroundColor = '#f26042d2';
                value.style.backgroundColor = '#f26042d2';
                console.log("reseteando")
                playJoyfulSound('error');
                setTimeout(resetCards, 500);
            }

        });
    });
    function resetCards() {
        selectedCard.style.backgroundColor = '#FFF';
        selectedValue.style.backgroundColor = '#FFF';
        selectedCard = null;
        selectedValue = null;
    }
    function checkVictory() {
        if (count == 12) {
            playJoyfulSound('victoria');
            createConfetti();
        }
    }
    function createConfetti() {
        var end = Date.now() + (15 * 1000);

        // go Buckeyes!
        


        const container = document.getElementById('confetti-container');
        container.style.zIndex = 999
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
        var myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
        });
        var colors = ['#bb0000', '#ffffff'];
        
        (function frame() {
            myConfetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          myConfetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });
        
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
    }

    // Ejemplo de uso: Llamar a la función createConfetti() para mostrar el efecto de confeti


});
