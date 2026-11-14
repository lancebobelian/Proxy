# Passage — a simple web proxy site

## Run it on your computer
1. Install Node.js 18+ from https://nodejs.org
2. In this folder, run:
   npm install
   npm start
3. Open http://localhost:8080

## Put it online (free options)
- **Render.com**: push this folder to a GitHub repo, create a new "Web Service",
  build command `npm install`, start command `npm start`.
- **Railway.app** or **Fly.io**: same idea, they detect Node automatically.
- **A VPS** (DigitalOcean, Hetzner, etc.): copy the folder, `npm install`,
  then keep it running with `pm2 start server.js`.

The server reads the `PORT` environment variable, which these hosts set for you.

## Notes
- Sites with heavy JavaScript, logins (Google, Discord) or video (YouTube) can
  break, because the proxy has to rewrite their code on the fly. CroxyProxy
  uses a lot of custom engineering for this.
- All traffic runs through your server, so popular use = bandwidth costs.
- Free hosts may suspend proxy sites that get abused; check their terms.
