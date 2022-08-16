import { event } from 'codeceptjs'
import fs from 'fs'

export const lighthouseDesktopConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'desktop',
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
      requestLatencyMs: 0,
      downloadThroughputKbps: 0,
      uploadThroughputKbps: 0,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
}

export const thresholdsConfig = {
  performance: 5,
  accessibility: 5,
  'best-practices': 5,
  seo: 5,
  pwa: 5,
}

export const getReports = (filenameLighthouseReport: string, directoryLighthouseReport: string) => {
  return {
    formats: {
      json: false,
      html: true,
      csv: false,
    },
    name: filenameLighthouseReport,
    directory: directoryLighthouseReport,
  }
}

export const lighthouseReport = (directoryLighthouseReport: string, filenameLighthouseReport: string) => {
  event.dispatcher.on(event.test.after, async (test) => {
    if (test.title === 'Performance testing with Lighthouse') {
      const allurePlugin = codeceptjs.container.plugins('allure')
      const path = `${directoryLighthouseReport}/${filenameLighthouseReport}.html`
      if (allurePlugin && fs.existsSync(path)) {
        const data = fs.readFileSync(path)
        allurePlugin.addAttachment('Lighthouse Results', data, 'text/html')
      }
    }
  })
}
