<template>
  <div class="body-wrap">
    <BackHeader class="header-wrap" :logo="logo" :title="title"
                @headerCommand="headerCommand"></BackHeader>
    <el-container class="main-wrap">
      <el-treemenu :parentMenuList="menuList" @addTab="addTab"
                   :activeTableName="activeTableName"></el-treemenu>
      <el-container class="relative">
        <el-tabs class="tabs-wrap" v-model ="activeTableName" type="card"
                 closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="item in tabs"
            :key="item.name"
            :label="item.title"
            :name="item.name">
            {{item.name}}
           <!-- <iframe class="iframe" :src="item.path"
                    frameborder="0"></iframe>-->
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
  props: {
    logo: String,
    title: String,
    menuList: Array
  },
  data() {
    return {
      activeTableName: '',
      tabs: [],
      tabIndex: 0
    };
  },
  methods: {
    // 删除菜单
    removeTab(targetName) {
      const tabs = this.tabs;
      let activeTableName = this.activeTableName;
      if (activeTableName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              this.activeTableName = nextTab.name;
            }
          }
        });
      }
      this.tabs = tabs.filter(tab => tab.name !== targetName);
    },
    // 子组件中获取增加菜单弹窗
    addTab(data) {
      let newTabName = data.name;
      let flag = true;
      const tabs = this.tabs;
      tabs.forEach((tab) => {
        if (tab.name === data.name) {
          flag = false;
          newTabName = tab.name;
        }
      });
      if (flag) {
        this.tabs.push({
          ...data,
          name: newTabName
        });
      }
      this.activeTableName = newTabName;
    },
    headerCommand(command) {
      this.$emit('headerCommand', command);
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
  .relative{
    position: relative;
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
