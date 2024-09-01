import { Locator, Page } from "@playwright/test"

export class OnlinePremiumCalculatorPage {
    readonly page: Page
    employmentStatus: Locator
    readonly incomeInputField: Locator
    readonly employmentStatusContinueButton: Locator
    insuranceType: Locator
    readonly insuranceIngressDateDropDown: Locator
    readonly insuranceProductContinueButton: Locator
    readonly birthdayInputDayField: Locator
    readonly birthdayInputMonthField: Locator
    readonly birthdayInputYearField: Locator
    readonly birthdayContinueButon: Locator
    readonly invalidAgeValidationMessage: Locator
    readonly insuranceStatusContinueButton: Locator


    constructor(page: Page) {
        this.page = page
        this.incomeInputField = this.page.locator('input[data-cy="income-input"]')
        this.employmentStatusContinueButton = this.page.locator('button[data-cy="employment-status-continue"]')
        this.insuranceIngressDateDropDown = this.page.locator('select[data-cy="ingress-date"]')
        this.insuranceProductContinueButton = this.page.locator('button[data-cy="insurance-product-continue"]')
        this.birthdayInputDayField = this.page.locator('input[data-cy="day"]')
        this.birthdayInputMonthField = this.page.locator('input[data-cy="month"]')
        this.birthdayInputYearField = this.page.locator('input[data-cy="year"]')
        this.birthdayContinueButon = this.page.locator('button[data-cy="birthday-continue"]')
        this.invalidAgeValidationMessage = this.page.locator('frontend-validation-message[datacy*="validation-message"]').locator('div[data-cy*="validation-message"]')
        this.insuranceStatusContinueButton = this.page.locator('button[data-cy="insurance-status-continue"]')
    }

    /**
     * This method will select the Employment Status based on the provided string value
     * @param value 
     */
    async clickEmploymentStatusOption(value: string) {
        this.employmentStatus = this.page.locator('label', { hasText: `${value}` })
        await this.employmentStatus.click()
    }

    /**
     * This method will fill the Income Input Field based on the provided string value
     * @param value 
     */
    async fillIncomeInputField(value: string) {
        await this.incomeInputField.fill(value)
    }

    async clickEmploymentStatusContinueButton() {
        await this.employmentStatusContinueButton.click()
    }

    /**
     * This method will select Insurance Type based on the provided string value
     * @param value 
     */
    async clickInsuranceTypeOption(value: string) {
        this.insuranceType = this.page.locator('label.radio-button', { hasText: `${value}` })
        await this.insuranceType.click()
    }

    /**
     * This method will select an option on the Insurance Ingress Date Dropdown based on the provided string value. Should be in Format DD.MM.YYYY.
     * @param value 
     */
    async selectOptionInsuranceIngressDateDropDown(value: string) {
        await this.insuranceIngressDateDropDown.selectOption(value)
    }

    async clickInsuranceProductContinueButton() {
        await this.insuranceProductContinueButton.click()
    }

    /**
     * This method will clear and then fill All Birthday Input Fields. Should be in Format DD.MM.YYYY.
     * @param birthdayString 
     */
    async fillBirthdayInputAllFields(birthdayString: string) {
        // Split the birthday string into day, month, and year components
        let [day, month, year] = birthdayString.split('.');
        await this.birthdayInputDayField.clear()
        await this.birthdayInputMonthField.clear()
        await this.birthdayInputYearField.clear()
        await this.birthdayInputDayField.fill(day)
        await this.birthdayInputMonthField.fill(month)
        await this.birthdayInputYearField.fill(year)
    }

    async clickBirthdayContinueButon() {
        await this.birthdayContinueButon.click({ force: true })
        await this.page.waitForLoadState('load')
    }

}