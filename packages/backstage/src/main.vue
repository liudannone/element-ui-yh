<template>
  <div class="body-wrap">
    <BackHeader class="header-wrap"></BackHeader>
    <el-container class="main-wrap">
      <el-treemenu :parentMenuList="menuList"></el-treemenu>
      <el-container class="relative">
        <el-tabs class="tabs-wrap" :value ="activeTableName" type="card"
                 closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in tabs"
            :key="item.name"
            :label="item.title"
            :name="item.name">
            <iframe class="iframe" :src="item.path"
                    frameborder="0"></iframe>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import BackHeader from './back-header';

export default {
  name: 'ElBackstage',
  components: {
    BackHeader
  },
  data() {
    return {
      menuList: [] // 菜单列表
    };
  },
  created() {
    this.getMenus();
  },
  mounted() {

  },
  computed: {
    /* tabs() {
      return this.$store.getters.tabs;
    },
    activeTableName() {
      return this.$store.getters.activeTableName;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }*/
  },
  methods: {
    // 删除菜单
    removeTab(name) {
      this.$store.dispatch('removeTab', name);
    },
    // 获取菜单
    getMenus() {
    }
  }
};
</script>

<style lang="scss">
  body,html,ul,li,h5{
    padding: 0;
    margin: 0;
  }
  ul,li{
   list-style: none;
  }
  .body-wrap{
    display: flex;
    flex-direction: column;
    height: 100%;
    .header-wrap{
      flex: 0 0 70px;
    }
    .main-wrap{
      flex:1;
    }
    .content-wrap{
      margin: 0 10px;
    }
}
  .tabs-wrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: auto;
  }
  .iframe{
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    height: calc(100vh - 128px);
  }
</style>
