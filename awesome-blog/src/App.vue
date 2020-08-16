<template>
  <v-app  :style="{background: $vuetify.theme.themes['light'].background}">
    <v-app-bar
    v-if="appBar"
      app
      color="white"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="32"
          @click="$router.push('/')"
        />
        <v-spacer></v-spacer>
        <v-btn @click="sideDrawer = !sideDrawer"></v-btn>
      </div>
    </v-app-bar>
    <!-- <SideDrawer :drawer="sideDrawer" /> -->

    <v-main>
      <router-view :key="Date.now().toString()" />
    </v-main>
    <!-- <img id="background-image" src="https://i.pinimg.com/originals/3d/df/d2/3ddfd200f246a8840bf3f5bdaa6c0d73.gif" /> -->
  </v-app>
</template>

<script>
import SideDrawer from "@/components/SideDrawer"

export default {
  name: 'App',
  components: {
    SideDrawer
  },
  computed:{
    appBar(){
      if(this.disallowedPath.includes(this.$route.name)){
        return false;
      } else {
        return true;
      }
    }
  },
  data(){
    return {
      disallowedPath: [
        'Home',
        'Subscribe',
        'PostsForCategory',
        'SearchPost'
      ],
      sideDrawer: false
    }
  },
  mounted(){
    console.log(this.$route);
  }
};
</script>

<style scoped>
#background-image {
  width: 300px;
  position: fixed;
  right: -100px;
  bottom: -100px;
  opacity: 0.2;
}
</style>

<style>
.no-data-text-white {
  text-align: center;
  color: white;
  font-weight: 100;
}
</style>