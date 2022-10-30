<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened"
               class="hamburger-container"
               @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container"
                   trigger="click">
        <div class="avatar-wrapper">
          <span>{{name}}</span>
          <img :src="avatar"
               class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown"
                          class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided
                            @click.native="showResetPass">
            <span style="display:block;"> 修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided
                            @click.native="logout">
            <span style="display:block;"> 退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码"
               :visible.sync="showResetPassDialog"
               width="30%">
      <el-form ref="resetForm"
               :model="resetForm"
               label-position="left"
               label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="密码">
          <el-input placeholder="请输入密码"
                    v-model="resetForm.pass"
                    show-password></el-input>

        </el-form-item>
        <el-form-item label="确认密码">
          <el-input placeholder="请输入确认密码"
                    v-model="resetForm.pass_confirm"
                    show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="showResetPassDialog = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click="resetPass()">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import pic from '@/assets/avatar/avatar.jpg'
import { resetPass } from '@/api/user'

export default {
  data () {
    return {
      showResetPassDialog: false,
      avatar: pic,
      resetForm: {
        pass: "",
        pass_confirm: ""
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  created () {
    this.$store.dispatch('user/getInfo')
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
    ]),
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    showResetPass () {
      this.showResetPassDialog = true
      this.resetForm = {
        pass: "",
        pass_confirm: ""
      }
    },
    resetPass () {

      if (!this.resetForm.pass) {
        this.$message.error('密码不能为空');
        return;
      }
      if (this.resetForm.pass != this.resetForm.pass_confirm) {
        this.$message.error('两次输入密码不一致');
        return;
      }

      resetPass(this.resetForm).then(res => {
        this.showResetPassDialog = false
        this.$notify({
          title: 'Success',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
