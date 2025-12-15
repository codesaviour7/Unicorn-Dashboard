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
      <div class="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div class="flex">
          <div class="w-1 flex-shrink-0 bg-transparent"></div>
          <div class="flex-1 p-4 border-b border-gray-200">
            <div class="grid grid-cols-12 gap-4 text-xs font-semibold text-graycontent uppercase tracking-wider">
              <div class="col-span-1">No</div>
              <div class="col-span-3">Name</div>
              <div class="col-span-2">Age</div>
              <div class="col-span-2">Color</div>
              <div class="col-span-2">Status</div>
              <div class="col-span-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-for="(unicorn, index) in paginatedUnicorns"
        :key="unicorn._id"
        class="bg-white rounded-lg shadow overflow-hidden"
      >
        <div class="flex">
          <div
            :class="[
              'w-1 flex-shrink-0',
              getCardColor(index)
            ]"
          ></div>
          <div class="flex-1 p-6">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div class="col-span-1 text-sm font-medium text-gray-700">
                <span class="md:hidden font-semibold text-gray-500 uppercase text-xs tracking-wider mr-2">No:</span>
                {{ startIndex + index + 1 }}
              </div>
              <div class="col-span-1 md:col-span-3 text-sm font-medium text-gray-900">
                <span class="md:hidden font-semibold text-gray-500 uppercase text-xs tracking-wider mr-2">Name:</span>
                {{ unicorn.name }}
              </div>
              <div class="col-span-1 md:col-span-2 text-sm text-gray-700">
                <span class="md:hidden font-semibold text-gray-500 uppercase text-xs tracking-wider mr-2">Age:</span>
                {{ unicorn.age }}
              </div>
              <div class="col-span-1 md:col-span-2 flex items-center gap-2">
                <span class="md:hidden font-semibold text-gray-500 uppercase text-xs tracking-wider mr-2">Color:</span>
                <div
                  class="w-5 h-5 rounded-full border border-gray-300"
                  :style="{ backgroundColor: unicorn.color }"
                ></div>
                <span class="text-sm text-gray-700">{{ unicorn.color }}</span>
              </div>
              <div class="col-span-1 md:col-span-2">
                <span class="md:hidden font-semibold text-gray-500 uppercase text-xs tracking-wider mr-2">Status:</span>
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(unicorn.age)
                  ]"
                >
                  <span>{{ getStatusEmoji(unicorn.age) }}</span>
                  {{ store.getStatusByAge(unicorn.age) }}
                </span>
              </div>
              <div class="col-span-1 md:col-span-2 flex items-center gap-3 md:justify-end">
                <button
                  @click="$emit('edit', unicorn)"
                  class="px-4 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  @click="$emit('delete', unicorn)"
                  class="text-red-600 hover:text-red-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <button
                @click="toggleDetails(unicorn._id)"
                class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>{{ expandedDetails.has(unicorn._id) ? 'Hide' : 'Show' }} details</span>
                <svg
                  :class="[
                    'w-4 h-4 transition-transform',
                    expandedDetails.has(unicorn._id) ? 'rotate-180' : ''
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-if="expandedDetails.has(unicorn._id)" class="mt-4 p-4 bg-gray-50 rounded-lg">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Name:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ unicorn.name }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Age:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ unicorn.age }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Color:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ unicorn.color }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Status:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ store.getStatusByAge(unicorn.age) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

const store = useUnicornStore()
const currentPage = ref(1)
const pageSize = 5
const expandedDetails = ref(new Set())

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
  const maxVisible = 7
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

const toggleDetails = (id) => {
  if (expandedDetails.value.has(id)) {
    expandedDetails.value.delete(id)
  } else {
    expandedDetails.value.add(id)
  }
}

const getCardColor = (index) => {
  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
  ]
  return colors[index % colors.length]
}

const getStatusClass = (age) => {
  if (age >= 0 && age <= 8) return 'bg-yellow-100 text-yellow-800'
  if (age >= 9 && age <= 25) return 'bg-green-100 text-green-800'
  return 'bg-purple-100 text-purple-800'
}

const getStatusEmoji = (age) => {
  if (age >= 0 && age <= 8) return '👶'
  if (age >= 9 && age <= 25) return '🦄'
  return '👴'
}
</script>
