<template>
  <div>
    <el-treemenu :menuList="menuList" :activeMenuId="activeMenuId"></el-treemenu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeMenuId: '',
        menuList: [],
      };
    }
  };
</script>
