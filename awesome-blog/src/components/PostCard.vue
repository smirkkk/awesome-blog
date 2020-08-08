<template>
  <v-card shaped>
    <v-card-title>Python version 4 released</v-card-title>

    <v-card-subtitle>python</v-card-subtitle>
    <v-card-text>
        <p>You are a fool.</p>
    </v-card-text>
    <v-card-subtitle>2001-01-11</v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: "PostCard",
  props: {
      postId : {
          type: Number,
          default: undefined
      }
  }
};
</script>