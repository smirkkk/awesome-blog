<template>
  <v-container class="pa-4 pa-md-0">
    <p>There are {{totalComment}} comments.</p>
    <v-card
      class="mb-5"
      width="max-content"
      min-width="30%"
      :max-width="$vuetify.breakpoint.mobile ? '100%' : '70%'"
      v-for="comment in commentList"
      :key="'comment-' + comment.text + comment.id"
    >
      <p class="ma-0 pa-4 pb-1">
        {{comment.writer}}
        <v-icon small color="#ffc107" v-if="comment.is_admin" style="line-height:1px;">mdi-crown</v-icon>
        <v-icon
          small
          color="blue"
          v-if="comment.is_subscriber"
          style="line-height:1px;"
        >mdi-check-circle</v-icon>
      </p>
      <p class="ma-0 pa-4 pt-1 comment-published">{{comment.published_at}}</p>
      <p class="ma-0 pa-4 pt-2" v-if="!comment.deleted">{{comment.text}}</p>
      <v-card-text v-else>
        <p class="ma-0">This comment was deleted.</p>
      </v-card-text>
      <v-card-actions v-if="!comment.deleted">
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon @click="$emit('tag', comment.writer)">mdi-subdirectory-arrow-right</v-icon>
        </v-btn>
        <v-btn icon  @click="openEditDialog(comment)">
          <v-icon>mdi-comment-edit-outline</v-icon>
        </v-btn>
        <v-btn icon @click="openDeleteDialog(comment)">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="deleteDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Delete Comment</v-card-title>
          <v-card-text>
            <v-text-field @keypress.enter="deleteComment(comment)" v-model="password" type="password" label="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="deleteDialog = false">취소</v-btn>
            <v-btn color="red" text @click="deleteComment(comment)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="editDialog" persistent :max-width="editValid ?  '500' : '290'">
        <v-card>
          <v-card-title class="headline">Edit Comment</v-card-title>
          <v-card-text>
            <v-text-field @keypress.enter="deleteComment(comment)" v-model="password" type="password" label="password"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="editDialog = false">취소</v-btn>
            <v-btn color="red" text @click="deleteComment(comment)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "CommentList",
  props: {
    newComment: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    permalink() {
      return this.$route.params.permalink;
    },
  },
  watch: {
    newComment(v) {
      if (v !== undefined) {
        this.commentList.push(v);
        this.$emit("push");
      }
    },
  },
  data() {
    return {
      commentList: undefined,
      totalComment: undefined,
      deleteDialog: false,
      editDialog: false,
      editValid: false,
      selectedComment: undefined,
      password: undefined,
      passwordRules: [

      ]
    };
  },
  methods: {
    getCommentList() {
      this.$http
        .get("/posts/" + this.permalink + "/comments")
        .then((result) => {
          this.commentList = result.data.comment;
          this.totalComment = result.data.total;
        });
    },
    openDeleteDialog(comment) {
      this.password = undefined;
      this.deleteDialog = true;
      this.selectedComment = comment;
    },
    openEditDialog(comment) {
      this.password = undefined;
      this.editDialog = true;
      this.selectedComment = comment;
    },
    async deleteComment() {
      this.$http
        .delete("/posts/" + this.permalink + "/comments", {
          data:{
          password: this.password,
          comment: this.selectedComment.id
          }
        })
        .then((result) => {
          if (result.data === true) {
            this.selectedComment.deleted = true;
            this.deleteDialog = false;
          } else {
            alert("Check Password");
          }
        });
    },
  },
  mounted() {
    this.getCommentList();
  },
};
</script>

<style scoped>
.comment-published {
  color: gray;
  font-size: 14px;
}
</style>
