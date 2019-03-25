<template>
  <div>
    <el-backstage :headerLogo="headerLogo" :headerSysName="headerSysName" :menuList="menuList"
                  @headerCommand="headerCommand"></el-backstage>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headerLogo:  '',
        headerSysName: '运维系统',
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
        ]
      };
    },
    methods: {
      headerCommand(command) {
        if (command === 'signOut') {
          localStorage.clear();
          this.$router.replace({
            path: '/login'
          });
        } else {
          this.$router.replace({
            path: `/${command}?id=${this.user.id}`
          });
        }
      }
    }
  };
</script>
