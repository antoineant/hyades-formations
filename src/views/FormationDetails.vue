<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <div v-if="formation" class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <router-link
        to="/"
        class="inline-flex items-center text-hyades-navy hover:text-hyades-coral transition mb-6"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux formations
      </router-link>

      <!-- Hero Section -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="bg-gradient-to-r from-hyades-navy to-hyades-mint p-8 md:p-12">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ formation.titre }}
          </h1>
          <p class="text-lg text-white opacity-90 max-w-4xl">
            {{ formation.description }}
          </p>

          <!-- Download PDF Button -->
          <button
            @click="downloadPDF"
            class="mt-6 btn-secondary inline-flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger le programme PDF
          </button>
        </div>

        <!-- Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center">
              <div class="bg-hyades-coral p-3 rounded-full mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">Durée</p>
                <p class="font-semibold text-gray-900">{{ currentDuration.texte }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center">
              <div class="bg-hyades-navy p-3 rounded-full mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">Sessions</p>
                <p class="font-semibold text-gray-900">{{ currentSessionCount }} sessions</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center">
              <div class="bg-hyades-mint p-3 rounded-full mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">Effectif</p>
                <p class="font-semibold text-gray-900">{{ formation.effectif }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex items-center">
              <div class="bg-hyades-pink p-3 rounded-full mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600">Modalité</p>
                <p class="font-semibold text-gray-900 text-sm">{{ formation.modaliteAcces }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Format Selector -->
      <FormatSelector
        v-if="formation.formats"
        :formats="formation.formats"
        :jours="formation.jours"
        :default-format="formation.formatParDefaut"
        v-model="selectedFormat"
        @format-changed="handleFormatChange"
      />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Program Details -->
        <div class="lg:col-span-2">
          <!-- Objectifs -->
          <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            <h2 class="text-2xl font-bold text-hyades-navy mb-6 flex items-center">
              <svg class="w-7 h-7 mr-3 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Objectifs de la Formation
            </h2>
            <ul class="space-y-3">
              <li
                v-for="(objectif, index) in formation.objectifs"
                :key="index"
                class="flex items-start"
              >
                <svg class="w-5 h-5 mr-3 mt-0.5 text-hyades-coral flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ objectif }}</span>
              </li>
            </ul>
          </div>

          <!-- Programme Timeline -->
          <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 class="text-2xl font-bold text-hyades-navy mb-8">
              Programme Détaillé
            </h2>

            <div class="space-y-8">
              <div
                v-for="jour in currentJours"
                :key="jour.numero"
                class="relative"
              >
                <!-- Timeline Connector -->
                <div
                  v-if="jour.numero < formation.jours.length"
                  class="absolute left-6 top-16 bottom-0 w-0.5 bg-hyades-mint"
                  style="height: calc(100% + 2rem);"
                ></div>

                <!-- Day Header -->
                <div class="flex items-start mb-6">
                  <div class="bg-hyades-navy text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0 z-10">
                    {{ jour.numero }}
                  </div>
                  <div class="ml-6 flex-1">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                      JOUR {{ jour.numero }}: {{ jour.titre }}
                    </h3>
                    <p class="text-gray-600 mb-2">{{ jour.description }}</p>
                    <p class="text-sm text-hyades-coral font-semibold">
                      Durée: {{ jour.duree }}
                    </p>
                  </div>
                </div>

                <!-- Sessions -->
                <div class="ml-18 space-y-4">
                  <div
                    v-for="session in jour.sessions"
                    :key="session.numero"
                    class="border-l-4 border-hyades-pink pl-6 pb-6"
                  >
                    <button
                      @click.prevent="toggleSession(`${jour.numero}-${session.numero}`)"
                      class="w-full text-left group"
                      type="button"
                    >
                      <div class="flex items-center justify-between">
                        <h4 class="text-lg font-semibold text-gray-900 group-hover:text-hyades-navy transition">
                          Session {{ session.numero }}: {{ session.titre }}
                        </h4>
                        <svg
                          class="w-5 h-5 text-hyades-navy transition-transform"
                          :class="{ 'rotate-180': expandedSessions.has(`${jour.numero}-${session.numero}`) }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <p class="text-sm text-gray-600 mt-1">{{ session.duree }}</p>
                    </button>

                    <!-- Expanded Session Content -->
                    <transition name="expand">
                      <div
                        v-if="expandedSessions.has(`${jour.numero}-${session.numero}`)"
                        class="mt-4 space-y-4"
                      >
                        <!-- Learning Objectives -->
                        <div class="bg-gray-50 rounded-lg p-4">
                          <h5 class="font-semibold text-gray-900 mb-2">Objectifs d'apprentissage:</h5>
                          <ul class="space-y-2">
                            <li
                              v-for="(objectif, idx) in session.objectifsApprentissage"
                              :key="idx"
                              class="flex items-start text-sm text-gray-700"
                            >
                              <span class="text-hyades-coral mr-2">•</span>
                              {{ objectif }}
                            </li>
                          </ul>
                        </div>

                        <!-- Activities -->
                        <div class="bg-gray-50 rounded-lg p-4">
                          <h5 class="font-semibold text-gray-900 mb-3">Activités:</h5>
                          <div class="space-y-2">
                            <div
                              v-for="(activite, idx) in session.activites"
                              :key="idx"
                              class="flex items-start text-sm"
                            >
                              <span
                                class="inline-block px-2 py-1 rounded text-xs font-semibold mr-3 flex-shrink-0"
                                :class="getActivityTypeClass(activite.type)"
                              >
                                {{ getActivityTypeLabel(activite.type) }}
                              </span>
                              <span class="text-gray-700 flex-1">{{ activite.titre }}</span>
                              <span class="text-gray-500 text-xs ml-2 flex-shrink-0">({{ activite.duree }})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar Info -->
        <div class="lg:col-span-1">
          <div class="bg-hyades-pink bg-opacity-20 rounded-lg shadow-lg p-6 sticky top-24">
            <h3 class="text-xl font-bold text-hyades-navy mb-6">Informations Pratiques</h3>

            <div class="space-y-4">
              <div>
                <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Public Cible
                </h4>
                <p class="text-gray-700 text-sm">{{ formation.publicCible }}</p>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Prérequis
                </h4>
                <p class="text-gray-700 text-sm">{{ formation.prerequis }}</p>
              </div>

              <div>
                <h4 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Accessibilité
                </h4>
                <p class="text-gray-700 text-sm">{{ formation.accessibilite }}</p>
              </div>

              <div class="border-t border-hyades-navy border-opacity-20 pt-4 mt-4">
                <h4 class="font-semibold text-gray-900 mb-3">Démarche Pédagogique</h4>

                <h5 class="text-sm font-semibold text-gray-800 mb-2">Méthodes:</h5>
                <ul class="text-sm text-gray-700 space-y-1 mb-3">
                  <li v-for="(methode, idx) in formation.demarchePedagogique.methodes" :key="idx" class="flex items-start">
                    <span class="text-hyades-coral mr-2">•</span>
                    {{ methode }}
                  </li>
                </ul>

                <h5 class="text-sm font-semibold text-gray-800 mb-2">Évaluation:</h5>
                <ul class="text-sm text-gray-700 space-y-1">
                  <li v-for="(evaluation, idx) in formation.demarchePedagogique.evaluation" :key="idx" class="flex items-start">
                    <span class="text-hyades-coral mr-2">•</span>
                    {{ evaluation }}
                  </li>
                </ul>
              </div>

              <div class="border-t border-hyades-navy border-opacity-20 pt-4 mt-4">
                <p class="text-xs text-gray-600 mb-3">
                  <strong>Formateur:</strong> {{ formation.demarchePedagogique.formateur }}
                </p>
                <p class="text-xs text-gray-600">
                  <strong>Sanction:</strong> {{ formation.demarchePedagogique.sanction }}
                </p>
                <p class="text-xs text-gray-500 mt-3">
                  {{ formation.demarchePedagogique.edition }}
                </p>
              </div>
            </div>

            <!-- CTA Button -->
            <button class="w-full btn-primary mt-6">
              S'inscrire à la formation
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formation Not Found -->
    <div v-else class="container mx-auto px-4 py-16 text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Formation non trouvée</h2>
      <router-link to="/" class="text-hyades-navy hover:underline">
        Retour à la liste des formations
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import FormatSelector from '../components/FormatSelector.vue'
import formationsData from '../data/formations.json'
import { calculateDuration, countSessions, getJoursByFormat } from '../utils/formationUtils'
import { API_BASE_URL } from '../config/api.js'

const route = useRoute()
const router = useRouter()
const expandedSessions = ref(new Set())
const selectedFormat = ref(route.query.format || null)

const formation = computed(() => {
  return formationsData.formations.find(f => f.id === route.params.id)
})

// Computed pour les jours filtrés selon le format sélectionné
const currentJours = computed(() => {
  if (!formation.value) return []

  const formatId = selectedFormat.value || formation.value.formatParDefaut
  if (!formation.value.formats || !formation.value.formats[formatId]) {
    return formation.value.jours
  }

  const joursIds = formation.value.formats[formatId].joursInclus
  return getJoursByFormat(formation.value.jours, joursIds)
})

// Computed pour la durée calculée
const currentDuration = computed(() => {
  return calculateDuration(currentJours.value)
})

// Computed pour le nombre de sessions
const currentSessionCount = computed(() => {
  return countSessions(currentJours.value)
})

const handleFormatChange = (formatId) => {
  selectedFormat.value = formatId
  // Update URL query parameter without scrolling
  router.replace({
    query: { ...route.query, format: formatId }
  })
}

const toggleSession = (sessionId) => {
  if (expandedSessions.value.has(sessionId)) {
    expandedSessions.value.delete(sessionId)
  } else {
    expandedSessions.value.add(sessionId)
  }
  // Trigger reactivity
  expandedSessions.value = new Set(expandedSessions.value)
}

const getActivityTypeClass = (type) => {
  const classes = {
    presentation: 'bg-blue-100 text-blue-800',
    exercise: 'bg-green-100 text-green-800',
    workshop: 'bg-purple-100 text-purple-800',
    discussion: 'bg-orange-100 text-orange-800',
    reflection: 'bg-pink-100 text-pink-800'
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const getActivityTypeLabel = (type) => {
  const labels = {
    presentation: 'Présentation',
    exercise: 'Exercice',
    workshop: 'Atelier',
    discussion: 'Discussion',
    reflection: 'Réflexion'
  }
  return labels[type] || type
}

const downloadPDF = () => {
  // This will call the backend API to generate and download the PDF
  const formatId = selectedFormat.value || formation.value.formatParDefaut
  window.location.href = `${API_BASE_URL}/generate-pdf/${formation.value.id}?format=${formatId}`
}

onMounted(() => {
  // Expand first session of first day by default
  if (formation.value && formation.value.jours.length > 0) {
    expandedSessions.value.add('1-1')
  }
})
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
