<template>
  <v-form v-model="valid" ref="form">
      <p>{{valid}}</p>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="username" label="username" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="password" label="password" type="password" required></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn @click="validate"></v-btn>
  </v-form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valid: false,
      username: undefined,
      password: undefined,
    };
  },
  methods: {
    validate() {
      this.$http.post('/manage/login', {
          username: this.username,
          password: this.password
      }).then(
          result => {
              if(result.data === true){
                  window.sessionStorage.setItem('login', true);
                  this.$router.push('/');
              }
          }
      )
    },
  },
};
</script>