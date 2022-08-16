/// <reference types='codeceptjs' />
type steps_file = typeof import('./src/helpers/RestHelper')
type ReportHelper = import('./src/helpers/ReportHelper')
type ResembleHelper = import('codeceptjs-resemblehelper')

declare namespace CodeceptJS {
  interface SupportObject {
    I: I
    current: any
  }
  interface Methods extends Playwright, ReportHelper, ResembleHelper, REST, JSONResponse {}
  interface I
    extends ReturnType<steps_file>,
      WithTranslation<ReportHelper>,
      WithTranslation<ResembleHelper>,
      WithTranslation<JSONResponse>,
      WithTranslation<Methods> {}
  namespace Translation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Actions {}
  }
}
