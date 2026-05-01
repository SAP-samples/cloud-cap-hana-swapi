// This is an automatically generated file. Please do not change its contents manually!
const { createEntityProxy } = require('./../../_')
// aspect
module.exports.aspect = createEntityProxy(['sap.changelog', 'aspect'], { target: { is_singular: true } })
module.exports.aspect_ = createEntityProxy(['sap.changelog', 'aspect'], { target: { is_singular: false }})
// ChangeView
module.exports.ChangeView = createEntityProxy(['sap.changelog', 'ChangeView'], { target: { is_singular: true }, customProps: ["modification"] })
module.exports.ChangeView_ = createEntityProxy(['sap.changelog', 'ChangeView'], { target: { is_singular: false }})
// i18nKeys
module.exports.i18nKey = createEntityProxy(['sap.changelog', 'i18nKeys'], { target: { is_singular: true } })
module.exports.i18nKeys = createEntityProxy(['sap.changelog', 'i18nKeys'], { target: { is_singular: false }})
// CHANGE_TRACKING_DUMMY
module.exports.CHANGE_TRACKING_DUMMY = createEntityProxy(['sap.changelog', 'CHANGE_TRACKING_DUMMY'], { target: { is_singular: true } })
module.exports.CHANGE_TRACKING_DUMMY_ = createEntityProxy(['sap.changelog', 'CHANGE_TRACKING_DUMMY'], { target: { is_singular: false }})
// Changes
module.exports.Change = createEntityProxy(['sap.changelog', 'Changes'], { target: { is_singular: true }, customProps: ["modification"] })
module.exports.Changes = createEntityProxy(['sap.changelog', 'Changes'], { target: { is_singular: false }})
// events
// actions
// enums
module.exports.ChangeView.modification ??= { Create: "create", Update: "update", Delete: "delete" }
module.exports.Change.modification ??= { Create: "create", Update: "update", Delete: "delete" }
