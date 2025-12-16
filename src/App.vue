<template>
  <div class="min-h-screen bg-gray-100">
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="mobileMenuOpen = false"
    ></div>
    <div class="flex">
      <Sidebar :mobile-menu-open="mobileMenuOpen" @close="mobileMenuOpen = false" />

      <div class="flex-1 md:ml-64">

        <main class="p-4 md:p-8">
          <div class="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 class="text-2xl md:text-3xl font-bold text-grayhead">Welcome John Doe</h2>
            <button
              @click="showCreateForm = true"
              class="px-6 py-2.5 bg-picolo text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
              aria-label="Create new unicorn"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1058 3.78846C14.0139 3.78846 14.75 3.05231 14.75 2.14423C14.75 1.23615 14.0139 0.5 13.1058 0.5C12.1977 0.5 11.4615 1.23615 11.4615 2.14423M13.1058 3.78846C12.1977 3.78846 11.4615 3.05231 11.4615 2.14423M13.1058 3.78846V11.4615M11.4615 2.14423H3.78846M11.4615 13.1058C11.4615 14.0139 12.1977 14.75 13.1058 14.75C14.0139 14.75 14.75 14.0139 14.75 13.1058C14.75 12.1977 14.0139 11.4615 13.1058 11.4615M11.4615 13.1058C11.4615 12.1977 12.1977 11.4615 13.1058 11.4615M11.4615 13.1058H3.78846M3.78846 2.14423C3.78846 3.05231 3.05231 3.78846 2.14423 3.78846M3.78846 2.14423C3.78846 1.23615 3.05231 0.5 2.14423 0.5C1.23615 0.5 0.5 1.23615 0.5 2.14423C0.5 3.05231 1.23615 3.78846 2.14423 3.78846M2.14423 3.78846V11.4615M3.78846 13.1058C3.78846 14.0139 3.05231 14.75 2.14423 14.75C1.23615 14.75 0.5 14.0139 0.5 13.1058C0.5 12.1977 1.23615 11.4615 2.14423 11.4615M3.78846 13.1058C3.78846 12.1977 3.05231 11.4615 2.14423 11.4615" stroke="white" stroke-linecap="round"/>
            </svg>
              Create Unicorn
            </button>
          </div>

          <div v-if="store.error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-start">
            <p class="text-red-800 flex-1">{{ store.error }}</p>
            <button
              @click="store.error = null"
              class="ml-4 text-red-600 hover:text-red-800 transition-colors"
              aria-label="Dismiss error"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="mb-6 flex flex-wrap gap-2">
            <button
              @click="store.setSort('name')"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
                store.sortField === 'name'
                  ? 'bg-picolo text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              ]"
              :aria-pressed="store.sortField === 'name'"
              aria-label="Sort by name"
            >
              Sort by Name
              <span v-if="store.sortField === 'name'" class="ml-1" aria-hidden="true">
                {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </button>
            <button
              @click="store.setSort('age')"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors text-sm',
                store.sortField === 'age'
                  ? 'bg-picolo text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              ]"
              :aria-pressed="store.sortField === 'age'"
              aria-label="Sort by age"
            >
              Sort by Age
              <span v-if="store.sortField === 'age'" class="ml-1" aria-hidden="true">
                {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </button>
            <button
              v-if="store.sortField"
              @click="store.clearSort()"
              class="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors text-sm"
              aria-label="Clear sort"
            >
              Clear Sort
            </button>
          </div>

          <UnicornForm
            v-if="showCreateForm"
            :unicorn="null"
            @close="showCreateForm = false"
            @submit="handleCreate"
          />

          <UnicornForm
            v-if="editingUnicorn"
            :unicorn="editingUnicorn"
            @close="editingUnicorn = null"
            @submit="handleUpdate"
          />

          <UnicornList
            @edit="handleEdit"
            @delete="handleDelete"
          />

          <Toast
            v-if="toast"
            :unicorn-name="toast.unicornName"
            @close="toast = null"
          />

          <ConfirmModal
            v-if="deleteConfirmation"
            :visible="deleteConfirmation.visible"
            title="Delete Unicorn"
            :message="deleteConfirmation.message"
            confirm-text="Delete"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
          />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { useUnicornStore } from './stores/unicorn'
import Sidebar from './components/Sidebar.vue'
import UnicornList from './components/UnicornList.vue'
import ConfirmModal from './components/ConfirmModal.vue'

const UnicornForm = defineAsyncComponent(() => import('./components/UnicornForm.vue'))
const Toast = defineAsyncComponent(() => import('./components/Toast.vue'))

const store = useUnicornStore()
const showCreateForm = ref(false)
const editingUnicorn = ref(null)
const mobileMenuOpen = ref(false)
const toast = ref(null)
const deleteConfirmation = ref(null)

onMounted(() => {
  store.fetchUnicorns()
})

/**
 * @param {Object} data - The unicorn data to create
 */
const handleCreate = async (data) => {
  try {
    await store.createUnicorn(data)
    showCreateForm.value = false
  } catch (error) {
    console.error('Error creating unicorn:', error)
  }
}

/**
 * @param {Object} unicorn - The unicorn to edit
 */
const handleEdit = (unicorn) => {
  editingUnicorn.value = unicorn
}

/**
 * @param {Object} data - The updated unicorn data
 */
const handleUpdate = async (data) => {
  try {
    await store.updateUnicorn(editingUnicorn.value._id, data)
    editingUnicorn.value = null
  } catch (error) {
    console.error('Error updating unicorn:', error)
  }
}

/**
 * @param {Object} unicorn - The unicorn to delete
 */
const handleDelete = (unicorn) => {
  deleteConfirmation.value = {
    visible: true,
    unicorn,
    message: `Are you sure you want to delete "${unicorn.name}"? This action cannot be undone.`,
  }
}


const confirmDelete = async () => {
  if (!deleteConfirmation.value) return
  
  try {
    const unicornName = deleteConfirmation.value.unicorn.name
    await store.deleteUnicorn(deleteConfirmation.value.unicorn._id)
    toast.value = { unicornName }
    deleteConfirmation.value = null
  } catch (error) {
    console.error('Error deleting unicorn:', error)
    deleteConfirmation.value = null
  }
}

const cancelDelete = () => {
  deleteConfirmation.value = null
}
</script>
