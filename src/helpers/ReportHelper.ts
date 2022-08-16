import { readFileSync } from 'fs'

/**
 * Helper class for the Playwright Report
 */
class ReportHelper extends Helper {
  /**
   * Constructor
   *
   * @param config
   */
  constructor(config: any) {
    super(config)
  }

  /**
   * Attach Video to Allure Report
   * @param test
   */
  _attachVideo = async (test: any) => {
    const Playwright = codeceptjs.container.helpers('Playwright')
    if (Playwright) {
      await Playwright.browserContext.close()
      const allure = codeceptjs.container.plugins('allure')
      const FORMAT = 'video/webm'
      const TITLE = 'Execution Video'
      const video = test.artifacts?.video || test._retriedTest?.artifacts?.video
      if (video) {
        allure.addAttachment(TITLE, readFileSync(video), FORMAT)
      }
    }
  }
  /**
   * Event when Test Failed
   *
   * @param test
   */
  _failed = async (test: any) => {
    await this._attachVideo(test)
  }
}
export = ReportHelper
