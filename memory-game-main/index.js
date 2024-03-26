let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
  'pink',
  'yellow',
  'red',
  'cyan',
  'blue',
  'teal',
  'orange',
  'green',
];

const cards = [...document.querySelectorAll('.card')]; // Corrected selector
for (let color of colors) {
  const cardAIndex = Math.floor(Math.random() * cards.length);
  const cardA = cards.splice(cardAIndex, 1)[0];
  cardA.classList.add(color);
  cardA.setAttribute('data-color', color);

  const cardBIndex = Math.floor(Math.random() * cards.length);
  const cardB = cards.splice(cardBIndex, 1)[0];
  cardB.classList.add(color);
  cardB.setAttribute('data-color', color);
}

function onCardClicked(e) {
  const target = e.currentTarget;

  if (preventClick || target === clickedCard || target.classList.contains('done')) {
    return;
  }

  target.classList.remove('color-hidden');
  target.classList.add('done');

  if (!clickedCard) {
    // If we haven't clicked a card, keep track of the card, display its color
    clickedCard = target;
  } else {
    // If we have already clicked a card, check if the new card matches the old card color
    preventClick = true;
    if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
      setTimeout(() => {
        clickedCard.classList.remove('done');
        target.classList.remove('done');
        clickedCard.classList.add('color-hidden');
        target.classList.add('color-hidden');
        clickedCard = null;
        preventClick = false;
      }, 500);
    } else {
      combosFound++;
      clickedCard = null;
      if (combosFound === 8) {
        alert('YOU WIN');
      }
    }
  }
}

cards.forEach(card => {
  card.addEventListener('click', onCardClicked);
});

