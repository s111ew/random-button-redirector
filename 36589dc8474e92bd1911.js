import './style.css';

const README_URL = 'https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/README.md';
const SECTION_TITLE = '## A'; // Portfolio links only appear after '## A'

const initialize = async () => {
  try {
    const portfolioLinks = await fetchPortfolioLinks();
    if (portfolioLinks.length > 0) {
      await redirectToRandomLink(portfolioLinks);
    } else {
      console.warn('No portfolio links found.');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

const fetchPortfolioLinks = async (url = README_URL, sectionTitle = SECTION_TITLE) => {
  try {
    const readmeText = await fetchReadme(url);
    return extractLinksFromSection(readmeText, sectionTitle);
  } catch (error) {
    console.error('Failed to fetch portfolio links:', error);
    return [];
  }
};

const fetchReadme = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching README from ${url}:`, error);
    throw error;
  }
};

const extractLinksFromSection = (text, sectionTitle) => {
  const sectionStartIndex = text.indexOf(sectionTitle);
  if (sectionStartIndex === -1) {
    console.warn(`Section "${sectionTitle}" not found in the README.`);
    return [];
  }

  const section = text.slice(sectionStartIndex);
  const urlPattern = /\[.*?\]\((https?:\/\/[^\)]+)\)/g;
  return [...section.matchAll(urlPattern)].map(match => match[1]);
};

const redirectToRandomLink = async (linksArr) => {
  if (!Array.isArray(linksArr) || linksArr.length === 0) {
    console.warn('No links available to redirect.');
    return;
  }

  const unsortedLinks = unsortArray(linksArr);

  for (const link of unsortedLinks) {
    const isValid = await checkLinkStatus(link);
    if (isValid) {
      console.log(`Redirecting to: ${link}`);
      window.location.href = link;
      return;
    } else {
      console.warn(`Invalid link: ${link}. Trying the next one.`);
    }
  }

  console.error('No valid portfolio links found.');
};

const checkLinkStatus = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error checking link status for ${url}:`, error);
    return false;
  }
};

const unsortArray = (array) => {
  const unsorted = [...array];
  for (let i = unsortd.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unsorted[i], unsorted[j]] = [unsorted[j], unsorted[i]];
  }
  return unsorted;
};

window.addEventListener('load', initialize);