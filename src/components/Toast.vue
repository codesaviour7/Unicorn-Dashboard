<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2 sm:translate-x-2"
    enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0 sm:translate-x-0"
    leave-to-class="opacity-0 translate-y-2 sm:translate-x-2"
  >
    <div
      v-if="visible"
      class="fixed bottom-4 right-4 bg-red-600 text-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md z-50"
      role="alert"
      aria-live="polite"
    >
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="font-medium">Unicorn deleted</p>
          <p class="text-sm text-red-100 mt-1">
            "{{ unicornName }}" deleted from the database
          </p>
        </div>
        <button
          @click="dismiss"
          class="flex-shrink-0 text-white hover:text-red-200 transition-colors"
          aria-label="Dismiss notification"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { TOAST } from '../constants'


const props = defineProps({
  unicornName: {
    type: String,
    required: true,
    validator: (value) => value && value.trim().length > 0,
  },
  duration: {
    type: Number,
    default: TOAST.DEFAULT_DURATION,
    validator: (value) => value >= 0,
  },
})

const emit = defineEmits(['close'])

const visible = ref(false)
let timeoutId = null

// showing toast
onMounted(() => {
  visible.value = true
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      dismiss()
    }, props.duration)
  }
})


onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})


const dismiss = () => {
  visible.value = false
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  setTimeout(() => {
    emit('close')
  }, 200)
}

watch(() => props.unicornName, () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  if (props.duration > 0) {
    timeoutId = setTimeout(() => {
      dismiss()
    }, props.duration)
  }
})
</script>

