<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search by title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Rechercher
        </label>
        <div class="relative">
          <input
            type="text"
            v-model="localFilters.search"
            @input="emitFilters"
            placeholder="Rechercher par titre..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hyades-navy focus:border-transparent transition"
          />
          <svg
            class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Filter by duration -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Durée
        </label>
        <select
          v-model="localFilters.duration"
          @change="emitFilters"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hyades-navy focus:border-transparent transition"
        >
          <option value="">Toutes les durées</option>
          <option value="1">1 jour</option>
          <option value="2">2 jours</option>
          <option value="3+">3 jours et plus</option>
        </select>
      </div>

      <!-- Filter by theme -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Thème
        </label>
        <select
          v-model="localFilters.theme"
          @change="emitFilters"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hyades-navy focus:border-transparent transition"
        >
          <option value="">Tous les thèmes</option>
          <option value="leadership">Leadership</option>
          <option value="communication">Communication</option>
          <option value="management">Management</option>
          <option value="projet">Gestion de projet</option>
        </select>
      </div>
    </div>

    <!-- Active filters display -->
    <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 flex-wrap">
      <span class="text-sm text-gray-600">Filtres actifs :</span>
      <button
        v-if="localFilters.search"
        @click="clearFilter('search')"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-hyades-pink text-gray-800 hover:bg-opacity-80 transition"
      >
        {{ localFilters.search }}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        v-if="localFilters.duration"
        @click="clearFilter('duration')"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-hyades-mint text-gray-800 hover:bg-opacity-80 transition"
      >
        Durée: {{ localFilters.duration === '3+' ? '3+ jours' : localFilters.duration + ' jour(s)' }}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        v-if="localFilters.theme"
        @click="clearFilter('theme')"
        class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-hyades-coral text-white hover:bg-opacity-80 transition"
      >
        {{ localFilters.theme }}
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button
        @click="clearAllFilters"
        class="text-sm text-hyades-navy hover:underline font-medium"
      >
        Tout effacer
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:filters'])

const localFilters = ref({
  search: '',
  duration: '',
  theme: ''
})

const hasActiveFilters = computed(() => {
  return localFilters.value.search || localFilters.value.duration || localFilters.value.theme
})

const emitFilters = () => {
  emit('update:filters', { ...localFilters.value })
}

const clearFilter = (filterName) => {
  localFilters.value[filterName] = ''
  emitFilters()
}

const clearAllFilters = () => {
  localFilters.value = {
    search: '',
    duration: '',
    theme: ''
  }
  emitFilters()
}
</script>
