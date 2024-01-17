import { createStore } from "vuex";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const store = createStore({
  state: {
    db: null,
  },
  mutations: {
    setDb(state, db) {
      state.db = db;
    },
  },
  actions: {
    initializeDb({ commit }) {
      // Puedes personalizar la configuración de Firebase aquí si es necesario
      const firebaseConfig = {
        apiKey: "AIzaSyBi3XU_Gtizu4G7ZjSbE6KlsqIAx11dsOY",
        authDomain: "angularcard-6b538.firebaseapp.com",
        projectId: "angularcard-6b538",
        storageBucket: "angularcard-6b538.appspot.com",
        messagingSenderId: "246148850388",
        appId: "1:246148850388:web:b4698b6426e6fccc651141",
        measurementId: "G-KNM1Q7LTN6",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      commit("setDb", db);
    },
  },
});

export default store;
