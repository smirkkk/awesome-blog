<template>
  <v-card v-if="post" shaped @click="$router.push('/post/' + post.permalink)">
    <v-card-title>{{post.title}}</v-card-title>

    <v-card-subtitle>{{post.category}}</v-card-subtitle>
    <v-card-text>
        <p>{{post.preview_text}}</p>
    </v-card-text>
    <v-card-subtitle>{{post.published_at}}</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "PostCard",
  props: {
      post : {
          type: Object,
          default: undefined
      }
  }
};
</script>