<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-8">
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Choisissez la durée de votre formation</h3>

    <!-- Desktop: Tabs -->
    <div class="hidden md:flex space-x-2">
      <button
        v-for="(formatInfo, formatId) in formats"
        :key="formatId"
        @click.prevent="selectFormat(formatId)"
        type="button"
        class="flex-1 py-4 px-6 rounded-lg transition-all duration-200 ease-in-out border-2"
        :class="[
          selectedFormat === formatId
            ? 'bg-hyades-navy text-white border-hyades-navy shadow-lg transform scale-[1.02]'
            : 'bg-white text-gray-700 border-gray-200 hover:border-hyades-mint hover:shadow-md hover:scale-[1.01]'
        ]"
      >
        <div class="text-center">
          <div class="font-bold text-lg mb-1">{{ formatInfo.titre }}</div>
          <div class="text-sm opacity-90">{{ formatDuration(formatId) }}</div>
          <div class="text-xs mt-2 opacity-75">{{ formatSessions(formatId) }} sessions</div>
        </div>
      </button>
    </div>

    <!-- Mobile: Dropdown -->
    <div class="md:hidden">
      <select
        v-model="selectedFormat"
        @change="onSelectChange"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-hyades-navy focus:border-transparent"
      >
        <option
          v-for="(formatInfo, formatId) in formats"
          :key="formatId"
          :value="formatId"
        >
          {{ formatInfo.titre }} - {{ formatDuration(formatId) }} - {{ formatSessions(formatId) }} sessions
        </option>
      </select>
    </div>

    <!-- Selected Format Description -->
    <div class="mt-4 p-4 bg-hyades-pink bg-opacity-10 rounded-lg">
      <p class="text-sm text-gray-700">
        <svg class="w-4 h-4 inline mr-2 text-hyades-coral" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
        {{ formats[selectedFormat].description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { calculateDuration, countSessions, getJoursByFormat } from '../utils/formationUtils'

const props = defineProps({
  formats: {
    type: Object,
    required: true
  },
  jours: {
    type: Array,
    required: true
  },
  defaultFormat: {
    type: String,
    default: '4j'
  },
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'format-changed'])

const selectedFormat = ref(props.modelValue || props.defaultFormat)

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    selectedFormat.value = newValue
  }
})

const selectFormat = (formatId) => {
  selectedFormat.value = formatId
  emit('update:modelValue', formatId)
  emit('format-changed', formatId)
}

const onSelectChange = () => {
  emit('update:modelValue', selectedFormat.value)
  emit('format-changed', selectedFormat.value)
}

const formatDuration = (formatId) => {
  const joursIds = props.formats[formatId].joursInclus
  const jours = getJoursByFormat(props.jours, joursIds)
  return calculateDuration(jours).texte
}

const formatSessions = (formatId) => {
  const joursIds = props.formats[formatId].joursInclus
  const jours = getJoursByFormat(props.jours, joursIds)
  return countSessions(jours)
}
</script>

<style scoped>
select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>
