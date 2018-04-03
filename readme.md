# baelor

> chrome extension to run scripts every time you visit a domain

## Usage
- Simply put `.js` files in `~/.baelor`
- Every time you visit a page, the baelor extension will run all .js files that match that sites domain.

**Example:**
If you visit `mail.google.com`, baelor will run (in that order):
1. `~/.baelor/default.js`
2. `~/.baelor/google.com.js`
3. `~/.baelor/mail.google.com.js`

If one of these files doesn't exist, baelor will simply skip it

## Install
- [Install the extension](https://stackoverflow.com/questions/24577024/install-chrome-extension-not-in-the-store)
- Run the server: `node server.js`
- **This is WIP, a proper extension and a launchd service are planned**


## License
MIT @ [Lukas Kollmer](https://lukaskollmer.me)
