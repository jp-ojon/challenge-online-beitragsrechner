import { test, expect } from '@playwright/test'
import { OnlinePremiumCalculatorPage } from '../page-objects/onlinePremiumCalculatorPage'
import { readJSONTestData } from '../utilities/reader'
import { baseURL } from '../playwright.config'

test.describe('Digital Assistant Tests', () => {

    let testData: any //for storing test data from json files.

    test.beforeAll(async () => {
        //Read test data .json files to be used as input.
        testData = await readJSONTestData('testDataFile.json')
    })

    test.beforeEach(async ({ page }) => {
        //Step 1: Navigate to the URL, depends on environment.
        await page.goto(baseURL)
        await page.waitForLoadState('load')
    })

    test('Test Case 1: Online-Beitragsrechner Test', async ({ page }) => {
        const onlinePremiumCalculatorPage = new OnlinePremiumCalculatorPage(page)

        //Step 2. Accept the cookie banner by clicking on „Alles Akzeptieren“, if it shows.

        //Step 3. Select “Angestellt" as employment and enter an income of "70.000".
        await onlinePremiumCalculatorPage.clickEmploymentStatusOption(testData.EmploymentStatus)
        await onlinePremiumCalculatorPage.fillIncomeInputField(String(testData.Income))
        await onlinePremiumCalculatorPage.clickEmploymentStatusContinueButton()

        //Step 4. Select "Vollversicherung" and "01.10.2024” as start date from the dropdown.
        await onlinePremiumCalculatorPage.clickInsuranceTypeOption(testData.InsuranceType)
        await onlinePremiumCalculatorPage.selectOptionInsuranceIngressDateDropDown(testData.InsuranceIngressDate)
        await onlinePremiumCalculatorPage.clickInsuranceProductContinueButton()

        //Step 5. Write some tests to assert birthdate input field error messages.
        //Test of maximum possible value for birthday that is invalid
        await onlinePremiumCalculatorPage.fillBirthdayInputAllFields(testData.BirthdayMaxValue)
        await onlinePremiumCalculatorPage.clickBirthdayContinueButon()
        expect (await onlinePremiumCalculatorPage.invalidAgeValidationMessage.textContent()).toContain('Bitte gib ein korrektes Datum ein.')

        //Test of future birthday
        await onlinePremiumCalculatorPage.fillBirthdayInputAllFields(testData.BirthdayFutureDate)
        await onlinePremiumCalculatorPage.clickBirthdayContinueButon()
        expect (await onlinePremiumCalculatorPage.invalidAgeValidationMessage.textContent()).toContain('Du bist in der Zukunft geboren? Bitte überprüfe deine Eingaben.')

        //Test of birthday that has a current age of less than 16
        await onlinePremiumCalculatorPage.fillBirthdayInputAllFields(testData.BirthdayLessThan16)
        await onlinePremiumCalculatorPage.clickBirthdayContinueButon()
        expect (await onlinePremiumCalculatorPage.invalidAgeValidationMessage.textContent()).toContain('Leider kannst du dich erst ab 16 Jahren alleine versichern.')

        //Test of birthday that has a current age of more than 100
        await onlinePremiumCalculatorPage.fillBirthdayInputAllFields(testData.BirthdayMoreThan100)
        await onlinePremiumCalculatorPage.clickBirthdayContinueButon()
        expect (await onlinePremiumCalculatorPage.invalidAgeValidationMessage.textContent()).toContain('Du kannst dich nur bis 101 Jahren bei uns versichern.')

        //Step 6. Enter a valid birthdate and proceed to the next page.
        await onlinePremiumCalculatorPage.fillBirthdayInputAllFields(testData.BirthdayValid)
        await onlinePremiumCalculatorPage.clickBirthdayContinueButon()

        //Assert that the cntinue button of the next page "Insurance Status" is visible
        await expect (onlinePremiumCalculatorPage.insuranceStatusContinueButton).toBeVisible()

        //await page.waitForTimeout(10000)
    })
})