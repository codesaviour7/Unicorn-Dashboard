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
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Unicorn
            </button>
          </div>

          <div v-if="store.error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-start">
            <p class="text-red-800 flex-1">{{ store.error }}</p>
            <button
              @click="store.error = null"
              class="ml-4 text-red-600 hover:text-red-800 transition-colors"
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
            >
              Sort by Name
              <span v-if="store.sortField === 'name'" class="ml-1">
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
            >
              Sort by Age
              <span v-if="store.sortField === 'age'" class="ml-1">
                {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
              </span>
            </button>
            <button
              v-if="store.sortField"
              @click="store.clearSort()"
              class="px-4 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 transition-colors text-sm"
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
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUnicornStore } from './stores/unicorn'
import Sidebar from './components/Sidebar.vue'
import UnicornList from './components/UnicornList.vue'
import UnicornForm from './components/UnicornForm.vue'
import Toast from './components/Toast.vue'

const store = useUnicornStore()
const showCreateForm = ref(false)
const editingUnicorn = ref(null)
const mobileMenuOpen = ref(false)
const toast = ref(null)

onMounted(() => {
  store.fetchUnicorns()
})

const handleCreate = async (data) => {
  try {
    await store.createUnicorn(data)
    showCreateForm.value = false
  } catch (error) {
    console.error('Error creating unicorn:', error)
  }
}

const handleEdit = (unicorn) => {
  editingUnicorn.value = unicorn
}

const handleUpdate = async (data) => {
  try {
    await store.updateUnicorn(editingUnicorn.value._id, data)
    editingUnicorn.value = null
  } catch (error) {
    console.error('Error updating unicorn:', error)
  }
}

const handleDelete = async (unicorn) => {
  if (confirm('Are you sure you want to delete this unicorn?')) {
    try {
      const unicornName = unicorn.name
      await store.deleteUnicorn(unicorn._id)
      toast.value = { unicornName }
    } catch (error) {
      console.error('Error deleting unicorn:', error)
    }
  }
}
</script>
