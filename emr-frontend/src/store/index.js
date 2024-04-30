// store/index.js

import { createStore } from 'vuex';
import userModule from './user';

export default createStore({
  modules: {
    user: userModule
    // Add other modules here if you have additional Vuex modules
  }
});
