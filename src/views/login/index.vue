<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <div class="title">
        <h3>大众书局报表系统
        </h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="people_fill"/>
        </span>
        <el-input name="username" type="text" v-model.trim="loginForm.username" autoComplete="on"
                  placeholder="请输入用户名" maxlength="15"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="lock1"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model.trim="loginForm.password"
                  autoComplete="on"
                  placeholder="请输入密码" maxlength="20"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="browse_fill"/></span>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <div style="display: flex;align-items: center">
        <span class="svg-container">
          <svg-icon icon-class="yanzhengma"></svg-icon>
        </span>
          <el-input name="verifyCode" @keyup.enter.native="handleLogin" v-model.trim="loginForm.verifyCode"
                    autoComplete="on"
                    v-bind:placeholder="'请输入验证码'" maxlength="4"></el-input>
          <!--          <img :src="imgPrefix" @click="changeImg()" ref="verifyCode" style="height:80%;">-->
          <verify></verify>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <!--        <span @click="changeLanguage">{{$t('login.tips')}}</span>-->
        <p class="link">Copyright © 2015-2016<a href="https://www.ss-soft.com/" target="_Blank"> ss-soft</a>. All rights
          reserved</p>
      </div>
    </el-form>
  </div>
</template>

<script>
  import verify from "./verify.vue";
  import Cookies from "js-cookie";

  export default {
    name: 'login',
    components: {
      verify
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码长度需大于4位'))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value.length != 4) {
          callback(new Error('验证码应为4位'))
        }else if(this.loginForm.verifyCode != Cookies.get('getIdentifyCode')){
          callback(new Error('验证码不正确'))
        }
        else {
          callback()
        }
      }

      return {
        redirect: undefined,
        verifyCode: '',
        imgPrefix: process.env.BASE_API + '/admin/getCode',
        loginForm: {
          username: '',
          password: '',
          verifyCode: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          verifyCode: [{required: true, trigger: 'blur', validator: validateCode}]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    methods: {
      /*      changeImg() {
              this.$refs.verifyCode.src = this.imgPrefix
            },*/
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      changeLanguage() {
        if (this.$i18n.locale === 'cn') {
          this.$i18n.locale = 'en'
        } else {
          this.$i18n.locale = 'cn'
        }
      },
      handleLogin() {
        //登录
        //判断验证码
        /*        this.$on("getIdentifyCode", (data) => {
                  console.log(data)
                  this.verifyCode = data
                })*/
        this.verifyCode = Cookies.get('getIdentifyCode')
        if (this.verifyCode == this.loginForm.verifyCode) {
          //成功
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.loading = true
              this.$store.dispatch('user/login', this.loginForm).then(() => {
                this.loading = false
                console.log('ok')
                this.$router.push({ path: this.redirect || '/dashboard' })
                console.log(this.$router)
              }).catch(() => {
                this.loading = false
                this.loginForm.password = '';
                this.loginForm.verifyCode = '';
                // this.changeImg()
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;

        &:-webkit-autofill {
          -webkit-animation: autofill-fix 1s infinite;
          -webkit-text-fill-color: #fff;
        }

        @-webkit-keyframes autofill-fix {
          from {
            background-color: transparent
          }
          to {
            background-color: transparent
          }
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>

  $bg: #1a65ba;
  $dark_gray: #eee;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 375px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .language_change {
      /*position: absolute;*/
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        float: right;

        &:first-of-type {
          margin-right: 16px;
        }

        cursor: pointer;
      }

      .link {
        font-size: 12px;
        text-align: center;
        color: #9fa3ab;

        a {
          color: $light_gray;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;

      &_login {
        font-size: 20px;
      }
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 30px auto;
      position: relative;
      /*text-align: center;*/
      font-weight: bold;

      .language_change {
        position: absolute;
        right: 0;
        color: white;
        font-size: 16px;
      }

      h3 {
        text-align: center;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
