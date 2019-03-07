
const user = {
	state: {
		appLoading: true,
	},
	getters: {
		getAppLoading: state => state.appLoading,
		getPermissionsList: state => state.permissionsList
	},
	mutations: {
		UPDATE_APP_LOADING: (state,payload) =>{
            state.appLoading = payload
        },
	},
	actions: {
		/**
		 * 全局loading
		 */
		updateAppLoading: ({commit},payload) =>{
            commit('UPDATE_APP_LOADING',payload)
        },
		/**
		 * 前端登出
		 */
		loginOut: ({commit, state}) =>{

			return new Promise(resolve => {
				commit('UPDATE_APP_LOADING', false)
		        resolve()
		    })
		}
	}
}

export default user