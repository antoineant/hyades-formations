<template>
  <router-link
    :to="`/formation/${formation.id}`"
    class="block bg-white rounded-lg shadow-lg overflow-hidden card-hover cursor-pointer"
  >
    <div class="bg-gradient-to-r from-hyades-navy to-hyades-mint p-6">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-xl font-bold text-white leading-tight flex-1">
          {{ formation.titre }}
        </h3>
        <span
          v-if="formation.formats && Object.keys(formation.formats).length > 1"
          class="px-2.5 py-1 bg-hyades-coral text-white text-xs font-semibold rounded-md whitespace-nowrap shadow-sm flex-shrink-0"
        >
          Formats multiples
        </span>
      </div>
    </div>

    <div class="p-6">
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ formation.description }}
      </p>

      <div class="space-y-3">
        <div class="flex items-center text-sm text-gray-700">
          <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="font-medium">{{ formation.duree }}</span>
        </div>

        <div class="flex items-center text-sm text-gray-700">
          <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span class="line-clamp-1">{{ formation.publicCible }}</span>
        </div>

        <div class="flex items-center text-sm text-gray-700">
          <svg class="w-5 h-5 mr-2 text-hyades-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="font-medium">{{ formation.nombreSessions }} sessions</span>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200 flex items-center justify-end">
        <span class="text-hyades-coral font-semibold flex items-center">
          Voir le programme
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  formation: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
