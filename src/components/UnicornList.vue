<template>
  <div>
    <div v-if="store.loading" class="bg-white rounded-lg shadow p-12 text-center">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <p class="mt-4 text-gray-600">Loading unicorns...</p>
    </div>

    <div v-else-if="paginatedUnicorns.length === 0" class="bg-white rounded-lg shadow overflow-hidden">
      <div class="flex">
        <div class="w-1 flex-shrink-0 bg-red-500"></div>
        <div class="flex-1 p-6">
          <div class="flex flex-col items-center justify-center py-8">
            <div class="relative w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              <svg class="w-5 h-5 text-purple-600 absolute top-1 right-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p class="text-gray-600 text-center mb-2">The body copy explains the empty state. The icon relates to the situation.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-4">
      <UnicornCard
        v-for="(unicorn, index) in paginatedUnicorns"
        :key="unicorn._id"
        :unicorn="unicorn"
        :no="startIndex + index + 1"
        :color-class="getCardColor(index)"
        :status-label="getStatusInfo(unicorn.age).label"
        :status-class="getStatusInfo(unicorn.age).class"
        :status-emoji="getStatusInfo(unicorn.age).emoji"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <div v-if="totalPages > 1 && !store.loading" class="mt-8 flex justify-center items-center gap-2">
      <button
        @click="currentPage = Math.max(1, currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[
          'p-2 rounded-lg transition-colors',
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        ]"
        aria-label="Previous page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-colors',
          currentPage === page
            ? 'bg-picolo text-white'
            : 'text-gray-700 hover:bg-gray-100'
        ]"
        :aria-label="`Go to page ${page}`"
        :aria-current="currentPage === page ? 'page' : undefined"
      >
        {{ page }}
      </button>
      <button
        @click="currentPage = Math.min(totalPages, currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[
          'p-2 rounded-lg transition-colors',
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100'
        ]"
        aria-label="Next page"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUnicornStore } from '../stores/unicorn'
import UnicornCard from './UnicornCard.vue'
import { PAGINATION, CARD_COLORS } from '../constants'
import { getStatusByAge } from '../utils/status'

const store = useUnicornStore()
const currentPage = ref(1)
const pageSize = PAGINATION.PAGE_SIZE

watch(() => store.sortField, () => {
  currentPage.value = 1
})

watch(() => store.sortedUnicorns.length, (newLength, oldLength) => {
  if (newLength < oldLength && currentPage.value > Math.ceil(newLength / pageSize)) {
    currentPage.value = Math.max(1, Math.ceil(newLength / pageSize))
  }
})

const totalUnicorns = computed(() => store.sortedUnicorns.length)
const totalPages = computed(() => Math.ceil(totalUnicorns.value / pageSize))

const paginatedUnicorns = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return store.sortedUnicorns.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * pageSize)

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = PAGINATION.MAX_VISIBLE_PAGES
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const getCardColor = (index) => {
  return CARD_COLORS[index % CARD_COLORS.length]
}

const getStatusInfo = (age) => {
  return getStatusByAge(age)
}
</script>
