<template>
  <v-container>
    <v-container>
      <p>사진 업로드하기</p>
      <UploadImage @upload="imageUploaded" />
    </v-container>
    <v-container>
      <p>제목</p>
      <v-text-field v-model="title"></v-text-field>
      <p>미리보기</p>
      <v-text-field v-model="preview"></v-text-field>
      <p>permalink</p>
      <v-text-field v-model="permalink"></v-text-field>
              <v-select
          :items="categoryList"
          v-model="category"
          label="category"
        ></v-select>
      <p>글내용</p>
      <v-textarea v-model="text"></v-textarea>
      <v-container id="post-content">
        <p v-html="previewText"></p>
      </v-container>
      <v-btn @click="publish">publish</v-btn>
    </v-container>
  </v-container>
</template>

<script>
import UploadImage from "@/components/UploadImage.vue";
export default {
  name: "Publish",
  data() {
    return {
      title: undefined,
      permalink: undefined,
      preview: undefined,
      category: undefined,
      categoryList: undefined,
      text: "",
      defaultPath:
        "![post image](https://cwaa.s3.ap-northeast-2.amazonaws.com/",
    };
  },
  components: {
    UploadImage,
  },
  computed: {
    previewText() {
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
      return marked(this.text);
    },
  },
  methods: {
    imageUploaded(path) {
      this.text += this.defaultPath + path + ")";
    },
    getInfo(){
        this.$http.get('/posts/publish').then(
            result => {
                this.categoryList = result.data.category;
            }
        )
    },
    publish(){
      this.$http.post('/posts/publish', {
        title: this.title,
        text: this.text,
        permalink: this.permalink,
        category: this.category,
        preview: this.preview
      }).then(
            result => {
                this.$router.push('/post/' + this.permalink)
            }
        )
    }
  },
  mounted(){
      this.getInfo();
  }
};
</script>

<style scoped>
#post-content img {
  max-width: 100%;
}
</style>