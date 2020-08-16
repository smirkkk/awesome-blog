<template>
    <v-container>
        <form>
            <v-file-input v-model="image" accept="image/*" label="File input"></v-file-input>
        </form>
        <v-btn v-if="image" @click="upload">upload</v-btn>
    </v-container>
</template>
<script>
export default {
    name: "UploadImage",
    data(){
        return {
            image: undefined
        }
    },
    methods: {
        upload(){
            const formData = new FormData();
            formData.append('image', this.image);
            this.$http.post('/posts/images', formData, {
                'Content-Type': 'multipart/form-data'
            }).then(result => {
                if(result.data){
                    this.$emit('upload', result.data)    
                } else {
                    alert('upload error');
                }
                this.image = undefined;
            })
        }
    }
}
</script>