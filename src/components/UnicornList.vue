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
          <div class="flex flex-col items-center bg-bluecard border border-grayborder rounded-2xl justify-center py-8">
             <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6.09375C16.1351 6.09375 17.0553 7.01393 17.0553 8.14904C17.0553 8.33569 17.1769 8.49946 17.3523 8.56354C17.5344 8.6301 17.7129 8.70417 17.8874 8.78538C18.0568 8.86423 18.2589 8.83448 18.3911 8.70233C19.1937 7.8997 20.495 7.8997 21.2977 8.70233C22.1003 9.50497 22.1003 10.8063 21.2977 11.609C21.1655 11.7411 21.1358 11.9432 21.2146 12.1127C21.2958 12.2872 21.3699 12.4656 21.4365 12.6478C21.5006 12.8231 21.6643 12.9447 21.851 12.9447C22.9861 12.9447 23.9062 13.8649 23.9062 15C23.9062 16.1351 22.9861 17.0553 21.851 17.0553C21.6643 17.0553 21.5006 17.1769 21.4365 17.3522C21.3699 17.5344 21.2958 17.7129 21.2146 17.8874C21.1357 18.0568 21.1655 18.2589 21.2977 18.3911C22.1003 19.1937 22.1003 20.495 21.2977 21.2977C20.495 22.1003 19.1937 22.1003 18.3911 21.2977C18.2589 21.1655 18.0568 21.1358 17.8874 21.2146C17.7129 21.2958 17.5344 21.3699 17.3523 21.4365C17.1769 21.5005 17.0553 21.6643 17.0553 21.851C17.0553 22.9861 16.1351 23.9062 15 23.9062C13.8649 23.9062 12.9447 22.9861 12.9447 21.851C12.9447 21.6643 12.8231 21.5005 12.6477 21.4365C12.4656 21.3699 12.2872 21.2958 12.1127 21.2146C11.9432 21.1358 11.7411 21.1655 11.609 21.2977C10.8063 22.1003 9.50497 22.1003 8.70233 21.2977C7.8997 20.495 7.8997 19.1937 8.70233 18.3911C8.83449 18.2589 8.86426 18.0568 8.7854 17.8874C8.70418 17.7129 8.63009 17.5344 8.56352 17.3522C8.49944 17.1769 8.33568 17.0553 8.14904 17.0553C7.01393 17.0553 6.09375 16.1351 6.09375 15C6.09375 13.8649 7.01393 12.9447 8.14904 12.9447C8.33568 12.9447 8.49944 12.8231 8.56352 12.6478C8.63009 12.4656 8.70417 12.2871 8.78539 12.1126C8.86424 11.9432 8.83448 11.7411 8.70233 11.609C7.8997 10.8063 7.8997 9.50497 8.70233 8.70233C9.50497 7.8997 10.8063 7.8997 11.609 8.70233C11.7411 8.83448 11.9432 8.86424 12.1126 8.78539C12.2871 8.70418 12.4656 8.63011 12.6477 8.56354C12.8231 8.49946 12.9447 8.33569 12.9447 8.14904C12.9447 7.01393 13.8649 6.09375 15 6.09375Z" stroke="#928AFF"/>
                <path d="M18.9583 15C18.9583 17.1861 17.1861 18.9583 15 18.9583C12.8139 18.9583 11.0417 17.1861 11.0417 15C11.0417 12.8139 12.8139 11.0417 15 11.0417C17.1861 11.0417 18.9583 12.8139 18.9583 15Z" stroke="#928AFF"/>
                <rect x="18" width="12" height="12" rx="6" fill="white"/>
                <rect x="18" width="12" height="12" rx="6" fill="#FF4E64" fill-opacity="0.12"/>
                <path d="M21.75 3.75L24 6M24 6L21.75 8.25M24 6L26.25 8.25M24 6L26.25 3.75" stroke="#FF4E64" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            <p class="text-bluempty text-center text-sm mb-2">The body copy explains the empty state. The icon relates to the situation.</p>
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
