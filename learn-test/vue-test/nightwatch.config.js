const seleniumServer = require("selenium-server");

module.exports = {
  src_folders: ["test/e2e"],
  output_folder: "test/e2e/reports",
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    host: "127.0.0.1",
    port: 4444,
    cli_args: {
      "WebDriver.chrome.driver": require("chromedriver").path,
    },
  },
  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
};
