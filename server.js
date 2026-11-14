const express = require('express');
const path = require('path');
const Unblocker = require('unblocker');

const app = express();
const PORT = process.env.PORT || 8080;

// Unblocker fetches the requested page, then rewrites its links, images,
// scripts and forms so they keep loading through /proxy/ instead of directly.
const unblocker = new Unblocker({
  prefix: '/proxy/',
  requestMiddleware: [],
  responseMiddleware: [],
});

// Must come before other routes so /proxy/* is handled first.
app.use(unblocker);

// Homepage with the address bar.
app.use(express.static(path.join(__dirname, 'public')));

// Fallback: /go?url=example.com redirects into the proxy.
app.get('/go', (req, res) => {
  let target = (req.query.url || '').trim();
  if (!target) return res.redirect('/');
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
  res.redirect('/proxy/' + target);
});

const server = app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});

// Lets websockets (chat apps, live feeds) work through the proxy too.
server.on('upgrade', unblocker.onUpgrade);
