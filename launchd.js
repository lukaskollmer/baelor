// add/remove baelor from launchd
// this script is run by npm via the postinstall and preuninstall hooks

const path = require('path');
const plist = require('plist');
const {execSync} = require('child_process');
const {writeFileSync, unlinkSync} = require('fs');

const command = process.argv[2];
const launchd_plist_filepath = `${process.env.HOME}/Library/LaunchAgents/me.lukaskollmer.baelor.plist`

const launchd = cmd => execSync(`launchctl ${cmd} ${launchd_plist_filepath}`)

if (command === 'install') {
  const launchd_data = {
    Label: 'me.lukaskollmer.baelor',
    KeepAlive: true,
    ProgramArguments: [
      '/Users/lukas/.config/fnm/bin/node',
      '/Users/lukas/Developer/baelor/server.js'
    ]
  }
  writeFileSync(launchd_plist_filepath, plist.build(launchd_data))
  launchd('load')

  const node_path = execSync('which node').toString().replace('\n', '')
  console.log(node_path, __filename);

} else if (command === 'uninstall') {
  launchd('unload')
  unlinkSync(launchd_plist_filepath)
}