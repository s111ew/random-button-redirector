import './style.css';

const README_URL = 'https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/README.md';
const SECTION_TITLE = '## A'; // Portfolio links only appear after ##A string

function redirectToRandomLink(linksArr) {
  if (!Array.isArray(linksArr) || linksArr.length === 0) {
    console.warn('No links available to redirect.');
    return;
  }
  const randomIndex = Math.floor(Math.random() * linksArr.length);
  const randomLink = linksArr[randomIndex];
  window.location.href = randomLink;
}

async function fetchPortfolioLinks(url = README_URL, sectionTitle = SECTION_TITLE) {
  try {
    const readmeText = await fetchReadme(url);
    return extractLinksFromSection(readmeText, sectionTitle);
  } catch (error) {
    console.error('Failed to fetch portfolio links:', error);
    return [];
  }
}

async function fetchReadme(url) {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function extractLinksFromSection(text, sectionTitle) {
  const sectionStartIndex = text.indexOf(sectionTitle);
  
  if (sectionStartIndex === -1) {
    console.warn(`Section "${sectionTitle}" not found in the README.`);
    return [];
  }

  const section = text.slice(sectionStartIndex);
  const urlPattern = /\[.*?\]\((https?:\/\/[^\)]+)\)/g;

  return [...section.matchAll(urlPattern)].map(match => match[1]);
}

async function initialize() {
  try {
    const portfolioLinks = await fetchPortfolioLinks();
    
    if (portfolioLinks.length > 0) {
      redirectToRandomLink(portfolioLinks);
    } else {
      console.log('No portfolio links found.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

window.addEventListener('load', initialize);