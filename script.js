const cards = document.querySelectorAll('.card');

let hasFlipped = false;
let lockedBoard = false;
let firstTouch;
let secondTouch;

function flip() {
    if (lockedBoard) return;
    if (this === firstTouch) return;
    this.classList.add('flip');

    if (!hasFlipped) {
        // First click 'touch'
        hasFlipped = true;
        firstTouch = this;

        return; 
    } else {
        // Second click
        hasFlipped = false;
        secondTouch = this;
        // Call match checker function
        checkMatch();

    }
}

function checkMatch() {
    // Do cards match?
    if (firstTouch.dataset.identifier === secondTouch.dataset.identifier) {
        disableCards();
    } else {
        unFlip();
    }
};

function disableCards() {
    // It's a match
    firstTouch.removeEventListener('click', flip)
    secondTouch.removeEventListener('click', flip)
}

function unFlip() {
    //not a match
    lockedBoard = true;
    setTimeout(() => {
        firstTouch.classList.remove('flip');
        secondTouch.classList.remove('flip');

        lockedBoard = false;
    }, 1000);
}

function resetBoard() {
    hasFlipped = false;
    lockedBoard = false;
    firstTouch = null;
    secondTouch = null;
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

for (let counter of cards) {
    counter.addEventListener('click', flip)

}

// Start Button Functionality
// const start = document.querySelector('#start');
// start.addEventListener('click', shuffle);

// Reset Button Functionality
const reset = document.querySelector('#reset')

function reload() {
    window.location.reload();
}

 reset.addEventListener('click', reload)

