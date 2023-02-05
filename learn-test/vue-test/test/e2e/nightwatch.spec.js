module.exports = {
  test1: function (browser) {
    browser
      .url("http://localhost:3000/#/Button")
      .waitForElementVisible(".button", 2000)
      .assert.urlContains("Button")
      .end();
  },
};
