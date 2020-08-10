<template>
  <div>
    <img id="main-img" src="https://wallpaperaccess.com/full/677939.jpg" />
    <div id="img-opacity"></div>
    <v-container style="height: 10vh;"></v-container>
    <!-- v-if="$vuetify.breakpoint.name != 'xs' && $vuetify.breakpoint.name != 'sm'" -->
    <v-container id="title-container" class="col-10 col-md-6">
      <p class="ma-0" style="font-size:24px;">Here is..</p>
      <p class="ma-0" style="font-size: 36px;">Coding Whale's Awesome Archive</p>
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
    <v-container id="button-container" class="col-10 col-md-6">
      <v-btn class="mr-5" icon color="white">
        <v-icon large>mdi-github</v-icon>
      </v-btn>
      <v-btn class="mr-5" icon color="white">
        <v-icon large>mdi-email-outline</v-icon>
      </v-btn>
      <v-btn class="mr-5" icon color="white">
        <v-icon large>mdi-feature-search-outline</v-icon>
      </v-btn>
      <v-btn icon>
        🇰🇷
      </v-btn>
      <v-row>
        <v-col cols="12" class="pt-l10 pb-0">
          <p
            class="ma-0"
            style="font-size: 28px; color: white; position:relative; font-weight:100;"
          >Recent Posts</p>
        </v-col>
        <v-col cols="12"></v-col>
      </v-row>
      <div class="text-center" v-if="recentPostLoading">
        <v-progress-circular :width="3" class="mt-10" indeterminate justify="center" color="white"></v-progress-circular>
      </div>
      <v-row justify="center" v-else-if="recentPost">
        <v-col class="col-12 col-md-4">
          <PostCard />
        </v-col>
        <v-col class="col-12 col-md-4">
          <PostCard />
        </v-col>
        <v-col class="col-12 col-md-4">
          <PostCard />
        </v-col>
      </v-row>
      <p v-else class="no-data-text-white mt-5" style="position:relative;">No Data</p>
    </v-container>
    <v-container class="col-10 col-md-6">
      <v-row>
        <v-col cols="12" class="pt-10 pb-0">
          <p
            class="ma-0"
            style="font-size: 28px; color: white; position:relative; font-weight:100;"
          >Categorys</p>
        </v-col>
        <v-col cols="12"></v-col>
      </v-row>
      <v-row id="category-list">
        <v-col cols="12">
          <v-icon color="white">mdi-file-code</v-icon>
          <span>Dev</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-language-python</v-icon>
          <span>python</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-server</v-icon>
          <span>server / backend</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-chart-donut</v-icon>
          <span>data analytics</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-dots-horizontal</v-icon>
          <span>etc</span>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <v-icon color="white">mdi-human-greeting</v-icon>
          <span>Human Being</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-book-open-page-variant</v-icon>
          <span>after reports</span>
        </v-col>
        <v-col cols="12" class="category-inner">
          <v-icon color="white">mdi-head-heart-outline</v-icon>
          <span>interested things</span>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="col-10 col-md-6">
      <v-row>
        <v-col cols="12" class="pt-10 pb-0">
          <p
            class="ma-0"
            style="font-size: 28px; color: white; position:relative; font-weight:100;"
          >Stats</p>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col class="col-12 col-md-6">
          <v-container class="communication-container" style="position: relative;">
            <v-icon color="white" class="mr-2">mdi-eye</v-icon>
            <span>Visitors</span>
            <v-row>
              <v-col cols="6">
                <span class="communication-title">Today</span>
              </v-col>
              <v-col cols="6">
                <span class="communication-title">Total</span>
              </v-col>
              <v-col cols="6">
                <p class="communication-count">10</p>
              </v-col>
              <v-col cols="6">
                <p class="communication-count">10,000</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col class="col-12 col-md-6">
          <v-container class="communication-container" style="position: relative;">
            <v-icon color="white" class="mr-2">mdi-bell-ring</v-icon>
            <span>Subscribers</span>
            <v-row>
              <v-col cols="5">
                <span class="communication-title">Total</span>
              </v-col>
              <v-col cols="7">
                <span class="communication-title">Go to subscribe</span>
              </v-col>
              <v-col cols="5">
                <p class="communication-count">100</p>
              </v-col>
              <v-col cols="7">
                <v-btn color="white" icon style="float:right;" @click="$router.push('/subscribe')">
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
                <span
                  @click="$router.push('/subscribe')"
                  class="communication-count"
                  style="float:right;"
                >Go</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

    <v-container style="height: 10vh;"></v-container>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  name: "Home",
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

.communication-container {
  /* border: 1px solid white; */
  border-radius: 8px;
  color: white;
}

.communication-title {
  font-weight: 100;
}

.communication-count {
  text-align: right;
  font-size: 24px;
  margin: 0;
}
</style>
