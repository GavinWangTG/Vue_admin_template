<template>
    <div id="app">
        <div class="app-loading" v-if="getAppLoading"></div>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'app',
        data() {
            return {

            }
        },
        computed: {
            ...mapGetters([
                'getAppLoading'
            ])
        }
    }
</script>

<style lang="scss">
    #app {
        
    }
</style>
