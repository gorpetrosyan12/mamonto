<template>
     <section class="column is-6 is-offset-3">
        <form @submit.prevent="login">
            <b-field label="Username"
                :type="typeUsername"
                :message="msgUsername">            
                <b-input v-model="username" maxlength="30"></b-input>
            </b-field>

            <b-field label="Password"
                :type="typePassword"
                :message="msgPassword">

                
                <b-input type="password"
                    v-model="password"
                    password-reveal>
                </b-input>
            </b-field>

            <b-button native-type="submit">Log in</b-button>
        </form>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            username: '',
            typeUsername: '',
            msgUsername: '',
            password: '',
            typePassword: '',
            msgPassword: ''
        }
    },
    middleware({redirect}) {
        if(localStorage.getItem('token')) {
            return redirect('/')
        }
    },
    watch: {
        username() {
            if (this.username.trim() == '') {
                this.typeUsername = 'is-danger'
                this.msgUsername = 'This field is required'
            } else {
                this.typeUsername = ''
                this.msgUsername = ''
            }
        },
        password() {
            if (this.password.trim() == '') {
                this.typePassword = 'is-danger'
                this.msgPassword = 'Password is required'
            } else {
                this.typePassword = ''
                this.msgPassword = ''
            }
        }
    },
    methods: {
        clickMe() {
            this.$buefy.notification.open('Loged in!!')
        },
        login() {
            if (this.username.trim() !== '' && this.password.trim() !== '') {
                axios.post('https://stage.api.mamonto.com/token', {
                    username: this.username,
                    password: this.password,
                    client_id: "frontend_app",
                    client_secret: "secret",
                    grant_type: "password",
                })
                .then((res) => {
                    localStorage.setItem('token', res.data.access_token)
                    this.$buefy.notification.open('You are loged in!')
                    this.$router.push('/')
                    this.$store.commit('checkAuth')
                })
                .catch((err) => {
                    this.$buefy.notification.open('Username or password incorect!!!')
                })
            }
            if (this.username.trim() == '') {
                this.typeUsername = 'is-danger'
                this.msgUsername = 'This field is required'
            }
            if (this.password.trim() == '') {
                this.typePassword = 'is-danger'
                this.msgPassword = 'Password is required'
            }
        }
    }
}
</script>