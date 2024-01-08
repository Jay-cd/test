const { Given } = require("@cucumber/cucumber");
const { Builder, By, until, Key } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

Given('launch', {timeout : 1000000} ,async () =>  {
   let driver = await new Builder().forBrowser('MicrosoftEdge').build();
   await driver.manage().setTimeouts({ implicit: 2000 });
   driver.manage().window().maximize();
   await driver.get('https://www.bing.com');
await driver.sleep(2000);
   await driver.wait(until.elementLocated(By.id('sb_form_q')), 200000).sendKeys('selenium', Key.ENTER);
   await driver.sleep(5000);
   let name = await driver.wait(until.elementLocated(By.id(`id_n`)), 1000000).getText();
   console.log(name);
   if (name != `unstopable`) {
      console.log('need account change');
      await driver.sleep(15000);
   }
   for (let index = 0; index < 50; index++) {
      await driver.sleep(6000);
      let webelement = await driver.wait(until.elementLocated(By.id(`sb_form_q`)), 30000);
      await driver.wait(until.elementIsEnabled(webelement), 30000).click();
      await driver.sleep(3000);
      await driver.actions().keyDown(Key.CONTROL).sendKeys("a").perform();
      await driver.wait(until.elementIsEnabled(webelement), 30000).sendKeys(Key.BACK_SPACE);
      await driver.sleep(2000);
      await driver.wait(until.elementIsEnabled(webelement), 30000).sendKeys(`selenium${index}` + Key.ENTER);
      console.log(`search ${index} completed`);
   }
});



Given('launch1', { timeout: 1000000 }, async () => {
   let driver = await new Builder().forBrowser('MicrosoftEdge').build();
   await driver.manage().setTimeouts({ implicit: 2000 });
   driver.manage().window().maximize();
   await driver.get('https://sim-dev.instructure.com/login/canvas');
   await driver.wait(until.elementLocated(By.xpath(`//label[text()='Email']/following-sibling::input`)), 200000).sendKeys('soumitrodatta.misra@crystaldelta.com');
   await driver.wait(until.elementLocated(By.xpath(`//label[text()='Password']/following-sibling::input`)), 200000).sendKeys('SimDev1234');
   await driver.wait(until.elementLocated(By.name(`commit`)), 200000).click();
   await driver.get(`https://sim-dev.instructure.com/courses/4084/external_tools/303`);
   await driver.switchTo().defaultContent();
   await driver.switchTo().frame(driver.wait(until.elementLocated(By.id(`tool_content`)), 10000));
   const doubleClick = async (element) => {
      const clickable = await driver.wait(until.elementLocated(element), 10000);
      const actions = driver.actions({ async: true });
      await actions.doubleClick(clickable).perform();
   }
   const elementClearSendKeys = async (element, text) => {
      let webElement = await driver.wait(until.elementLocated(element), 30000);
      try {
         await driver.wait(until.elementIsEnabled(webElement), 30000).click();
      } catch (StaleElementReferenceError) {
         console.log("got stale element reference error");
         await driver.wait(until.elementIsEnabled(webElement), 30000).click();
      }
      await driver.actions().keyDown(Key.CONTROL).sendKeys("a").perform();
      await driver.wait(until.elementIsEnabled(webElement), 30000).sendKeys(Key.BACK_SPACE);
      await driver.wait(until.elementIsEnabled(webElement), 30000).sendKeys(text);
   };
   const scrollToElement = async (element) => {
      const elementToLocate = await driver.wait(until.elementLocated(element), 10000);
      await driver.executeScript("arguments[0].scrollIntoView()", elementToLocate);
   };
   for (let index = 3; index < 12; index++) {
      await doubleClick(By.xpath(`//div[@title="Dhaya Chellaramu"]/parent::div/following-sibling::div[${index}]`));
      await elementClearSendKeys(By.xpath(`//div[@title="Dhaya Chellaramu"]/parent::div/following-sibling::div[${index}]//input`), '5');
   }
   await scrollToElement(By.xpath(`//div[@title="Dhaya Chellaramu"]`));
   const jsClick = async (element) => {
      const elementToLocate = await driver.wait(until.elementLocated(element), 60000);
      await driver.executeScript("arguments[0].click();", elementToLocate);
   }
   const elementClick = async (element) => {
      let ele = await driver.wait(until.elementLocated(element), 10000)
      try {
         await driver.wait(until.elementIsVisible(ele), 10000).click();
      } catch (error) {
         await elementClick();
      }
   }
   const dropdown = async () => {
      try {
         await jsClick(By.xpath(`(//div[contains(@class,'toolbarContainer ')]//button)[2]`));
         let element = await driver.wait(until.elementLocated(By.xpath(`//li[normalize-space()='Assignments']`)), 2000);
         await driver.wait(until.elementIsVisible(element), 2000);
      } catch (error) {
         await dropdown();
      }

   }
   await jsClick(By.xpath(`(//div[contains(@class,'toolbarContainer ')]//button)[2]`));
   console.log(1);
   for (let index = 1; index < 6; index++) {
      await dropdown();
      try {
         await elementClick(By.xpath(`(//input[@type='checkbox'])[${index}]`));
      } catch (error) {
         await dropdown();
         await elementClick(By.xpath(`(//input[@type='checkbox'])[${index}]`));
      }
      
   }

   // await driver.wait(until.elementLocated(By.xpath(`(//div[contains(@class,'toolbarContainer ')]//button)[2]/parent::div`)), 10000).click();
   // await driver.wait(until.elementLocated(By.xpath(`(//div[contains(@class,'toolbarContainer ')]//button)[2]`)), 10000).click();

});




