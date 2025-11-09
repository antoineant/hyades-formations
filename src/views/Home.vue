<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-hyades-navy to-hyades-mint py-16 px-4">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
          Formations Professionnelles
        </h1>
        <p class="text-xl text-white opacity-90 max-w-2xl mx-auto">
          Développez vos compétences en leadership, communication et gestion de projets
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
      <!-- Filter Bar -->
      <FilterBar @update:filters="handleFilterUpdate" />

      <!-- Results Count -->
      <div class="mb-6">
        <p class="text-gray-600">
          <span class="font-semibold text-hyades-navy">{{ filteredFormations.length }}</span>
          {{ filteredFormations.length > 1 ? 'formations disponibles' : 'formation disponible' }}
        </p>
      </div>

      <!-- Formations Grid -->
      <div v-if="filteredFormations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FormationCard
          v-for="formation in filteredFormations"
          :key="formation.id"
          :formation="formation"
          class="animate-slide-up"
        />
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-16">
        <svg
          class="w-24 h-24 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">
          Aucune formation trouvée
        </h3>
        <p class="text-gray-500">
          Essayez d'ajuster vos filtres de recherche
        </p>
      </div>
    </div>

    <!-- Footer -->
    <footer id="contact" class="bg-hyades-navy text-white mt-16 py-12 px-4">
      <div class="container mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Bureau HYADES</h3>
            <p class="text-gray-300">
              Solutions & Développement RH - Formation
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Contact</h3>
            <p class="text-gray-300">
              Email: contact@hyades-formation.fr<br />
              Tél: +33 1 23 45 67 89
            </p>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-4">Suivez-nous</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white transition">LinkedIn</a>
              <a href="#" class="text-gray-300 hover:text-white transition">Twitter</a>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-600 text-center text-gray-400">
          <p>&copy; 2025 Bureau HYADES. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import FilterBar from '../components/FilterBar.vue'
import FormationCard from '../components/FormationCard.vue'
import formationsData from '../data/formations.json'

const formations = ref(formationsData.formations)
const filters = ref({
  search: '',
  duration: '',
  theme: ''
})

const handleFilterUpdate = (newFilters) => {
  filters.value = newFilters
}

const filteredFormations = computed(() => {
  return formations.value.filter((formation) => {
    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      const matchesSearch =
        formation.titre.toLowerCase().includes(searchLower) ||
        formation.description.toLowerCase().includes(searchLower) ||
        formation.publicCible.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }

    // Duration filter
    if (filters.value.duration) {
      const days = formation.nombreJours
      if (filters.value.duration === '1' && days !== 1) return false
      if (filters.value.duration === '2' && days !== 2) return false
      if (filters.value.duration === '3+' && days < 3) return false
    }

    // Theme filter
    if (filters.value.theme) {
      const themeLower = filters.value.theme.toLowerCase()
      const matchesTheme =
        formation.titre.toLowerCase().includes(themeLower) ||
        formation.description.toLowerCase().includes(themeLower)
      if (!matchesTheme) return false
    }

    return true
  })
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out;
}
</style>
