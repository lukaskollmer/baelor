const main = async () => {
  let response;

  try {
    response = await fetch(`http://localhost:6215/${location.hostname}`)
  } catch (err) {
    console.error(`Unable to find the baelor server (${err})`);
  }

  const scripts = JSON.parse(await response.text());

  for (const [domain, script] of Object.entries(scripts)) {
    console.log(`[lukaskollmer/baelor] Running custom script for domain '${domain}'`);
    eval(script);
  }
};

main();
