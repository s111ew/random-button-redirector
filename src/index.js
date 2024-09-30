import data from './links.json' assert { type: 'json' }

function redirectRandomly() {
  const randomIndex = Math.floor(Math.random() * data.links.length);
  const randomLink = data.links[randomIndex];
  window.location.href = randomLink;
  console.log(randomLink)
}

window.onload = redirectRandomly;