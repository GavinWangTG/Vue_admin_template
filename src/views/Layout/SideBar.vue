<template>
    <el-aside class="sidebar-container" :class="[getAsideMini ? 'mini':'']">
        <div class="logo">
            <img :src="defaultLogo" alt="" @error="handleError">
        </div>
        <div class="sidebar-fold" @click="handleFold()">
            <i style="color: #ffffff" class="iconfont icon-caidan"></i>
        </div>
        <el-aside class="sidebar-wrapper">
            <el-menu 
                mode="vertical" 
                :collapse="getAsideMini"
                unique-opened 
                :default-active="$route.path" 
                :router="isRouter"
                background-color="transparent">
                <template v-for="item in routerList">
                    <el-menu-item 
                        v-if="!item.hidden && item.children && item.children.length === 1 && !item.children[0].hidden"
                        :index="item.path+'/'+item.children[0].path" 
                        :key="item.children[0].name">
                        <i class="iconfont" :class="item.children[0].meta.icon"></i>
                        <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
                    </el-menu-item>

                    <el-submenu 
                        v-if="!item.hidden && item.children && item.children.length > 1"
                        :index="item.name || item.path" 
                        :key="item.name"
                        popper-class="sideBar-submenu">
                        <template slot="title">
                            <template v-if="item.meta.icon">
                                <i class="iconfont" :class="item.meta.icon"></i>
                            </template>
                            <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
                        </template>

                        <template v-for="child in item.children" v-if="!child.hidden">
                            <router-link 
                                :to="item.path +'/'+ child.path" 
                                :key="child.name">
                                <el-menu-item :index="item.path +'/'+ child.path">
                                    <i class="iconfont" :class="child.meta.icon"></i>
                                    <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
                                </el-menu-item>
                            </router-link>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-aside>
    </el-aside>
</template>

<script>
    import { constRouterMap } from '@/router/router'
    import { mapGetters, mapMutations } from 'vuex'
    import logo from '@/assets/images/im_logo.jpg'
    import { getUserLoginInfo } from '@/utils/storage'

	export default {
		name: 'sideBar',
        data() {
            return {
                isRouter: true,
                defaultLogo: logo,
                routerList: constRouterMap
            }
        },
        computed: {
            ...mapGetters([
                'getAsideMini'
            ])
        },
        methods: {
            ...mapMutations([
                'UPDATE_ASIDE_MINI'
            ]),
            hasPermission(item) {
                return !item.path ? true : item.meta && item.meta.role && item.meta.role.indexOf(getUserLoginInfo().adminRole.name) >=0;
            },
            handleError() {
                
            },
            //收缩侧栏菜单
            handleFold() {
                this.UPDATE_ASIDE_MINI(!this.getAsideMini)
            }
        },
        mounted() {
            
        }
	}
</script>