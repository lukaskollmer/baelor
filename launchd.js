// add/remove baelor from launchd
// this script is run by npm via the postinstall and preuninstall hooks

const path = require('path')
const plist = require('plist')
const {execSync} = require('child_process')
const {writeFileSync, unlinkSync} = require('fs')

const command = process.argv[2]
const launchd_plist_filepath = `${process.env.HOME}/Library/LaunchAgents/me.lukaskollmer.baelor.plist`

const launchd = cmd => execSync(`launchctl ${cmd} ${launchd_plist_filepath}`)

if (command === 'install') {
  const launchd_plist = plist.build({
    Label: 'me.lukaskollmer.baelor',
    KeepAlive: true,
    ProgramArguments: [
      execSync('which node').toString().replace('\n', ''),
      `${__dirname}/server.js`
    ]
  })
  writeFileSync(launchd_plist_filepath, launchd_plist)
  launchd('load')
  console.log(`[lukaskollmer/baelor] installed a launchd agent to ${launchd_plist_filepath}`)

} else if (command === 'uninstall') {
  launchd('unload')
  unlinkSync(launchd_plist_filepath)
  console.log(`[lukaskollmer/baelor] removed the launchd agent from ${launchd_plist_filepath}`)
}
