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
      <!-- <v-card color="grey-lighten-3">
        <v-card-text> 
          <v-autocomplete
            :loading="loading"
            v-model="search"
            :items="recentSearches"
            density="compact"
            variant="solo"
            append-inner-icon="mdi-magnify"
            @click:append-inner="cargarLista()"
            placeholder="Recetas"
            hide-details
            hide-no-data
            hide-selected
            v-on:input="actualizarSearch($event)"
          ></v-autocomplete>
        </v-card-text>
      </v-card> -->
      <v-container>
        <v-card color="grey-lighten-3">
          <v-card-text>
            <v-text-field
              :loading="loading"
              v-model="search"
              density="compact"
              variant="solo"
              label="Buscar recetas"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="cargarLista()"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-container>
    </v-container>

    <!--  // BUSCADOR -->
    <v-main>
      <!-- Mostrar documentos exportados -->
      <v-container>
        <v-row v-if="mealsList.length > 0" class="meals-list">
          <v-col
            v-for="(doc, index) in mealsList"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card class="mx-auto">
              <v-img :src="doc.strMealThumb" height="300px" cover></v-img>
              <v-card-title>{{ doc.strMeal }}</v-card-title>
              <v-card-subtitle
                >{{ doc.strCategory }} - {{ doc.strArea }}</v-card-subtitle
              >

              <v-card-actions>
                <v-btn
                  color="orange-lighten-2"
                  variant="text"
                  @click="openDetailsModal(doc)"
                >
                  Detalles
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :icon="doc.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  @click="doc.show = !doc.show"
                ></v-btn>
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
        <div class="pagination-container">
          <v-btn @click="prevPage()" :disabled="currentPage === 1">
            Anterior
          </v-btn>
          <span class="pagination-info">Página {{ currentPage }}</span>
          <v-btn @click="nextPage()" :disabled="mealsList.length < pageSize">
            Siguiente
          </v-btn>
        </div>
      </v-container>

      <!-- Mostrar documentos exportados -->
    </v-main>

    <!-- Detalles del producto - Modal -->
    <v-dialog v-model="detailsModal" max-width="600">
      <v-card class="custom-card">
        <v-img :src="selectedMeal.strMealThumb" height="300px" cover></v-img>
        <v-card-title class="modal-title">{{
          selectedMeal.strMeal
        }}</v-card-title>
        <p class="modal-category">
          <strong>Categoría:</strong> {{ selectedMeal.strCategory }}
        </p>
        <p class="modal-area">
          <strong>Área:</strong> {{ selectedMeal.strArea }}
        </p>

        <p class="modal-category"><strong>Ingredientes:</strong></p>
        <v-card-text class="modal-text">
          <ul>
            <li
              v-if="
                selectedMeal['strIngredient1'] &&
                selectedMeal['strMeasure1'] &&
                selectedMeal['strIngredient1'].trim() !== '' &&
                selectedMeal['strMeasure1'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient1"] }} -
              {{ selectedMeal["strMeasure1"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient2'] &&
                selectedMeal['strMeasure2'] &&
                selectedMeal['strIngredient2'].trim() !== '' &&
                selectedMeal['strMeasure2'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient2"] }} -
              {{ selectedMeal["strMeasure2"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient3'] &&
                selectedMeal['strMeasure3'] &&
                selectedMeal['strIngredient3'].trim() !== '' &&
                selectedMeal['strMeasure3'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient3"] }} -
              {{ selectedMeal["strMeasure3"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient4'] &&
                selectedMeal['strMeasure4'] &&
                selectedMeal['strIngredient4'].trim() !== '' &&
                selectedMeal['strMeasure4'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient4"] }} -
              {{ selectedMeal["strMeasure4"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient5'] &&
                selectedMeal['strMeasure5'] &&
                selectedMeal['strIngredient5'].trim() !== '' &&
                selectedMeal['strMeasure5'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient5"] }} -
              {{ selectedMeal["strMeasure5"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient6'] &&
                selectedMeal['strMeasure6'] &&
                selectedMeal['strIngredient6'].trim() !== '' &&
                selectedMeal['strMeasure6'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient6"] }} -
              {{ selectedMeal["strMeasure6"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient7'] &&
                selectedMeal['strMeasure7'] &&
                selectedMeal['strIngredient7'].trim() !== '' &&
                selectedMeal['strMeasure7'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient7"] }} -
              {{ selectedMeal["strMeasure7"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient8'] &&
                selectedMeal['strMeasure8'] &&
                selectedMeal['strIngredient8'].trim() !== '' &&
                selectedMeal['strMeasure8'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient8"] }} -
              {{ selectedMeal["strMeasure8"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient9'] &&
                selectedMeal['strMeasure9'] &&
                selectedMeal['strIngredient9'].trim() !== '' &&
                selectedMeal['strMeasure9'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient9"] }} -
              {{ selectedMeal["strMeasure9"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient10'] &&
                selectedMeal['strMeasure10'] &&
                selectedMeal['strIngredient10'].trim() !== '' &&
                selectedMeal['strMeasure10'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient10"] }} -
              {{ selectedMeal["strMeasure10"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient11'] &&
                selectedMeal['strMeasure11'] &&
                selectedMeal['strIngredient11'].trim() !== '' &&
                selectedMeal['strMeasure11'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient11"] }} -
              {{ selectedMeal["strMeasure11"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient12'] &&
                selectedMeal['strMeasure12'] &&
                selectedMeal['strIngredient12'].trim() !== '' &&
                selectedMeal['strMeasure12'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient12"] }} -
              {{ selectedMeal["strMeasure12"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient13'] &&
                selectedMeal['strMeasure13'] &&
                selectedMeal['strIngredient13'].trim() !== '' &&
                selectedMeal['strMeasure13'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient13"] }} -
              {{ selectedMeal["strMeasure13"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient14'] &&
                selectedMeal['strMeasure14'] &&
                selectedMeal['strIngredient14'].trim() !== '' &&
                selectedMeal['strMeasure14'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient14"] }} -
              {{ selectedMeal["strMeasure14"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient15'] &&
                selectedMeal['strMeasure15'] &&
                selectedMeal['strIngredient15'].trim() !== '' &&
                selectedMeal['strMeasure15'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient15"] }} -
              {{ selectedMeal["strMeasure15"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient16'] &&
                selectedMeal['strMeasure16'] &&
                selectedMeal['strIngredient16'].trim() !== '' &&
                selectedMeal['strMeasure16'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient16"] }} -
              {{ selectedMeal["strMeasure16"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient17'] &&
                selectedMeal['strMeasure17'] &&
                selectedMeal['strIngredient17'].trim() !== '' &&
                selectedMeal['strMeasure17'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient17"] }} -
              {{ selectedMeal["strMeasure17"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient18'] &&
                selectedMeal['strMeasure18'] &&
                selectedMeal['strIngredient18'].trim() !== '' &&
                selectedMeal['strMeasure18'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient18"] }} -
              {{ selectedMeal["strMeasure18"] }}
            </li>
            <!-- ... -->
            <li
              v-if="
                selectedMeal['strIngredient19'] &&
                selectedMeal['strMeasure19'] &&
                selectedMeal['strIngredient19'].trim() !== '' &&
                selectedMeal['strMeasure19'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient19"] }} -
              {{ selectedMeal["strMeasure19"] }}
            </li>
            <li
              v-if="
                selectedMeal['strIngredient20'] &&
                selectedMeal['strMeasure20'] &&
                selectedMeal['strIngredient20'].trim() !== '' &&
                selectedMeal['strMeasure20'].trim() !== ''
              "
            >
              {{ selectedMeal["strIngredient20"] }} -
              {{ selectedMeal["strMeasure20"] }}
            </li>
          </ul>
          <p>
            <strong>Instrucciones:</strong> {{ selectedMeal.strInstructions }}
          </p>
        </v-card-text>
        <v-card-actions class="modal-actions">
          <v-btn color="primary" @click="closeDetailsModal">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Detalles del producto - Modal -->
  </v-app>
</template>

<!--   -->
<script>
// import * as XLSX from "xlsx";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ugfisvuvtxqkwkmdffxd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnZmlzdnV2dHhxa3drbWRmZnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyMDk5OTksImV4cCI6MjAyMDc4NTk5OX0.pdizCZAgp-g0SpqvLudY8-kW7uFuZsJTxv-IPMfp4Lk";
const supabase = createClient(supabaseUrl, supabaseKey);
export default {
  name: "HelloWorld",
  data() {
    return {
      search: "",
      prevSearch: "",
      exportedDocs: [], // Almacena los documentos exportados
      detailsModal: false,
      selectedMeal: {},
      mealsList: [],
      loaded: false,
      loading: false,

      //VARIABLES PARA PAGINACION
      currentPage: 1, // Página actual
      totalPages: 1, // Total de páginas
      pageSize: 8, // Tamaño de la página (elementos por página)

      //DATOS EN CACHE
      recentSearches: this.getRecentSearches(),
      selectedRecentSearch: "",
    };
  },
  computed: {},
  methods: {
    actualizarSearch(event) {
      // this.search = event.data;
      console.log("Nuevo valor de search:", this.search);
      console.log("Nuevo valor :", event);
    },
    showDetails(meal) {
      console.log("Detalles de:", meal.strMeal);
    },
    openDetailsModal(meal) {
      this.selectedMeal = meal;
      this.detailsModal = true;
    },
    closeDetailsModal() {
      this.detailsModal = false;
      this.selectedMeal = {};
    },
    printDatops(index) {
      console.log(this.selectedMeal["strIngredient" + index]);
    },
    async nextPage() {
      // if (this.currentPage < this.totalPages) {
      this.currentPage++;
      await this.cargarLista();
      // }
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
          this.pageSize = 8;
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
        // const { data, error } = await supabase
        //   .from("Meals")
        //   .select()
        //   .ilike("strMeal", `%${this.search}%`)
        //   .or("strMeal", "ilike", "%")
        //   .order("strMeal", { ascending: true, nullsFirst: true }) // Ajusta según tus necesidades
        //   .limit(10);
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

/*CARD DE PRODUCTOS*/

/*CARD DE PRODUCTOS*/

/*MODAL DETALLE DE PRODUCTOS*/
.modal-category,
.modal-area {
  padding: 2px 8px; /* Ajusta el espacio alrededor del texto */
  letter-spacing: 0.5px; /* Ajusta el espaciado entre letras */
}
.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
}

.modal-text {
  font-size: 1em;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.modal-actions button {
  margin-left: 8px;
  font-size: 1em;
}
.custom-card {
  text-align: left;
}

.modal-title {
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-text {
  font-size: 1em;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.modal-actions button {
  margin-left: 8px;
  font-size: 1em;
}
.custom-btn {
  background-color: #4caf50; /* Color de fondo */
  color: #fff; /* Color del texto */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s ease; /* Transición al hacer hover */
}

.custom-btn:hover {
  background-color: #45a049; /* Cambia el color de fondo al hacer hover */
}
/*MODAL DETALLE DE PRODUCTOS*/
</style>
