import { playAudit } from 'playwright-lighthouse'
import { lighthouseDesktopConfig, getReports, lighthouseReport, thresholdsConfig, getUrlByEnvironment } from '../index'

Feature('Performance Test')
  .tag('@Performance')
  .config({
    chromium: {
      args: [`--remote-debugging-port=9222`],
    },
  })

Scenario('Performance testing with Lighthouse', async ({ I }) => {
  const filenameLighthouseReport = `lighthouse-report`
  const directoryLighthouseReport = `output`

  I.amOnPage(getUrlByEnvironment('electronics'))
  I.usePlaywrightTo('Run Lighthouse audit', async ({ page }) => {
    await playAudit({
      page: page,
      thresholds: thresholdsConfig,
      config: lighthouseDesktopConfig,
      reports: getReports(filenameLighthouseReport, directoryLighthouseReport),
      port: 9222,
    })
  })
  lighthouseReport(directoryLighthouseReport, filenameLighthouseReport)
})
