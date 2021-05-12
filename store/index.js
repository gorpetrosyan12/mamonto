export const state = () => ({
    auth: ''
  })
   
export const mutations = {
    checkAuth(state) {
        state.auth = localStorage.getItem('token') == null ? true : false
    }
}