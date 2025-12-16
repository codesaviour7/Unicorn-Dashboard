<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="visible"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="$emit('cancel')"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 id="confirm-title" class="text-lg font-semibold text-gray-900 mb-4">
          {{ title }}
        </h3>
        <p class="text-gray-600 mb-6">
          {{ message }}
        </p>
        <div class="flex gap-3 justify-end">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            aria-label="Cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="$emit('confirm')"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            aria-label="Confirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
})

defineEmits(['confirm', 'cancel'])
</script>

