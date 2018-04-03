const {createServer} = require('http');
const {readFileSync, existsSync} = require('fs');

const HOSTNAME = '127.0.0.1';
const PORT = 6215;

const filePathForDomain = domain => `${process.env.HOME}/.baelor/${domain}.js`;
const readScriptForDomain = domain => readFileSync(filePathForDomain(domain), 'utf-8');

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  let scripts = {};
  if (existsSync(filePathForDomain('default'))) {
    scripts['default'] = readScriptForDomain('default');
  }

  try {
    const split = req.url.replace('/', '').split('.');

    // 2 because we skip the last element (the tld)
    for (let i = split.length - 2; i >= 0; i--) {
      const domain = split.slice(i, split.length).join('.');
      scripts[domain] = readScriptForDomain(domain);
    }
  } catch (e) {}

  res.end(JSON.stringify(scripts));
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
