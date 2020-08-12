<script>
    export default {
        sockets: {
            newUser: function(userData){
                this.users.push(userData)
                this.$refs.notifcation.play()
            },
            newMessage: function(message){
                this.messages.push(message)
            }
        },
        data(){
            return{
                isChatStart: false,
                users: [],
                messages: [],
                text: '',
                currentUser: []
            }
        },
        methods: {
            startChat(currentUser){
                this.currentUser = currentUser
                console.log(this.currentUser)
                this.$socket.emit('startChat', currentUser)
                this.isChatStart = true
            },
             sendMessage(){
                this.$socket.emit('message', this.text)
            },
            endSupport(){
                this.users.splice(this.users.findIndex(users => users.id == this.currentUser.id), 1)
                this.messages = []
                this.isChatStart= false
                this.$socket.emit('endSupport')
            }
        }
    }
</script>

<template>
    <div>
        <h1>Canlı Destek</h1>
        <audio ref='notifcation' :src="require('@/assets/sounds/notification.mp3')"></audio>
        <div v-if='isChatStart'>
            <ul v-for='message in messages'>
                <li><b>{{ message.user }}</b> {{ message.message }} </li>
            </ul>
            <input v-model='text' type="text" placeholder="Mesajınız">
            <button @click='sendMessage' :disabled='text.length < 0'>Gönder</button>
            <button @click='endSupport'>Bitir</button>
        </div>
        <div v-if='users.length > 0'>
            <p>Sıradaki kullanıcı sayısı {{users.length}}</p>
            <ul v-for='user in users' :key='user.id'>
                <li @click="startChat(user)"> 
                    İsim: <b>{{ user.name }}</b> 
                    E-Posta Adresi: <b>{{ user.email }}</b> 
                    Konu: <b>{{user.topic}}</b>
                </li>
            </ul>
        </div>
        <div v-else>
            <h2>Henüz her hangi bir kullanıcı bağlanmadı</h2>
        </div>

    </div>
</template>