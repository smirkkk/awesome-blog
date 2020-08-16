<template>
  <div>
    <img id="main-img" src="https://wallpaperaccess.com/full/677939.jpg" />
    <div id="img-opacity"></div>
    <v-container style="height: 10vh;"></v-container>
    <v-container id="search-container" class="col-10 col-md-6">
      <input
        id="search-text-field"
        @keydown.enter="search"
        @input="keyword = $event.target.value"
        placeholder="Search Post..."
      />
      <v-icon id="search-button" v-if="keyword" @click="search" color="white">mdi-magnify</v-icon>
    </v-container>
    <v-container class="col-10 col-md-6" style="position:relative">
      <p id="posts-title">Searched : {{searchedKeyword}}</p>
      <p id="posts-count" v-if="postTotalCount == 0">There isn't any post.</p>
      <p id="posts-count" v-if="postTotalCount == 1">There is only 1 post.</p>
      <p id="posts-count" v-if="postTotalCount > 1">There are {{postTotalCount}} posts.</p>
    </v-container>
    <v-container class="col-10 col-md-6">
      <v-row justify="start">
        <v-col v-for="post in postList" :key="'post-' + post.permalink" class="col-12 col-md-4">
          <PostCard :post="post" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import PostCard from "@/components/PostCard.vue";

export default {
  name: "SearchPost",
  components: {
    PostCard,
  },
  data() {
    return {
      postTotalCount: undefined,
      postList: undefined,
      keyword: undefined,
    };
  },
  computed: {
    searchedKeyword() {
      return this.$route.query.q;
    },
  },
  methods: {
    search() {
      if (this.keyword) {
        this.$router.push("/search/posts?q=" + this.keyword);
      }
    },
    getResult(){
        this.$http.get('/posts/search/' + this.searchedKeyword).then(result => {
            this.postTotalCount = result.data.total;
            this.postList = result.data.post;
            console.log(result.data);
        });
    }
  },
  mounted(){
      this.getResult();
  }
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

#posts-title {
  font-size: 24px;
  color: white;
  font-weight: 100;
  margin: 0;
}

#posts-count {
  font-size: 16px;
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
</style>
