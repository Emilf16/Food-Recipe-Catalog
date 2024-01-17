// main.js

import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"; // Importa tu store Vuex
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// import { getAnalytics } from "firebase/analytics";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

const app = createApp(App);

app.use(store); // Usa tu store Vuex
app.use(vuetify);

// Inicializa Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBi3XU_Gtizu4G7ZjSbE6KlsqIAx11dsOY",
  authDomain: "angularcard-6b538.firebaseapp.com",
  projectId: "angularcard-6b538",
  storageBucket: "angularcard-6b538.appspot.com",
  messagingSenderId: "246148850388",
  appId: "1:246148850388:web:b4698b6426e6fccc651141",
  measurementId: "G-KNM1Q7LTN6",
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

app.config.globalProperties.$db = db;

app.mount("#app");
