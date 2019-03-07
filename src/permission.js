import router from './router/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { USER_AUTH_TOKEN, getUserLoginInfo } from './utils/storage';

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start();

    let title = document.title;
    if (to.meta.title != title) {
        document.title = 'Roopsi - ' + to.meta.title;
    }
    next()
    // let tokenItem = JSON.parse(localStorage.getItem(USER_AUTH_TOKEN));
    // let userInfo = getUserLoginInfo();
    // //如未登录去登录页
    // if (tokenItem && userInfo && userInfo.id) {
    //     let matched = to.matched[0].meta;

    //     if(matched && !matched.role){
    //         next()
    //     }else{
    //         if(matched.role.indexOf(userInfo.adminRole.name) < 0) {
    //             next('/401');
    //         }
    //     }
        
    //     next()
    // } else {
    // 	if(to.path === '/login'){
    // 		next()
    // 	}else{
    // 		next('/login')
    // 	}
    // }
})
router.afterEach(() => {
    store.dispatch('updateAppLoading',false)
    NProgress.done()
})