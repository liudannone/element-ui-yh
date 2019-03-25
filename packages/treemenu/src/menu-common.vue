<template>
  <div>
    <template v-for="(list,index) in this.menuList" >
      <el-submenu v-if="list.children && list.children.length>0"
                  :data-menu_current="activeMenuId===list.id"
                  :index="list.id" :key="index">
        <template slot="title">
          <span slot="title">
            {{ list.name}}{{list.id}}
          </span>
        </template>
        <Menu :menuList="list.children" :activeMenuId="activeMenuId"></Menu>
      </el-submenu>
      <el-menu-item v-else :index="list.id" :key="index"
                    :data-menu_current="activeMenuId===list.id">
        <span>
          {{list.name}}{{list.id}}
        </span>
      </el-menu-item>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'menu-common',
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    activeMenuId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {

    };
  },
  created() {

  },
  methods: {

  }
};
</script>