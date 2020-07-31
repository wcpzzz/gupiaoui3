<!--<template>
  <div>
    &lt;!&ndash;      <sdp-board-preview @close="alert('此处应该关闭页面')" @needRefreshToken="alert('此处写更新token代码')"
                             v-bind="shareData"></sdp-board-preview>&ndash;&gt;
    <div class="head">
      <sdp-board-preview @close="() => {this.$router.go(-1)}" v-bind="shareData" class="sdp"></sdp-board-preview>
    </div>
    &lt;!&ndash;    <div><a href="http://www.baidu.com">1234</a></div>&ndash;&gt;
  </div>
</template>
<script>
  import { resetToken } from '@/api/login'
  import { resetUserToken, getUserToken } from '@/api/userloginSDP'
  import Cookies from 'js-cookie'
  import axios from 'axios'

  export default {
    name: 'Dashboard',
    data() {
      return {
        lang: {},
        // i18n,
        shareData: {
          api: sdpApi,
          env: { projectName: 'SDP-Demo', production: true },
          boardInfo: {
            // 看板的的文件夹id和看板id
            // folderId: '340147788379574272410',
            id: '341240565838368768410'
          },
          langCode: 'zh',
          options: {
            // SDP团队分配的租户ID，本DEMO已a025为例,
            tenantId: 't00565',
            type: 'browse'
          },
          themeParameters: { themeType: '0' } // 主题: '0'经典白,'1'暗黑蓝
          // remindData: ''
        },

        key: '1234567890123456',
        /*        userloginform: {
                  tenantId: "m00021", //企业 id、或企业名称、或企业简称
                  loginName: "cheny.ss", //用户登录名/账号
                  encryptKey: "" // 密钥
                },*/
        userloginform: {
          loginName: 'weicp.ss', //用户名
          loginPassword: 'Abcd@123', //密码
          sysType: '04-01', //系统类别
          tenantId: 't00565' //企业 id，或企业名称，或企业简称
        },
        appId: '337629304282140672410',
        secret: '337629507911405568410'
      }
    },
    methods: {
      /*      toOutPage() {
              // window.location.href="http://localhost:8000"
              window.open('http://localhost:8000/test.html')
              // window.location.href = 'http://www.baidu.com';
            },*/
      encrypt(data) {
        //引入crypto-js
        let CryptoJS = require('crypto-js')
        const key = CryptoJS.enc.Utf8.parse(this.key)
        const iv = CryptoJS.enc.Utf8.parse(this.key)
        return CryptoJS.AES.encrypt(data, key, {
          iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
        }).toString()
      },

      loginSDP() {
        //进行SDP登录，并且存下tokenSDP到SDP-Token
        resetToken().then(data => {
          /*          let temp = this.userloginform.tenantId+'_'+this.userloginform.loginName
                    this.userloginform.encryptKey = this.encrypt(temp)
                    //登录完了之后，再去获得SDPusertoken
                    resetUserToken(this.userloginform)*/
          Cookies.set('SDP-Token', data.data.data)
          this.userloginform.loginPassword = this.encrypt(this.userloginform.loginPassword)
          getUserToken(this.userloginform).then(data => {
            Cookies.set('USERSDP-Token', data.data.data.token)
            console.log(Cookies.get('USERSDP-Token'))
          })
        })
      }
      //尝试加载他万恶的看板
      //先用axio把他的language拉下来

    },
    created() {
      this.loginSDP()

    },
    beforeMount() {

    }
  }
</script>
<style scoped>
  .head{
    position: relative;

  }
  .sdp {
    position: relative;
    width:calc(100vw);
    height:calc(100vh);
  }
</style>-->
<template>
  <div class="head">
    <sdp-board-preview @close="() => {this.$router.go(-1)}" v-bind="shareData" class="sdp"></sdp-board-preview>
  </div>
</template>

<script>
  // import axios from 'axios'
  // import { asyncLoadFile } from '../loadFile'
  export default {
    name: 'aaa',
    components: {
    },
    data () {
      return {
        shareData: {
          api: '',
          boardInfo: {
            id: '341240565838368768410'
          },
          langCode: 'zh',
          options: {
            tenantId: 't00565',
            type: 'browse',
          },
          // themeParameters: {
          //   isOpen: true,
          //   themeType: '0',
          // }
        }
      }
    },
    created() {
      // const CUR_ENV = 'release'
      // const baseRoot = `https://sdptest.shijicloud.com/static/sdp_app/web/${CUR_ENV}`
      // let _version = 'V2.09.00.04'
      // const cssPath = `${ baseRoot }/${ _version }/sdp.css`
      // const jsPath = `${ baseRoot }/${ _version }/sdp.umd.min.js`
      // asyncLoadFile(cssPath, 'link'),
      // asyncLoadFile(jsPath),
      this.shareData.api = window.sdpApi
    },
  }
</script>

<style scoped>
  .head{
    position: relative;

  }
  .sdp {
    position: relative;
    width:calc(100vw);
    height:calc(100vh);
  }
</style>
