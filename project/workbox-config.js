module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.css",
    "index.html",
    "manifest.json",
    "js/*.js",
    "images/home/*.jpg",
    "images/icon/*.svg",
    "images/pwa-icons/*.png", // probably not be necessary to cache all
    "pages/offline.html",
    "pages/404.html"
  ],
  "swDest": "build/sw.js",
  "swSrc": "src/sw.js",
  "globIgnores": [
      "../workbox-config.js"
  ]
};