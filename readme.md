# baelor

> chrome extension to run scripts every time you visit a domain

## Install
- `npm install -g lukaskollmer/baelor`
- [Install the extension](https://stackoverflow.com/questions/24577024/install-chrome-extension-not-in-the-store)

> **NOTE**  
> Installing the module will automatically set up a `launchd` agent in `~/Library/LaunchAgents`  
> Running `npm uninstall -g baelor` removes the `launchd` agent

## Usage
- Simply put `.js` files in `~/.baelor`
- Every time you visit a page, the baelor extension will run all .js files that match that sites domain
- Scripts are evaluated in the context of the webpage, giving them full access to the DOM

**Example:**
If you visit `mail.google.com`, baelor will attempt to run (in that order):
1. `~/.baelor/default.js`
2. `~/.baelor/google.com.js`
3. `~/.baelor/mail.google.com.js`


## License
MIT @ [Lukas Kollmer](https://lukaskollmer.me)
