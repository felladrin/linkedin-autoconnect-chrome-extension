# Contributing

Thanks for your interest in contributing to this project!

The easiest way to contribute is using the ready-to-code environment on [Gitpod](https://gitpod.io/), by clicking the button below:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/felladrin/linkedin-autoconnect-chrome-extension)

But if you want to set up your own envinronment and flow, here is what you need to do:

1. Clone this repo.
2. Run `npm ci` to install dependencies.
3. Run `npm start` to compile the files to the `dist` folder and keep watching for changes.
4. Open Google Chrome, type chrome://extensions on your address bar, and hit Enter.
5. On the Chrome Extensions page, check the Developer mode box. Click on the button `Load unpacked`. Navigate to the unzipped extension folder, select it and click 'Open'. Then select the `dist` folder.
6. Do your changes, and you'll see that they will be recompiled automatically. After each recompilation, you need to go the Extensions Tab on Chrome and click the Reload button, to reload the extension with the new changes.
7. When it's all good, run `npm run build`, and your extension will be zipped into `linkedin-autoconnect-chrome-extension.zip`, which is ready for production, and you can share with others.
