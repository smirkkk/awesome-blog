<template>
  <v-container class="pa-0">
    <div v-if="!$vuetify.breakpoint.mobile" style="width: 100%; height: 5vh;"></div>  
    <v-container id="post-title-container" class="pa-4 pa-md-12 col-12 col-md-8" v-if="post">
      <p class="mb-0" id="post-category" @click="$router.push('/category/' + post.category + '/posts')">{{post.category}}</p>
      <p class="mb-0" id="post-title">{{post.title}}</p>
      <p id="post-published-at"> <v-icon small>mdi-pencil</v-icon> {{post.published_at}} | <v-icon small>mdi-eye</v-icon>{{post.hit}}</p>
      <v-divider></v-divider>
    </v-container>
    <v-container id="post-container" class="pa-6 pa-md-12 col-12 col-md-8" v-if="post">
      <p v-html="markdownText"></p>
    </v-container>
    <v-container id="comment-container" class="col-12 col-md-8 pl-0 pr-0">
      <CommentList @push="newComment=undefined" :newComment="newComment" @tag="tagUser" />
      <CommentWrite @write="write" :tag="tag" @tag="tag=undefined;" />
    </v-container>
    <!-- <img src="@/assets/logo_outlined.png" /> -->
    <div style="width: 100%; height: 10vh;"></div>
  </v-container>
</template>
<script>
import CommentList from "@/components/CommentList"
import CommentWrite from "@/components/CommentWrite"

export default {
  name: "Post",
  components: {
    CommentList,
    CommentWrite
  },
  data() {
    return {
      permalink: undefined,
      post: undefined,
      isPostLoading: true,
      newComment: undefined,
      tag: undefined
    };
  },
  computed: {
    markdownText() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        headerIds: false,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
      });
      return marked(this.post.text);
    },
  },
  methods: {
    getPostDetail() {
      this.$http.get("/posts/" + this.permalink).then((result) => {
        this.isPostLoading = false;
        this.post = result.data;
      });
    },
    write(comment){
      this.newComment = comment;
      // console.log(comment);
    },
    tagUser(tag){
      this.tag = tag;
    }
  },
  async mounted() {
    this.permalink = await this.$route.params.permalink;
    this.getPostDetail();
  },
};
</script>

<style scoped>
#post-title {
  text-align: center;
  font-size: 28px;
}

#post-published-at,
#post-category {
  color: gray;
  text-align: center;
}

#post-category:hover {
  cursor: pointer;
}

#post-title-container, 
#post-container {
  background: white;
}

#post-container >>> img {
  max-width: 100%;
}

#post-container >>> p {
  word-break: keep-all;
}
</style>
