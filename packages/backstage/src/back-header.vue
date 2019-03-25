<template>
  <!--头部横条公用组件-->
  <div class="header">
    <img :src="logo" alt="logo">
    <el-dropdown class="drop-down" @command="dropdownCommand">
      <span class="user-info">
        你好,{{user.name}}欢迎使用{{title}}！
       <!-- <img class="user-header" src="../assets/defaultUserHead.png" alt="header-img">-->
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="reUserInfo">修改资料</el-dropdown-item>
        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
        <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'back-header',
  props: {
    logo: String,
    title: String
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.initUser();
  },
  methods: {
    dropdownCommand(command) {
      this.$emit('headerCommand', command);
    },
    initUser() {
      const user = localStorage.getItem('userInfo');
      if (user) {
        this.user = JSON.parse(user);
      }
    }
  }
};
</script>

<style lang="scss">
.header{
  height: 70px;
  background-color: #1d2531;
  display: flex;
  position: relative;
  align-items: center;
  .drop-down{
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translate(0,-50%);
    .user-info{
      color: #fff;
      font-size: 13px;
      .user-header{
        margin-left: 10px;
        width: 40px;
      }
    }
  }
}
</style>
