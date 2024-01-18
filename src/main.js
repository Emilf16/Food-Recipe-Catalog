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
// import "vuetify/styles";
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import PrimeVue from "primevue/config";
// import Lara from "@/presets/lara"; //import preset
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import Image from "primevue/image";
import Card from "primevue/card";
import Column from "primevue/column";
import Dialog from "primevue/dialog";

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

const app = createApp(App);
/* eslint-disable */
app.use(store); // Usa tu store Vuex
app.use(vuetify);
app.use(PrimeVue);
app.component("AutoComplete", AutoComplete);
app.component("Button", Button);
app.component("Card", Card);
app.component("Image ", Image);
app.component("Column ", Column);
app.component("Dialog ", Dialog);

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
