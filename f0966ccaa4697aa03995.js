import './style.css'

async function redirectRandomly(linksArr) {
  const randomIndex = Math.floor(Math.random() * linksArr.length);
  const randomLink = linksArr[randomIndex];
  window.location.href = randomLink;
}

async function fetchPortfolioLinks() {
  const readmeUrl = 'https://raw.githubusercontent.com/emmabostian/developer-portfolios/main/README.md';

  try {
    const response = await fetch(readmeUrl);
    if (!response.ok) {
      throw new Error(`Error fetching the README: ${response.statusText}`);
    }

    const readmeText = await response.text();

    // Find the pos of '#AA' in the README bc all portfolio links come after
    const aaIndex = readmeText.indexOf('#AA');
    if (aaIndex === -1) {
      console.log("No '#AA' section found.");
      return [];
    }

    // Extract only the content after '#AA' 
    const portfolioLinks = readmeText.slice(aaIndex);

    const urlRegex = /\[.*?\]\((https?:\/\/[^\)]+)\)/g;

    const urls = [];
    let match;

    while ((match = urlRegex.exec(portfolioLinks)) !== null) {
      urls.push(match[1]);
    }
    return urls;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

window.onload = async () => {
  const portfolioLinks = await fetchPortfolioLinks();
  if (portfolioLinks.length > 0) {
    redirectRandomly(portfolioLinks);
  } else {
    console.log('No portfolio links found.');
  }
};