<template>
  <div class="app-container common-list-page">
    <el-form
      :model="resetForm"
      :rules="resetFormRules"
      ref="resetForm"
      status-icon
      label-width="100px"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input type="password" v-model="resetForm.password" auto-complete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newpassword">
        <el-input type="password" v-model="resetForm.newpassword" auto-complete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="newPwd">
        <el-input type="password" v-model="resetForm.newPwd" auto-complete="off" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  :loading="loading" type="primary" @click.native.prevent="toAmend">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {api} from "@/api/changePwd";//这是我个人全局定义单独用来接收url接口的文件，不作参考
  /*import { getUsername } from "@/utils/auth";//这是我个人调用封装获取当前账户的username，不作参考*/
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入新密码"));
        } else if (value.toString().length < 6 || value.toString().length > 18) {
          callback(new Error("密码长度为6-18位"));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.resetForm.newpassword) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      return {
        loading:false,
        resetForm: {
          //传给后台所需要的参数
          newpassword: "",
          password: "",
        },
        resetFormRules: {
          password: [
            {required: true, message: "请输入旧密码", trigger: 'blur'}
          ],
          newpassword: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          newPwd: [
            {required: true, validator: validatePass2, trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      toAmend() {
        this.$refs.resetForm.validate(valid => {
            this.loading = true
            if (valid) {
              this.resetForm.account=this.$cookies.get("accountKey")
              //这里的api.materialQuery.toAmend是调用前期我们统一的api接口url路径，不作参考 ，只要把后台需要的字段正常传进去即可
              api(this.resetForm)
                .then(() => {
                    this.loading = false
                    this.$notify({
                      title: '修改成功',
                      type: 'success',
                      duration:2000,
                    });
                  }
                )
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form {
    width: 60%;
    margin: 50px auto 0;
    text-align: center;

    button {
      margin: 20px 0 0;
    }
  }
</style>
