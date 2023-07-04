# Contributing

Thanks for your interest in contributing to this project!

Here are the instructions for development:

1. Clone this repo.
2. Run `npm ci` to install dependencies.
3. Run `npm start` to compile the files to the `dist` folder and keep watching for changes.
4. Open Google Chrome, type `chrome://extensions` on your address bar, and hit Enter.
5. On the Chrome Extensions page, check the Developer mode box. Click on the button `Load unpacked`. Navigate to the unzipped extension folder, select it and click 'Open'. Then select the `dist` folder.
6. Do your changes, and you'll see that they will be recompiled automatically. After each recompilation, you need to go the Extensions Tab on Chrome and click the Reload button, to reload the extension with the new changes.
7. When it's all good, run `npm run build`, and your extension will be zipped into `linkedin-autoconnect-chrome-extension.zip`, which is ready for production, and you can share with others.
