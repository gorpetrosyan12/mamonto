<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img
                src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                alt="Lightweight UI components for Vue.js based on Bulma"
            >
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="nuxt-link" to="/">
          Home
        </b-navbar-item>
        <b-navbar-item tag="nuxt-link" to="/collection">
          Collection
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div" v-if="auth">
          <nuxt-link to="/login" class="button is-link">
            Log in
          </nuxt-link>
        </b-navbar-item>
        <b-navbar-item v-else tag="div">
          <b-button class="button is-link" @click="logout">
            Log out
          </b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section>
      <div class="container column is-12">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    }
  },
  mounted() {
    this.$store.commit('checkAuth')
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/')
      this.$store.commit('checkAuth')
    }
  }
}
</script>
