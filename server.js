const {readFileSync} = require('fs');
const {createServer} = require('http');

const hostname = '127.0.0.1';
const port = 6215;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let scripts = {};
  try {
    const split = req.url.replace('/', '').split('.');

    // 2 because we skip the last element (the tld)
    for (let i = split.length - 2; i >= 0; i--) {
      const domain = split.slice(i, split.length).join('.');
      scripts[domain] = readFileSync(`${process.env.HOME}/.baelor/${domain}.js`, 'utf-8');
    }

  } catch (e) {}

  res.end(JSON.stringify(scripts));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
