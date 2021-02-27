/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

// For chat auto scroll
import VueChatScroll from 'vue-chat-scroll';
Vue.use(VueChatScroll);

// For notifications
import Toaster from 'v-toaster'
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'
// optional set default timeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('message-component', require('./components/MessageComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',

    data:{
        message:'',
        chat:{
            message:[],
            user:[],
            color:[],
            time:[],
        },
        typing: '',
        numberOfUsers: 0,
    },

    watch:{
        message(){
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },

    methods:{
        send(){
            // Send message
            if(this.message.length !== 0){
                this.chat.message.push(this.message);
                this.chat.user.push('You');
                this.chat.color.push('success');
                this.chat.time.push(this.getTime());

                axios.post('/send', {
                    message: this.message,
                    chat: this.chat,
                })
                    .then(response => {
                        console.log(response);
                        this.message = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }else{
                console.log('message field cannot be empty');
            }
        },

        getTime(){
            let time = new Date();
            // return time.getHours()+':'+time.getMinutes();
            let hours = time.getHours() ; // gives the value in 24 hours format
            let AmOrPm = hours >= 12 ? 'pm' : 'am';
            hours = (hours % 12) || 12;
            let minutes = time.getMinutes() ;
            return hours + ":" + minutes + " " + AmOrPm;
        },

        getOldMessages(){
            axios.post('/getOldMessage')
                .then(response => {
                    console.log(response);
                    if(response.data !== ''){
                        this.chat = response.data;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        deleteSession(){
            axios.post('/deleteSession')
                .then(response => this.toaster.success('Chat history is deleted'));
        }
    },

    mounted(){
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                // Receive Message
                this.chat.message.push(e.message);
                this.chat.user.push(e.user);
                this.chat.color.push('warning');
                this.chat.time.push(this.getTime());

                axios.post('/saveToSession',{
                    chat: this.chat
                })
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error);
                    });

                // console.log(e);
            }).listenForWhisper('typing', (e) => {
                if (e.name !== ''){
                    this.typing = 'typing...';
                }else{
                    this.typing = '';
                }
            });

        Echo.join('chat')
            .here((users) => {
                this.numberOfUsers = users.length;
            })
            .joining((user) => {
                this.numberOfUsers +=1;
                this.$toaster.success(user.name+' just joined the chat');
            })
            .leaving((user) => {
                this.numberOfUsers -=1;
                this.$toaster.warning(user.name+' just left the chat');
            });
    }
});
