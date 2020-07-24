<template>
  <div>
    okafasfdasdfasdfaasdafa
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
        key: '1234567890123456',
        /*        userloginform: {
                  tenantId: "m00021", //企业 id、或企业名称、或企业简称
                  loginName: "cheny.ss", //用户登录名/账号
                  encryptKey: "" // 密钥
                },*/
        userloginform: {
          loginName: 'weicp.ss', //用户名
          loginPassword: 'Asdf@1234', //密码
          sysType: '04-01', //系统类别
          tenantId: 't00565' //企业 id，或企业名称，或企业简称
        },
        appId: '337629304282140672410',
        secret: '337629507911405568410'
      }
    },
    methods: {
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
          })
        })
      }
    },
    created() {
      this.loginSDP()
    },
    beforeMounted(){

    }
  }
</script>
