const { JSDOM } = require("jsdom");

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);

    if(resp.status  > 399){
      console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
      return
    }
    const contentType = resp.headers.get("content-type")
    if (!contentType.includes("text/html")){
      console.log(`non html response, content type: ${contentType}, on page: ${currentURL}`)
      return
    }

    console.log(await resp.text());
  } catch (err) {
    console.log(`error in fetch: ${err.message}, on page : ${currentURL}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];

  const dom = new JSDOM(htmlBody);
  const linkELements = dom.window.document.querySelectorAll("a");

  for (const linkELement of linkELements) {
    if (linkELement.href.slice(0, 1) == "/") {
      // it's relative
      try {
        const urlObj = new URL(`${baseURL}${linkELement.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative URL: ${err.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(linkELement.href);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute URL: ${err.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  // slice(-1) means the last value of the string or array
  if (hostPath.length > 0 && hostPath.slice(-1) == "/") {
    return hostPath.slice(0, -1); // It returns subset of a string or an array from 0th index to lastIndex
  }

  return hostPath;
}

// This will make the function available to other
// js file that wants to import it
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
