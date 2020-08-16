import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1a222c', // #E53935
          secondary: colors.red.lighten4, // #FFCDD2
          accent: colors.indigo.base,
          background: colors.grey.lighten3
          // background: '#ffffff' // #3F51B5
        },
      },
    },
  });