const createTemplate = async (templateName, privateOrGlobalRadio, successMessage) => {
   await assertIsEnabledTrue(pageFactory.commonLocators.saveTemplateIcon, 'Save Template Icon is Enabled');
   await driver.wait(until.elementLocated(pageFactory.commonLocators.saveTemplateIcon), 10000).click();
   let cusElementName = await driver.wait(until.elementLocated(pageFactory.commonLocators.templateName), 10000);
   cusElementName.click();
   cusElementName.sendKeys(templateName);
   await driver.wait(until.elementLocated(pageFactory.commonLocators.categoryDropdown), 10000).click();
   await driver.wait(until.elementLocated(pageFactory.commonLocators.dropdownSecondValue), 10000).click();
   await driver.wait(until.elementLocated(privateOrGlobalRadio), 10000).click();
   await driver.wait(until.elementLocated(pageFactory.commonLocators.templateSaveButton), 10000).click();

   await waitUntilELementDisappear(pageFactory.commonLocators.closeTemplateModal);
   // try {
   //   await driver.wait(until.elementIsNotVisible(await driver.findElement(pageFactory.commonLocators.templateName)), 10000);
   // } catch (error) {
   //   console.log('This error ',error);
   // }
   await loopTillELement(pageFactory.commonLocators.duplicateName, pageFactory.commonLocators.successMessageTemplateAndInteractive);
   let status = await checkTheElementsAvailability(pageFactory.commonLocators.duplicateName, 'Duplicate Error Message');
   if (status === true) {
      await driver.wait(until.elementLocated(pageFactory.commonLocators.duplicateName), 5000);
      await driver.wait(until.elementLocated(pageFactory.commonLocators.closeTemplateModal), 5000).click();
      console.log('Proceeding with existing Template');
   } else if (status === false) {
      await iframeSwitchToLoreeIframe(dataprovider.lti.canvas);
      await driver.wait(until.elementLocated(pageFactory.commonLocators.successMessageTemplateAndInteractive), 10000);
      await assertIsDisplayedTrue(pageFactory.commonLocators.successMessageTemplateAndInteractive, successMessage);
      await waitUntilELementDisappear(pageFactory.commonLocators.successMessageTemplateAndInteractive);
      // await assertIsDisplayedFalse(pageFactory.commonLocators.successMessageTemplateAndInteractive);

      console.log(templateName + ' created successfully');
      //await waitUntilELementDisappear(pageFactory.commonLocators.successMessageTemplateAndInteractive);
   }
   // await assertIsDisplayedTrue(pageFactory.commonLocators.successMessageTemplateAndInteractive, successMessage);
   // await waitUntilELementDisappear(pageFactory.commonLocators.successMessageTemplateAndInteractive);

   // }
};
