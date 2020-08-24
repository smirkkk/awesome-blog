<template>
  <div>
    <img id="main-img" src="https://wallpaperaccess.com/full/677939.jpg" />
    <div id="img-opacity"></div>
    <v-container style="height: 10vh;"></v-container>
    <v-container class="col-10 col-md-6" style="position:relative">
      <p id="posts-title">Posts in category : {{categoryTitle}}</p>
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
  name: "PostsForCategory",
  data() {
    return {
      postList: undefined,
      isPostLoading: true,
      postTotalCount: undefined,
      categoryTitle: undefined
    };
  },
  components: {
    PostCard,
  },
  methods: {
    categoryValid() {
      this.$http
        .get("/posts/categories/" + this.category + "/valid")
        .then((result) => {
          this.categoryTitle = result.data.title;
          if (result.data.valid === false) {
            alert("invalid");
          } else {
            this.getPosts();
          }
        });
    },
    getPosts() {
      this.$http
        .get(
          "/posts/categories/" +
            this.category +
            "/pages/" +
            this.page.toString()
        )
        .then((result) => {
          this.postTotalCount = result.data.total;
          this.postList = result.data.post;
        });
    },
  },
  computed: {
    category() {
      return this.$route.params.category;
    },
    page() {
      if (this.$route.query.page) {
        return parseInt(this.$route.query.page);
      } else {
        return 1;
      }
    },
  },
  async mounted() {
    await this.categoryValid();
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
</style>

