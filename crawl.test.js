const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://example.com.dev/path";
  const actual = normalizeURL(input);
  const expected = "example.com.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://example.com.dev/path/";
  const actual = normalizeURL(input);
  const expected = "example.com.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://EXAMPLE.com.dev/path";
  const actual = normalizeURL(input);
  const expected = "example.com.dev/path";

  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://example.com.dev/path/";
  const actual = normalizeURL(input);
  const expected = "example.com.dev/path";

  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://example.com.dev/path/">
        example dev 
        </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://example.com.dev/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://example.com.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        example dev 
        </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://example.com.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://example.com.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://example.com.dev/path1/">
        example dev I
      </a>
      <a href="/path2/">
        example dev II
      </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://example.com.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://example.com.dev/path1/",
    "https://example.com.dev/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="Invalid">
         Invalid URL
        </a>
    </body>
  </html>
  `;
  const inputBaseURL = "https://example.com.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
