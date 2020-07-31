import { login, logout, resetToken } from '@/api/login'
import { getToken, getTokenSDP, setToken, setTokenSDP, removeToken,getTokenUSERSDP } from '@/utils/auth'
import Cookies from 'js-cookie'
//将用户数据存到state里
const user = {
  //namespaced true 需要加前缀
  namespaced: true,
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    tokenSDP: getTokenSDP(),
    tokenUSERSDP: getTokenUSERSDP()
  },

  mutations: {
    SET_TOKENSDP: (state, tokenSDP) => {
      state.tokenSDP = tokenSDP
    },
    SET_TOKENUSERSDP: (state, tokenUSERSDP) => {
      state.tokenUSERSDP = tokenUSERSDP
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    //重新获取SDPtoken
    resetToken({ commit }) {
      return new Promise((resolve, reject) => {
        resetToken().then(response => {
          let data = response.data
          let tokenStrSDP = data
          setTokenSDP(tokenStrSDP)
          commit('SET_TOKENSDP', tokenStrSDP)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //重新获取USERSDPtoken
    resetUserToken({ commit }) {
      return new Promise((resolve, reject) => {
        resetToken().then(response => {
          let data = response.data
          console.log(data+'fasdfasd')
          let tokenStrSDP = data
          setTokenSDP(tokenStrSDP)
          commit('SET_TOKENUSERSDP', tokenStrSDP)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.verifyCode).then(response => {
          let data = response.data
          let tokenStr = data.token
          setToken(tokenStr)
          commit('SET_TOKEN', tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

/*    // 获取用户信息
    online({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            //获取后台角色数据
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },*/

    // 登出
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log('xxx')
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    ledLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
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
  }
}

export default user
