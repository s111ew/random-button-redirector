# Random Developer Portfolio Redirector

This GitHub Pages site randomly redirects users to a developer portfolio from the [developer-portfolios repository](https://github.com/emmabostian/developer-portfolios). It works by scraping the README of the original repo to extract portfolio links, then sending a HEAD request to validate the site is live before redirecting the user.

#### How It Works

- Scrapes the README from the source repository.
- Extracts portfolio links.
- Sends a HEAD request to validate live URLs.
- Redirects to a random, live portfolio.

#### Usage

Visit the [GitHub Pages site](https://s111ew.github.io/random-button-redirector/) to be redirected to a random portfolio
