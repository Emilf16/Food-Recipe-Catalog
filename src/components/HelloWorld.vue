<template>
  <!-- Encabezado -->
  <v-row class="header">
    <v-col>
      <h1 class="header-title">¡Descubre Nuestro Menú!</h1>
      <p class="header-subtitle">
        Explora una variedad de deliciosas comidas de nuestro restaurante.
      </p>
    </v-col>
  </v-row>

  <v-app id="inspire">
    <!--  // BUSCADOR -->
    <v-container>
      <v-row>
        <div class="card p-fluid flex-grow-1">
          <AutoComplete
            :loading="loading"
            v-model="search"
            :suggestions="itemsCache"
            @complete="filtrarCache"
            placeholder="Buscar comida"
          ></AutoComplete>
        </div>

        <Button
          type="button"
          icon="pi pi-search"
          :loading="loading"
          @click="cargarLista()"
          class="ml-2"
        /> </v-row
    ></v-container>

    <!--  // BUSCADOR -->
    <v-main>
      <!-- Mostrar documentos exportados -->
      <v-container>
        <v-row v-if="mealsList.length > 0" class="meals-list">
          <v-col
            v-for="(doc, index) in mealsList"
            :key="index"
            cols="12"
            md="3"
          >
            <v-card class="mx-auto" max-width="400px">
              <Image :src="doc.strMealThumb" width="400px" preview></Image>
              <v-card-title>{{ doc.strMeal }}</v-card-title>
              <v-card-subtitle
                >{{ doc.strCategory }} - {{ doc.strArea }}</v-card-subtitle
              >

              <v-card-actions>
                <Button
                  label="Ver detalles"
                  icon="pi pi-eye"
                  iconPos="right"
                  text
                  @click="openDetailsModal(doc)"
                />
                <v-spacer></v-spacer>

                <Button
                  :icon="doc.show ? 'pi pi-sort-up' : 'pi pi-sort-down'"
                  iconPos="right"
                  text
                  rounded
                  @click="doc.show = !doc.show"
                />
              </v-card-actions>

              <v-expand-transition>
                <div v-show="doc.show">
                  <v-divider></v-divider>
                  <v-card-text> {{ doc.strInstructions }}</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
        <!-- BOTONES DE PAGINACION -->
        <div class="pagination-container" v-if="mealsList.length > 0">
          <Button
            label="Anterior"
            icon="pi pi-check"
            iconPos="left"
            @click="prevPage()"
            :disabled="currentPage === 1"
          />
          <span class="pagination-info">Página {{ currentPage }}</span>
          <Button
            label="Siguiente"
            icon="pi pi-check"
            iconPos="right"
            @click="nextPage()"
            :disabled="mealsList.length < pageSize"
          />
        </div>
      </v-container>

      <!-- Mostrar documentos exportados -->
    </v-main>

    <!-- Detalles del producto - Modal -->

    <Dialog
      v-model:visible="detailsModal"
      maximizable
      modal
      :header="selectedMeal.strMeal"
      :style="{ width: '90rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <!-- CATEGORIA Y AREA -->
      <div>
        <strong :class="['category-label', 'custom-style', 'larger-text']"
          >Categoría:</strong
        >
        <span :class="['category', 'custom-style', 'larger-text']">{{
          selectedMeal.strCategory
        }}</span>
        <br />
        <strong :class="['area-label', 'custom-style', 'larger-text']"
          >Área:</strong
        >
        <span :class="['area', 'custom-style', 'larger-text']">{{
          selectedMeal.strArea
        }}</span>
      </div>

      <br />
      <v-row>
        <!-- Columna para la foto -->
        <v-col cols="12" md="6">
          <Image :src="selectedMeal.strMealThumb" width="100%"></Image>
        </v-col>
        <!-- Columna para las descripciones -->
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6" v-for="index in 20" :key="index">
              <span
                v-if="
                  selectedMeal['strIngredient' + index] &&
                  selectedMeal['strMeasure' + index] &&
                  selectedMeal['strIngredient' + index].trim() !== '' &&
                  selectedMeal['strMeasure' + index].trim() !== ''
                "
              >
                <li>
                  {{ selectedMeal["strIngredient" + index] }} -
                  {{ selectedMeal["strMeasure" + index] }}
                </li>
              </span>
            </v-col>
          </v-row>

          <!-- Columna para las instrucciones -->
          <p class="m-0">
            <strong>Instrucciones:</strong>
            {{ selectedMeal.strInstructions }}
          </p>
        </v-col>
      </v-row>
    </Dialog>

    <!-- Detalles del producto - Modal -->
  </v-app>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ugfisvuvtxqkwkmdffxd.supabase.co";
