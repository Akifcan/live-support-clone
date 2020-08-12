<script>
    export default {
        sockets: {
            showChatScreen: function(message){
                this.isChatStart = true
                this.messages.push(message)
            },
               newMessage: function(message){
                this.messages.push(message)
            },
            endSupport: function(){
                this.messages = []
                this.isChatStart = false
                this.isRequestSend = false
            }
        },
        data(){
            return{
                isChatStart: false,
                isRequestSend: false,
                name: '',
                email: '',
                selectedTopic: '',
                messages: [],
                text: '',
                topics: ['Bilgi Alma', 'Ödeme Sorunu', 'Diğer'],
            }
        },
        methods: {
            sendRequest(){
                this.isRequestSend = true
                this.$socket.emit('sendRequest', {
                    id: Math.floor(Math.random() * 1000),
                    name: this.name,
                    email: this.email,
                    topic: this.selectedTopic
                })
            },
            sendMessage(){
                this.$socket.emit('message', this.text)
            }
        }       
    }
</script>

<template>
    <div>
        <h1>Canlı Desteğe Hoşgeldiniz!</h1>
        <div v-if='isChatStart'>
            <ul v-for='message in messages'>
                <li><b>{{ message.user }}</b> {{ message.message }} </li>
            </ul>
            <input v-model='text' type="text" placeholder="Mesajınızı buraya yazın">
            <button @click='sendMessage' :disabled='text.length < 0'>Gönder</button>
        </div>
        <form @submit.prevent='sendRequest' v-if='!isRequestSend'>
            <input type="text" placeholder="Adınız..." v-model='name' />
            <input type="email" placeholder="E-Posta Adresiniz" v-model='email' />
            <button 
                type="button"
                v-for='topic in topics' 
                :key='topic'
                @click='selectedTopic = topic'>
                {{ topic }}
            </button>
            <button 
                :disabled="name == '' || email == '' || selectedTopic == ''"
                type="submit" 
                class="send-message">Mesaj Gönder</button>
        </form>
        <div v-if='isRequestSend && !isChatStart'>
            <h1>İsteğiniz alınmıtşır lütfen bekleyin.</h1>
        </div>
    </div>
</template>

<style>
    input, button{
        display: block;
    }
    .send-message{
        margin-top: 2em;
    }
</style>