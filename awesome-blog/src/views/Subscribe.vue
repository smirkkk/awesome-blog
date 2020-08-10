<template>
  <div>
    <img id="main-img" src="https://wallpaperaccess.com/full/677939.jpg" />
    <div id="img-opacity"></div>
    <v-container style="height: 10vh;"></v-container>
    <div style="position: relative;">
      <!-- v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'" -->
      <v-container id="avatar-container" class="col-11 col-md-3 pa-4 pl-md-6 pr-md-6 pt-2 pb-1">
        <v-avatar style="margin:auto; display: block;" color="indigo" size="36">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
        <p style="text-align: center;" class="ma-0">Coding Whale</p>
      </v-container>
      <v-container id="conversation-container" class="col-11 col-md-3 pa-4 pl-md-6 pr-md-6 pt-1">
        <v-container
          class="conversation-talk mb-2 pt-2 pb-2"
          v-for="(conversation, i) in conversations"
          :key="i"
          :class="{small: $vuetify.breakpoint.name == 'xs' || $vuetify.breakpoint.name == 'sm', admin: conversation.who == 'admin', user: conversation.who == 'user'}"
        >{{conversation.text}}</v-container>
      </v-container>

      <v-container id="search-container" class="col-11 col-md-3 pa-4 pa-md-6">
        <input
          id="email-field"
          @keydown.enter="subscribe"
          @input="email = $event.target.value"
          placeholder="Message"
        />
        <v-icon id="search-button" v-if="email" @click="subscribe" color="#1b8dfd">mdi-send</v-icon>
      </v-container>

      <v-container style="height: 10vh;"></v-container>
    </div>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  name: "Subscribe",
  data() {
    return {
      conversations: [
        {
          who: "admin",
          text: "Do you want to subscribe C W A A?",
        },
        {
          who: "user",
          text: "Yes. Your posts are not bad. Anyway, is it free?🤔",
        },
        {
          who: "admin",
          text: "Sure. Everything is free.🤗",
        },
        {
          who: "user",
          text: "Cool. Other benefits?",
        },
        {
          who: "admin",
          text: "1. I will send you an email when I write a new post.😉",
        },
        {
          who: "user",
          text: "And?",
        },
        {
          who: "admin",
          text: "2. Subscriber Badge will show when you write a comment.😎",
        },
        {
          who: "user",
          text: "That's ALL???",
        },
        {
          who: "user",
          text: "Ok.. Ok.. I will subscribe it...😞",
        },
        {
          who: "admin",
          text: "Thank you! Then, send me your email. 👇👇👇",
        },
      ],
      email: undefined,
    };
  },
  components: {
    PostCard,
  },
  methods: {
    async subscribe() {
      if (this.email) {
        await this.conversations.push({
          who: "user",
          text: this.email,
        });
        await this.$http.post('/manage/subscribe', {email: this.email}).then(
          result=> {
            if(!result.data.already){
              this.conversations.push({
                who: "admin",
                text: result.data.email + ' is already subscribed me!',
              });   
            } else {
              this.conversations.push({
                who: "admin",
                text: result.data.email + ' subscribed successfully!',
              });   
            }
          }
        );
        var objDiv = document.getElementById("conversation-container");
        objDiv.scrollTop = objDiv.scrollHeight;
        console.log(objDiv)
        this.email = '';
      }
    },
  },
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
};
</script>

<style scoped>
#main-img {
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: fixed;
}

#img-opacity {
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.6;
  position: fixed;
}

#conversation-container {
  background: white;
  max-height: 70vh;
  overflow-y: scroll;
  /* position: relative; */
}

#conversation-container .conversation-talk {
  width: max-content;
  max-width: 55%;
  border-radius: 12px;
}

#conversation-container .conversation-talk.small {
  max-width: 70%;
}

#conversation-container .conversation-talk.admin {
  margin-left: 0px;
  background: lightgray;
}

#conversation-container .conversation-talk.user {
  margin-right: 0px;
  background: #1b8dfd;
  color: white;
}

#avatar-container {
  background: white;
  position: relative;
  border-bottom: 1px solid lightgray;
}
#search-container {
  border-top: 1px solid lightgray;
  background: white;
  position: relative;
}

#search-container #email-field {
  border: 1px solid gray;
  color: black;
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
}

#search-container #email-field::placeholder {
  color: gray;
}

#search-container #email-field:focus {
  outline: none;
  caret-color: black;
  border: 2px solid #1b8dfd;
}

#search-button {
  position: absolute;
  top: 36%;
  right: 8%;
}

#category-list p,
#category-list span {
  position: relative;
  color: white;
  font-weight: 100;
}

#category-list i {
  margin-right: 8px;
}

#category-list .category-inner {
  padding-left: 36px;
}
</style>