import Image from "primevue/image";
import Dialog from "primevue/dialog";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZmlzdnV2dHhxa3drbWRmZnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDk5OTksImV4cCI6MjAyMDc4NTk5OX0.pdizCZAgp-g0SpqvLudY8-kW7uFuZsJTxv-IPMfp4Lk";
const supabase = createClient(supabaseUrl, supabaseKey);
export default {
  name: "HelloWorld",

  data() {
    return {
      search: "",
      exportedDocs: [], // Almacena los documentos exportados
      detailsModal: false,
      selectedMeal: {},
      mealsList: [],
      loaded: false,
      loading: false,

      //VARIABLES PARA PAGINACION
      prevSearch: "",
      currentPage: 1, // Página actual
      totalPages: 1, // Total de páginas
      pageSize: 7, // Tamaño de la página (elementos por página)

      //DATOS EN CACHE
      itemsCache: [],
      selectedRecentSearch: "",
    };
  },
  components: { Image, Dialog },
  computed: {},
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    filtrarCache() {
      this.itemsCache = this.getRecentSearches();
    },
    openDetailsModal(meal) {
      this.selectedMeal = meal;
      this.detailsModal = true;
    },
    closeDetailsModal() {
      this.detailsModal = false;
      this.selectedMeal = {};
    },
    async nextPage() {
      this.currentPage++;
      await this.cargarLista();
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.cargarLista();
      }
    },
    async cargarLista() {
      try {
        this.loading = true;
        if (this.search !== this.prevSearch) {
          this.currentPage = 1;
          this.totalPages = 1;
          this.pageSize = 7;
        }
        // Modificar la consulta para buscar por nombre que sea parecido a this.search
        if (this.search == null) this.search = "";

        const { data, error } = await supabase
          .from("Meals")
          .select()
          .ilike("strMeal", `%${this.search}%`)
          .range(
            (this.currentPage - 1) * this.pageSize,
            this.currentPage * this.pageSize
          );

        if (error) {
          console.error("Error al obtener datos:", error);
        } else {
          console.log("Datos obtenidos con éxito:", data);
          const mealsWithShowField = data.map((meal) => ({
            ...meal,
            show: false,
          }));
          this.mealsList = mealsWithShowField;

          // Calcular el total de páginas basado en la cantidad de elementos devueltos
          // y el tamaño de la página
          // this.totalPages = Math.ceil(data.length / this.pageSize);
        }
        this.prevSearch = this.search;
        this.search !== "" ? this.saveSearchToCache(this.search) : null;
        this.recentSearches = this.getRecentSearches();
        this.loading = false;
        this.loaded = true; 
        this.scrollToTop();
      } catch (error) {
        console.error("Error general:", error.message);
        this.loading = false;
        this.loaded = true;
      }
    },
    saveSearchToCache(search) {
      const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
      if (!searches.includes(search)) {
        searches.unshift(search); // Agregar la búsqueda al principio del array
        if (searches.length > 7) {
          searches.pop(); // Si hay más de 7 búsquedas, eliminar la más antigua
        }
        localStorage.setItem("recentSearches", JSON.stringify(searches));
      }
    },
    getRecentSearches() {
      return JSON.parse(localStorage.getItem("recentSearches")) || [];
    },
  },
  mounted() {},
};
</script>

<style scoped>
.larger-text {
  font-size: 18px; /* Puedes ajustar el tamaño del texto según tus preferencias */
}

.less-top-margin {
  margin-top: 5px; /* Puedes ajustar el margen superior según tus preferencias */
}

/* PAGINACION */
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px; /* Ajusta el margen según tus preferencias */
}

.pagination-info {
  font-weight: bold;
  margin: 0 10px;
}
/*HEADER*/
.header {
  text-align: center;
  padding: 20px 0; /* Agrega espacio alrededor del contenido */
}

.header-title {
  font-size: 2.5em; /* Tamaño del título */
  font-weight: bold;
  color: #333; /* Color del texto */
  margin-bottom: 10px; /* Espaciado inferior */
}

.header-subtitle {
  font-size: 1.2em; /* Tamaño del subtítulo */
  color: #666; /* Color del texto */
}
/*HEADER*/
</style>
