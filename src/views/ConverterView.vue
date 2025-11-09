<template>
  <div class="min-h-screen bg-gray-50">
    <Header />

    <div class="container mx-auto px-4 py-8">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-hyades-navy mb-2">
          Convertisseur Workshop AI4Trainers → HYADES
        </h1>
        <p class="text-gray-600">
          Téléchargez un fichier workshop.json depuis ai4trainers pour le convertir au format HYADES
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Input Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-hyades-navy mb-4">
            1. Fichier ai4trainers
          </h2>

          <!-- File Upload -->
          <div class="mb-6">
            <div
              @drop.prevent="handleFileDrop"
              @dragover.prevent
              @dragenter.prevent="dragActive = true"
              @dragleave.prevent="dragActive = false"
              :class="[
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                dragActive ? 'border-hyades-navy bg-hyades-navy bg-opacity-5' : 'border-gray-300'
              ]"
              @click="$refs.fileInput.click()"
            >
              <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p class="text-lg font-semibold text-gray-700 mb-2">
                Glissez-déposez votre fichier workshop.json
              </p>
              <p class="text-sm text-gray-500">ou cliquez pour sélectionner</p>
              <input
                ref="fileInput"
                type="file"
                accept=".json"
                class="hidden"
                @change="handleFileSelect"
              />
            </div>

            <!-- File Info -->
            <div v-if="fileName" class="mt-4 p-3 bg-hyades-mint bg-opacity-10 rounded flex items-center justify-between">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-hyades-mint mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ fileName }}</span>
              </div>
              <button @click="clearFile" class="text-red-500 hover:text-red-700">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Or paste JSON -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Ou collez le JSON directement :
            </label>
            <textarea
              v-model="inputJson"
              class="w-full h-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-hyades-navy focus:border-transparent font-mono text-sm"
              placeholder='{"workshopData": {...}}'
            ></textarea>
          </div>

          <!-- Convert Button -->
          <button
            @click="convertWorkshop"
            :disabled="!canConvert || converting"
            class="w-full py-3 px-6 bg-hyades-navy text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90"
          >
            <span v-if="converting">Conversion en cours...</span>
            <span v-else>Convertir au format HYADES</span>
          </button>

          <!-- Error Message -->
          <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>

        <!-- Output Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-bold text-hyades-navy mb-4">
            2. Résultat HYADES
          </h2>

          <div v-if="!convertedData" class="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p class="text-sm">Le résultat de la conversion apparaîtra ici</p>
          </div>

          <div v-else>
            <!-- Success Message -->
            <div class="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm text-green-800 font-semibold">Conversion réussie !</span>
            </div>

            <!-- Output Preview -->
            <div class="mb-4 p-4 bg-gray-50 rounded-lg">
              <h3 class="font-semibold text-gray-900 mb-2">
                {{ convertedData.formations[0].titre }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                {{ convertedData.formations[0].jours.length }} jours •
                {{ countTotalSessions() }} sessions
              </p>
            </div>

            <!-- JSON Output -->
            <div class="mb-4">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                JSON formaté :
              </label>
              <textarea
                ref="outputJson"
                :value="formattedOutput"
                readonly
                class="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg font-mono text-xs bg-gray-50"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <!-- Primary Action: Add to HYADES -->
              <button
                @click="addToHyades"
                :disabled="adding"
                class="w-full py-3 px-6 bg-hyades-navy text-white rounded-lg font-bold hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="!adding" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                <span v-if="adding">Ajout en cours...</span>
                <span v-else>Ajouter à HYADES</span>
              </button>

              <!-- Secondary Actions -->
              <div class="flex space-x-3">
                <button
                  @click="copyToClipboard"
                  class="flex-1 py-2 px-4 bg-hyades-mint text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier
                </button>
                <button
                  @click="downloadJson"
                  class="flex-1 py-2 px-4 bg-hyades-coral text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger
                </button>
              </div>
            </div>

            <!-- Success Notifications -->
            <div v-if="added" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-green-800 font-semibold">✓ Formation ajoutée avec succès à HYADES !</span>
              </div>
            </div>

            <div v-if="copied" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
              <p class="text-sm text-green-800">✓ Copié dans le presse-papiers !</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 class="text-lg font-bold text-blue-900 mb-3">📋 Instructions</h3>
        <ol class="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Ouvrez ai4trainers et exportez votre workshop au format JSON</li>
          <li>Téléchargez ou collez le contenu du fichier workshop.json ci-dessus</li>
          <li>Cliquez sur "Convertir au format HYADES"</li>
          <li>Cliquez sur "Ajouter à HYADES" pour intégrer directement la formation, ou copiez/téléchargez le JSON</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'

const fileInput = ref(null)
const fileName = ref('')
const inputJson = ref('')
const convertedData = ref(null)
const error = ref('')
const converting = ref(false)
const dragActive = ref(false)
const copied = ref(false)
const adding = ref(false)
const added = ref(false)

const canConvert = computed(() => {
  return (fileName.value || inputJson.value.trim()) && !converting.value
})

const formattedOutput = computed(() => {
  if (!convertedData.value) return ''
  return JSON.stringify(convertedData.value, null, 2)
})

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      inputJson.value = e.target.result
    }
    reader.readAsText(file)
  }
}

const handleFileDrop = (event) => {
  dragActive.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type === 'application/json') {
    fileName.value = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
      inputJson.value = e.target.result
    }
    reader.readAsText(file)
  } else {
    error.value = 'Veuillez déposer un fichier JSON valide'
  }
}

const clearFile = () => {
  fileName.value = ''
  inputJson.value = ''
  error.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const convertWorkshop = async () => {
  error.value = ''
  converting.value = true
  convertedData.value = null

  try {
    // Parse input JSON
    const workshopData = JSON.parse(inputJson.value)

    // Call API
    const response = await fetch('http://localhost:3003/api/convert-workshop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workshopData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de la conversion')
    }

    convertedData.value = await response.json()
  } catch (err) {
    error.value = `Erreur: ${err.message}`
  } finally {
    converting.value = false
  }
}

const countTotalSessions = () => {
  if (!convertedData.value) return 0
  return convertedData.value.formations[0].jours.reduce((total, jour) => {
    return total + (jour.sessions?.length || 0)
  }, 0)
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedOutput.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 3000)
  } catch (err) {
    error.value = 'Erreur lors de la copie'
  }
}

const downloadJson = () => {
  const blob = new Blob([formattedOutput.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `formation-${Date.now()}.json`
  link.click()
  URL.revokeObjectURL(url)
}

const addToHyades = async () => {
  adding.value = true
  error.value = ''

  try {
    const formation = convertedData.value.formations[0]

    const response = await fetch('http://localhost:3003/api/add-formation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formation)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erreur lors de l\'ajout')
    }

    const result = await response.json()
    added.value = true

    setTimeout(() => {
      added.value = false
    }, 5000)
  } catch (err) {
    error.value = `Erreur: ${err.message}`
  } finally {
    adding.value = false
  }
}
</script>
