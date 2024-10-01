import './style.css'

async function redirectRandomly(linksArr) {
  const randomIndex = Math.floor(Math.random() * linksArr.length);
  const randomLink = linksArr[randomIndex];
  window.location.href = randomLink;
}

async function fetchPortfolioLinks() {
  const readmeUrl = 'https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/README.md';

  try {
    const response = await fetch(readmeUrl);
    if (!response.ok) {
      throw new Error(`Error fetching the README: ${response.statusText}`);
    }

    const readmeText = await response.text();

    return extractLinks(readmeText)

  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

// Find the pos of '#AA' in the README bc all portfolio links come after
function extractLinks(text, sectionTitle = '## A') {
  const sectionStartIndex = text.indexOf(sectionTitle);
  
  if (sectionStartIndex === -1) {
    return [];
  }

  const section = text.slice(sectionStartIndex);

  const urlPattern = /\[.*?\]\((https?:\/\/[^\)]+)\)/g;

  const links = [...section.matchAll(urlPattern)].map(match => match[1]);

  return links;
}

window.onload = async () => {
  const portfolioLinks = await fetchPortfolioLinks();
  if (portfolioLinks.length > 0) {
    redirectRandomly(portfolioLinks);
  } else {
    console.log('No portfolio links found.');
  }
};