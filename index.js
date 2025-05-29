global.server = require('./config').VPS ? "VPS" : process.env.PWD?.includes("userland") ? "USERLAND" : process.env.PITCHER_API_BASE_URL?.includes("codesandbox") ? "CODESANDBOX" : process.env.REPLIT_USER ? "REPLIT" : process.env.AWS_REGION ? "AWS" : process.env.TERMUX_VERSION ? "TERMUX" : process.env.DYNO ? "HEROKU" : process.env.KOYEB_APP_ID ? "KOYEB" : process.env.GITHUB_SERVER_URL ? "GITHUB" : process.env.RENDER ? "RENDER" : process.env.RAILWAY_SERVICE_NAME ? "RAILWAY" : process.env.VERCEL ? "VERCEL" : process.env.DIGITALOCEAN_APP_NAME ? "DIGITALOCEAN" : process.env.AZURE_HTTP_FUNCTIONS ? "AZURE" : process.env.NETLIFY ? "NETLIFY" : process.env.FLY_IO ? "FLY_IO" : process.env.CF_PAGES ? "CLOUDFLARE" : process.env.SPACE_ID ? "HUGGINGFACE" : require("os").platform().toUpperCase();
const http = require('http');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const { config, Jarvis, removeFiles } = require("./lib");
const url = server === "RENDER" ? process.env.RENDER_EXTERNAL_URL : server === "KOYEB" ? "https://" + KOYEB_PUBLIC_DOMAIN : false;

process.env.NODE_OPTIONS = `--max-old-space-size=${Math.floor((require('os').totalmem() / (1024 * 1024)) * 0.6)}`;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is Running!');
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


Jarvis({ isStarted: true });

setInterval(() => {
  removeFiles("./");
  removeFiles("./lib/temp");
  if (!url) return;
  axios.get(url, {
    timeout: 5000,
    headers: { 'User-Agent': 'Uptime-Bot' },
    validateStatus: s => s < 500
  }).then(r =>
    console.log(`[${new Date().toISOString()}] Up! ${r.status}`)
  ).catch(e =>
    console.log(`[${new Date().toISOString()}] Down! ${e.message}`)
  );
}, 5 * 60 * 1000);
