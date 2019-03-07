
const app = {
    state: {
        asideMini: false,
        isMaterial: false,
    },
    getters: {
        getAsideMini: state => state.asideMini,
    },
    mutations: {
        UPDATE_ASIDE_MINI: (state,payload) => {
        	state.asideMini = payload
        },
    },
    actions: {
        
    }
}

export default app