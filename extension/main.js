const main = async () => {
  try {
    const response = await fetch(`http://localhost:6215/${location.hostname}`)
    const scripts = JSON.parse(await response.text())

    for (const [domain, script] of Object.entries(scripts)) {
      console.log(`[lukaskollmer/baelor] Running custom script for domain '${domain}'`);
      eval(script);
    }
  } catch (err) {
    console.error(`Unable to find the baelor server (${err})`);
  }
};

main();
