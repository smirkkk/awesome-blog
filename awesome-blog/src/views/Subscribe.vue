<template>
  <div>
    <img id="main-img" src="https://wallpaperaccess.com/full/677939.jpg" />
    <div id="img-opacity"></div>
    <v-container style="height: 10vh;"></v-container>
    <!-- v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'" -->
    <v-container id="title-container" class="col-10 col-md-6">
      <p class="ma-0" style="font-size:24px;">Here is..</p>
      <p class="ma-0" style="font-size: 36px;">Coding Whale's Storage</p>
    </v-container>
    <v-container id="search-container" class="col-10 col-md-6">
      <input
        id="search-text-field"
        @keydown.enter="search"
        @input="keyword = $event.target.value"
        placeholder="Search Post..."
      />
      <v-icon id="search-button" v-if="keyword" @click="search" color="white">mdi-magnify</v-icon>
    </v-container>

    <v-container style="height: 10vh;"></v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  name: "Subscribe",
  data() {
    return {
      keyword: undefined,
      recentPost: [],
      recentPostLoading: false,
    };
  },
  components: {
    PostCard,
  },
  methods: {
    search() {
      if (this.keyword) {
        alert(this.keyword);
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

#title-container {
  position: relative;
  color: white;
  font-weight: 100;
}

#search-container {
  position: relative;
}

#search-container #search-text-field {
  border: 1px solid white;
  color: white;
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: 200;
}

#search-container #search-text-field::placeholder {
  color: white;
}

#search-container #search-text-field:focus {
  outline: none;
  caret-color: white;
  border: 2px solid white;
}

#search-button {
  position: absolute;
  top: 24px;
  right: 24px;
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
