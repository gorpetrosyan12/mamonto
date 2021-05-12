<template>
    <section class="column is-6 is-offset-3">
        <form @submit.prevent="postCollection">
            <b-field label="Title"
                :type="typeTitle"
                :message="msgTitle">
                <b-input v-model="title" maxlength="30"></b-input>
            </b-field>
            <b-field label="Description">
                <b-input v-model="description" maxlength="200" type="textarea"></b-input>
            </b-field>
            <b-button native-type="submit">Submit</b-button>
        </form>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            title: '',
            typeTitle: '',
            msgTitle: '',
            description: '',
        }
    },
    middleware({redirect}) {
        if(!localStorage.getItem('token')) {
            return redirect('/login')
        }
    },
    watch: {
        title() {
            if(this.title !== '') {
                this.typeTitle = ''
                this.msgTitle = ''
            }
        }
    },
    methods: {
        postCollection() {
            if (this.title.trim() === '') {
                this.typeTitle = 'is-danger'
                this.msgTitle = 'This field is required'
            } else {
                axios.post('https://stage.api.mamonto.com/userarea/movies/collections', 
                    {
                        title: this.title,
                        description: this.description
                    }, 
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
                    }
                )
                .then((res)=> {
                    this.$buefy.notification.open('Collection is saved!')
                    this.title = ''
                    this.description = ''
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }
}
</script>