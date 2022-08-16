const ENDPOINTS = ['swaglabs', 'electronics'] as const
export type Endpoint = typeof ENDPOINTS[number]

export const getUrlByEnvironment = (endpoint: Endpoint) => {
  const swaglabsUrl = `https://www.saucedemo.com/`
  const electronicsUrl = `https://electronics-ecxquality.cx.ecx.io/yacceleratorstorefront/?site=electronics`

  return endpoint === 'swaglabs' ? swaglabsUrl : electronicsUrl
}
