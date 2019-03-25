<template>
  <div class="menu-wrap" :class="{'hide-menu':!visibleMenus}">
    <!--一级菜单start-->
    <ul class="main-menu" @click="toggleMainNav($event)">
      <li class="main-menu-item"
          v-for="(item,key) in mainMenus" :key="key"
          :data-index="key"
          :class="{current:key === currentMainMenus }">
        <i :data-index="key" class="icon-menu">
          <!--<img :data-index="key" class="img-menu-hover"
               src="../assets/menu_1.png" alt="picture">
          <img :data-index="key" class="img-menu"
               src="../assets/menu.png" alt="picture">-->
        </i><br/>
        {{item.name}}
      </li>
    </ul>
    <!--一级菜单end-->
    <!--二级菜单start-->
    <div class="sub-menu" v-show="subMenus && subMenus.length>0">
      <h5 class="sub-menu-title">
        {{mainMenus.length > 0 ? mainMenus[currentMainMenus].name : ''}}
      </h5>
      <el-menu
        :default-active="currentSubMenus"
        :default-openeds="defaultOpens"
        background-color="#fff"
        @open="menuEvent"
        @select="menuEvent"
        text-color="#333">
        <MenuCommon :menuList="subMenus" :activeMenuId="currentSubMenus"></MenuCommon>
      </el-menu>
    </div>
    <!--二级菜单end-->
    <!--展开收起-->
    <a href="javascript:;" class="fold-icon el-icon-d-arrow-left"
       :class="{'el-icon-d-arrow-right current': !visibleMenus}"
       @click="visibleMenus = !visibleMenus">
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import MenuCommon from './menu-common';
import { isHttpStart, firstUpercase, filterData } from 'element-ui-yh/src/extend';

export default {
  name: 'ElTreemenu',
  props: {
    parentMenuList: Array,
    activeTableName: String
  },
  data() {
    return {
      mainMenus: [], // 一级菜单
      currentMainMenus: 0, // 一级菜单当前index
      subMenus: [], // 二级菜单
      currentSubMenus: this.activeTableName || '', // 二级菜单当前id,也是激活的菜单
      visibleMenus: true, // 菜单是否可见
      defaultOpens: [], // 默认展开的子菜单
      menuList: this.parentMenuList
    };
  },
  components: {
    MenuCommon
  },
  created() {
    this.initMenuData();
  },
  methods: {
    // 主菜单的切换
    toggleMainNav(event) {
      const _t = event.target || event.srcElement;
      const index = _t.dataset.index;
      if (index !== undefined) {
        this.initMenuData(index);
        const mainMenuData = this.mainMenus[index];
        this.subMenuEvent(mainMenuData);
      }
    },
    // 子菜单的切换
    subMenuEvent(data) {
      const { name, path, id } = data;
      const routerType = isHttpStart(path) ? 2 : 1;
      if (path) { // 有路径，展开新的页面
        let component = firstUpercase(path.split('-')[1]);
        const data = {
          name: id,
          title: name,
          component,
          routerType,
          path: this.getPath(path)
        };
        this.$emit('addTab', data);
      }
    },
    // 菜单数据的放置,主菜单的index
    initMenuData(index = 0) {
      let result = this.mainMenus;
      if (!this.mainMenus || this.mainMenus.length < 1) {
        result = filterData(this.menuList);
        this.mainMenus = result;
      }
      if (result[index]) {
        const resChild = result[index].children || [];
        const childId = resChild.length > 0 ? resChild[0].id : '';
        this.currentMainMenus = Number(index);
        this.subMenus = resChild;
        this.currentSubMenus = childId;
      }
      if (result.length > 0 && this.subMenus.length < 1) {
        this.subMenuEvent(this.mainMenus[0]);
      }
    },
    // 根据路径处理返回路径
    getPath(path) {
      return isHttpStart(path) ? path : `#${path}`;
    },
    // 子菜单点击
    menuEvent(id) {
      if (id === this.currentSubMenus) {
        this._initMenu(id);
      }
      this.currentSubMenus = id;
    },
    // 根据id变化初始化菜单
    _initMenu(id) {
      const data = this.menuList.filter((data) => {
        return data.id === id;
      });
      if (data && data.length > 0) {
        this.subMenuEvent(data[0] || {});
      }
    }
  },
  watch: {
    parentMenuList(cur) {
      this.menuList = cur;
      this.initMenuData();
    },
    // 根据当前子菜单id获取子菜单数据
    currentSubMenus(id) {
      this._initMenu(id);
    },
    activeTableName(cur) {
      this.currentSubMenus = cur;
    }
  }
};
</script>
