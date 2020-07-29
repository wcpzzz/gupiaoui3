import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  // mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.config.productionTip = false

import VCharts from 'v-charts'

Vue.use(VCharts)

import sdp from '@/sdpresourse/sdp.umd.min.js'

Vue.use(sdp)

import sdpApi from '@/sdpresourse/sdpapi.js'
import '@/sdpresourse/iconfont.css'
import '@/sdpresourse/app-sdp.css'
import '@/sdpresourse/sdp.css'

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import echarts from 'echarts'
import axios from 'axios'

Vue.prototype.$echarts = echarts





axios({
  method: 'get',
  url: 'https://sdptest.shijicloud.com/static/sdp_app/web/pre_production/V2.09.00.04/langpackage.json',
  dataType: 'json'
}).then(res => {
  let langJSON = res.data
  const langList = ['zh', 'en']
  const langPackage = {}

  Object.keys(langJSON).forEach(key => {
    langList.forEach(lang => {
      langPackage[lang] || (langPackage[lang] = {})
      langPackage[lang][key] = {}
      Object.keys(langJSON[key]).forEach(k => {
        langPackage[lang][key][k] = langJSON[key][k][lang]
      })
    })
  })
  // 项目中加入界面多语言翻译，有以下2种方式，根据实际情况自行选择
  // 1、如果项目已经使用i18n做了国际化，则可以使用mergeLocaleMessage将报表界面多语言翻译包合并到i18n
  // window.Vue.i18n.mergeLocaleMessage('zh', { sdp: langPackage.zh })
  // window.Vue.i18n.mergeLocaleMessage('en', { sdp: langPackage.en })

  // 2、直接使用
  const messages = {
    en: {
      ...window.elLang.en,
      sdp: langPackage.en
    },
    zh: {
      ...window.elLang.zh,
      sdp: langPackage.zh
    }
  }
  const i18n = new VueI18n({
    locale: 'zh', // set locale
    messages // set locale messages
  })

  Vue.use(ElementUI, {
    size: 'small',
    i18n: (key, value) => i18n.t(key, value)
  })
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    i18n,
    template: '<App/>',
    components: { App }
  })
})







