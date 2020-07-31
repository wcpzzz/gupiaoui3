<template>
  <div>
    <!--    <sdp-board-preview @close="alert('此处应该关闭页面')" @needRefreshToken="alert('此处写更新token代码')" v-bind="shareData"></sdp-board-preview>-->
    12341
    <!--    <div><a href="http://www.baidu.com">1234</a></div>-->
  </div>
</template>
<script>
  import { resetToken } from '@/api/login'
  import { resetUserToken, getUserToken } from '@/api/userloginSDP'
  import Cookies from 'js-cookie'

  export default {
    name: 'Dashboard',
    data() {
      return {
        shareData: {
          api: sdpApi,
          env: { projectName: 'SDP-Demo', production: true },
          boardInfo: {
            // 看板的的文件夹id和看板id
            folderId: '340147788379574272410',
            id: '339056696393453568410'
          },
          langCode: 'zh',
          options: {
            // SDP团队分配的租户ID，本DEMO已a025为例,
            tenantId: 't00565',
            type: 'browse'
          },
          themeParameters: { themeType: '0' }, // 主题: '0'经典白,'1'暗黑蓝
          remindData: ''
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

    },
    created() {
      this.loginSDP()
    },
    beforeMount() {

    }
  }
</script>
