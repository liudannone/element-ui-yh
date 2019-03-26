<template>
  <!--头部横条公用组件-->
  <div class="header">
    <img v-if="headerLogo" :src="headerLogo" alt="logo">
    <el-dropdown class="drop-down" @command="dropdownCommand">
      <span class="user-info">
        你好,{{user.name}}欢迎使用{{headerSysName}}！
        <img v-if="user.picture" class="user-header" :src="user.picture" alt="header-img">
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
    headerLogo: String,
    headerSysName: String
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
