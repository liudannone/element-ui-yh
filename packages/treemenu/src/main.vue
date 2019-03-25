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
        @open="menuOpen"
        @select="menuSelect"
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
    parentMenuList: Array
  },
  data() {
    return {
      mainMenus: [], // 一级菜单
      currentMainMenus: 0, // 一级菜单当前index
      subMenus: [], // 二级菜单
      currentSubMenus: '', // 二级菜单当前id,也是激活的菜单
      visibleMenus: true, // 菜单是否可见
      defaultOpens: [], // 默认展开的子菜单
      // menuList: this.parentMenuList,
      /* eslint-disable */
      menuList: [
        {
          "id": "1",
          "systemCode": "0001",
          "path": "",
          "name": "权限管理",
          "pinyin": "",
          "picture": "/image/icon/icon_002.png",
          "describe": "系统分组管理",
          "state": 1,
          "createTime": "2018-12-25T07:18:21.000+0000",
          "updateTime": "2018-12-25T07:18:18.000+0000",
          "type": 2,
          "resource": null,
          "parentId": "",
          "mLevel": 1,
          "order": 1
        },
        {
          "id": "3",
          "systemCode": "0001",
          "path": "",
          "name": "注册管理",
          "pinyin": "",
          "picture": "/image/icon/icon_002.png",
          "describe": "系统分组管理",
          "state": 1,
          "createTime": "2018-12-25T07:18:21.000+0000",
          "updateTime": "2018-12-25T07:18:18.000+0000",
          "type": 2,
          "resource": null,
          "parentId": "",
          "mLevel": 1,
          "order": 2
        },
        {
          id: "12",
          systemCode: "0001",
          parentId: "1",
          path: '/jurisdiction-Business',
          name: '系统管理',
          order: 1,
        },
        {
          id: "13",
          systemCode: "0001",
          parentId: "1",
          path: '/jurisdiction-resource',
          name: '系统资源',
          order: 1,
        },
        {
          id: "14",
          systemCode: "0001",
          parentId: "1",
          path: '/jurisdiction-role',
          name: '角色权限',
          order: 1,
        },
        {
          id: "16",
          systemCode: "0001",
          parentId: "1",
          path: '/jurisdiction-user',
          name: '系统用户',
          order: 1,
        },
        {
          id: "17",
          systemCode: "0001",
          parentId: "1",
          path: '/jurisdiction-group',
          name: '用户分组管理',
          order: 0,
        },
        {
          id: "22",
          systemCode: "0001",
          parentId: "3",
          path: '/service-mechanism',
          name: '机构管理',
          order: 1,
        },
        {
          id: "21",
          systemCode: "0001",
          parentId: "3",
          path: '/service-department',
          name: '科室管理',
          order: 1,
        },
        {
          id: "23",
          systemCode: "0001",
          parentId: "3",
          path: '/service-people',
          name: '人员管理',
          order: 1,
        },
        {
          id: "24",
          systemCode: "0001",
          parentId: "3",
          path: '/service-equipment',
          name: '设备管理',
          order: 1,
        },
      ], // 菜单的数据
      /* eslint-disable */
    };
  },
  components: {
    MenuCommon,
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
        this.menuEvent(mainMenuData);
      }
    },
    // 菜单的切换
    menuEvent(data) {
      const { name, path, id } = data;
      const routerType = isHttpStart(path) ? 2 : 1;
      if (path) { // 有路径，展开新的页面
        let component = firstUpercase(path.split('-')[1]);
        this.addTab({
          id,
          title: name,
          component,
          routerType,
          path: this.getPath(path),
        });
      }
    },
    // 菜单数据的放置,主菜单的index
    initMenuData(index=0) {
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
      if (result.length > 0 && this.subMenus.length < 1){
        this.menuEvent(this.mainMenus[0]);
      }
    },
    // 根据路径处理返回路径
    getPath(path) {
      return isHttpStart(path) ? path : `#${path}`;
    },
    // 子菜单点击
    menuOpen(id) {
      if (id === this.currentSubMenus) {
        this._initMenu(id);
      }
      this.currentSubMenus = id;
    },
    // 子菜单选中
    menuSelect(id) {
      if (id === this.currentSubMenus) {
        this._initMenu(id);
      }
      this.currentSubMenus = id;
    },
    // 添加路由
    addTab(data) {
      this.$store.dispatch('addTab', data);
    },
    // 激活菜单
    activeTab(name) {
      this.$store.dispatch('activeTableName', name);
    },
    // 根据id变化初始化菜单
    _initMenu(id) {
      const data = this.menuList.filter((data) => {
        return data.id === id;
      });
      if (data && data.length > 0) {
        this.menuEvent(data[0] || {});
      }
    }
  },
  watch: {
    parentMenuList(cur) {
      this.menuList = cur;
      this.initMenuData();
    },
    // 根据当前子菜单id获取子菜单数据
    currentSubMenus(id){
      this._initMenu(id);
    }
  }
};
</script>
