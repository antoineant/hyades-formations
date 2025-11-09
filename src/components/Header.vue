<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img src="../assets/logo-hyades.avif" alt="Bureau HYADES" class="h-16 w-auto" />
          <div class="hidden md:block">
            <p class="text-sm text-gray-600">Solutions & Développement RH - Formation</p>
          </div>
        </router-link>

        <nav class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Nos Formations
          </router-link>
          <router-link
            to="/converter"
            class="text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Convertir
          </router-link>
          <a
            href="#contact"
            class="text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          @click="toggleMenu"
          class="md:hidden text-gray-700 focus:outline-none"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <transition name="slide">
        <nav v-if="menuOpen" class="md:hidden mt-4 pb-4 space-y-3">
          <router-link
            to="/"
            @click="menuOpen = false"
            class="block text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Nos Formations
          </router-link>
          <router-link
            to="/converter"
            @click="menuOpen = false"
            class="block text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Convertir
          </router-link>
          <a
            href="#contact"
            @click="menuOpen = false"
            class="block text-gray-700 hover:text-hyades-navy font-medium transition-colors"
          >
            Contact
          </a>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
