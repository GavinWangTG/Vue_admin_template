<template>
    <el-container>
        <SideBar />
        <el-container class="is-vertical">
            <NavBar />
            <el-main>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    import NavBar from './NavBar.vue'
	import SideBar from './SideBar.vue'

	export default {
	    name: 'layout',
	    components: {
	        NavBar,
	        SideBar
	    },
        mounted() {
            
        },
        methods: {
            
        }
	}
</script>


