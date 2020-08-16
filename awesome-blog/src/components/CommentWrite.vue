<template>
  <v-container class="pa-4 pa-md-0">
    <v-form ref="form" v-model="valid">
      <v-row>
        <v-col cols="6" md="3" class="pt-0 pb-0">
          <v-text-field label="nickname" v-model="nickname" :rules="nicknameRules" required></v-text-field>
        </v-col>
        <v-col cols="6" md="3" class="pt-0 pb-0">
          <v-text-field
            label="password"
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.mobile" cols="6" class="pt-0 pb-0"></v-col>
        <v-col cols="12" md="6" class="pt-0 pb-0">
          <v-text-field label="email" v-model="email" :rules="emailRules"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0 pb-0">
          <v-textarea
            :counter="200"
            label="comment"
            v-model="comment"
            :rules="commentRules"
            required
          ></v-textarea>
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-btn height="50px" width="100%" :disabled="!valid" @click="submit" outlined>Write</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
export default {
  name: "CommentWrite",
  props: {
    tag: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      valid: false,
      nickname: "",
      nicknameRules: [
        (v) => !!v || "Nickname is required",
        (v) =>
          (v && v.length >= 2) || "Nickname must be more than 2 characters",
        (v) =>
          (v && v.length <= 10) || "Nickname must be less than 10 characters",
      ],
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 4) || "Password must be more than 4 characters",
        (v) =>
          (v && v.length <= 20) || "Password must be less than 20 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      comment: "",
      commentRules: [
        (v) => !!v || "Comment is required",
        (v) =>
          (v && v.length <= 200) || "Comment must be less than 200 characters",
      ],
    };
  },
  computed: {
    permalink() {
      return this.$route.params.permalink;
    },
  },
  methods: {
    submit() {
      if (this.valid) {
        this.$http
          .post("/posts/" + this.permalink + "/comments", {
            nickname: this.nickname,
            password: this.password,
            email: this.email,
            comment: this.comment,
          })
          .then((result) => {
            window.localStorage.setItem("nickname", this.nickname);
            window.localStorage.setItem("email", this.email);

            this.comment = " ";
            this.$emit("write", result.data);
          });
      }
    },
  },
  watch:{
    tag(tag){
      if(tag !== undefined){
        this.comment += '@' + tag;
        this.$emit('tag');
      }
    }
  },
  mounted(){
      this.email = window.localStorage.getItem('email');
      this.nickname = window.localStorage.getItem('nickname');
  }
};
</script>