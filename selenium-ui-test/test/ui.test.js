import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('UI Testing using Selenium', function () {
    this.timeout(30000); // timeout 30 detik
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        // Ganti URL sesuai dengan lokasi server lokal yang kamu gunakan
        await driver.get('file:///C:/ppmpl-4/selenium-ui-test/test/login.html');

        await driver.wait(until.titleIs('Login Page'), 20000); // menunggu hingga judul adalah 'Login Page'

        // Cek apakah elemen username dapat ditemukan
        const usernameElement = await driver.executeScript('return document.querySelector("#username")');
        console.log('Username element:', usernameElement ? 'Found' : 'Not Found');
        expect(usernameElement).to.not.be.null; // Pastikan elemen ada
    });

    it('should input username and password', async function () {
        const usernameField = await driver.wait(until.elementLocated(By.id('username')), 15000);
        const passwordField = await driver.wait(until.elementLocated(By.id('password')), 15000);

        await usernameField.sendKeys('testuser');
        await passwordField.sendKeys('password123');

        const usernameValue = await usernameField.getAttribute('value');
        const passwordValue = await passwordField.getAttribute('value');
        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        const loginButton = await driver.wait(until.elementLocated(By.id('loginButton')), 15000);
        await loginButton.click();
    });

    it('should display success message for valid login', async function () {
        const usernameField = await driver.findElement(By.id('username'));
        const passwordField = await driver.findElement(By.id('password'));

        // Clear fields and input valid credentials
        await usernameField.clear();
        await passwordField.clear();
        await usernameField.sendKeys('testuser');
        await passwordField.sendKeys('password123');

        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();

        const successMessage = await driver.wait(until.elementLocated(By.id('successMessage')), 15000);
        const isSuccessDisplayed = await successMessage.isDisplayed();
        expect(isSuccessDisplayed).to.be.true;
    });

    it('should display error message for invalid login', async function () {
        const usernameField = await driver.findElement(By.id('username'));
        const passwordField = await driver.findElement(By.id('password'));

        // Clear fields and input invalid credentials
        await usernameField.clear();
        await passwordField.clear();
        await usernameField.sendKeys('wrongUser');
        await passwordField.sendKeys('wrongPassword');

        const loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();

        const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 15000);
        const isErrorDisplayed = await errorMessage.isDisplayed();
        expect(isErrorDisplayed).to.be.true;
    });
});
