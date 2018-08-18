describe('Constructor - smoke screenshot test colorSchemes', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  const ctx = {
    originalScreenshot: null,
    newScreenshot: null,
  };

  it('open disign panel', () => {
    browser.helpers.openPanel({ name: 'panelDesign' });
  });

  it('take screenshot', () => {
    ctx.originalScreenshot = browser.screenshot().value;
  });

  it('switch colorScheme', () => {
    browser.click('#ul-panelDesign-design .js-panel--color-scheme .js-site-settings-palette:not(.active)');
    browser.pause(5000);
  });

  it('take second screenshot', () => {
    ctx.newScreenshot = browser.screenshot().value;
  });

  it('compare screenshots', async () => {
    expect(ctx.originalScreenshot).not.equal(null);
    expect(ctx.newScreenshot).not.equal(null);

    const distance = await browser.helpers.compareScreenshots(ctx.originalScreenshot, ctx.newScreenshot);

    expect(distance).to.be.above(0.01);
    expect(distance).to.be.below(0.1);
  });
});
