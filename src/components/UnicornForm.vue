<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" 
    @click.self="$emit('close')"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="unicorn ? 'edit-unicorn-title' : 'create-unicorn-title'"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div :class="[
        'text-black px-6 py-4 rounded-t-lg border-b-[1px] border-grayborder'
      ]">
        <h2 
          :id="unicorn ? 'edit-unicorn-title' : 'create-unicorn-title'"
          class="text-xl font-sans font-bold"
        >
          {{ unicorn ? 'Edit Unicorn details' : 'Create Unicorn' }}
        </h2>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-6">
          <div>
            <label for="name" class="block text-md font-sans font-normal text-black mb-2">
              Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              :maxlength="VALIDATION.MAX_NAME_LENGTH"
              placeholder="Write Name"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-sm placeholder:font-sans"
              :class="{ 'border-red-500': errors.name }"
              :aria-invalid="!!errors.name"
              aria-describedby="name-error name-hint"
            />
            <p v-if="errors.name" id="name-error" class="mt-1 text-sm font-sans text-red-600" role="alert">{{ errors.name }}</p>
            <p v-else-if="!unicorn" id="name-hint" class="mt-1 text-xs font-sans text-gray-500">This is the unicorn name</p>
          </div>

          <div>
            <label for="age" class="block text-md font-sans font-normal text-black mb-2">
              Age
            </label>
            <input
              id="age"
              v-model.number="formData.age"
              type="number"
              :min="VALIDATION.MIN_AGE"
              required
              placeholder="Write age"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-sm placeholder:font-sans"
              :class="{ 'border-red-500': errors.age }"
              :aria-invalid="!!errors.age"
              aria-describedby="age-error"
            />
            <p v-if="errors.age" id="age-error" class="mt-1 text-sm font-sans text-red-600" role="alert">{{ errors.age }}</p>
          </div>

          <div>
            <label for="color" class="block text-md font-sans font-normal text-black mb-2">
              Color
            </label>
            <input
              id="color"
              v-model="formData.color"
              type="text"
              required
              placeholder="Write color"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-sm placeholder:font-sans"
              :class="{ 'border-red-500': errors.color }"
              :aria-invalid="!!errors.color"
              aria-describedby="color-error"
            />
            <p v-if="errors.color" id="color-error" class="mt-1 text-sm font-sans text-red-600" role="alert">{{ errors.color }}</p>
          </div>
        </div>

        <div class="mt-8 flex gap-3 justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            aria-label="Cancel form"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2.5 bg-picolo text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            :aria-busy="submitting"
            aria-label="Submit form"
          >
            <span v-if="submitting">Saving...</span>
            <span v-else>{{ unicorn ? 'Update' : 'Create' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { VALIDATION } from '../constants'

/**
 * UnicornForm Component
 * Reusable form component for creating and editing unicorns
 */
const props = defineProps({
  unicorn: {
    type: Object,
    default: null,
    validator: (value) => {
      return value === null || (typeof value === 'object' && 'name' in value)
    },
  },
})

const emit = defineEmits(['close', 'submit'])

const submitting = ref(false)
const errors = reactive({})

const formData = reactive({
  name: '',
  age: null,
  color: '',
})


onMounted(() => {
  if (props.unicorn) {
    formData.name = props.unicorn.name || ''
    formData.age = props.unicorn.age || null
    formData.color = props.unicorn.color || ''
  }
})

/**
 * @returns {boolean} True if form is valid, false otherwise
 */
const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  let isValid = true

  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Name is required'
    isValid = false
  } else if (formData.name.trim().length < VALIDATION.MIN_NAME_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`
    isValid = false
  } else if (formData.name.trim().length > VALIDATION.MAX_NAME_LENGTH) {
    errors.name = `Name must be no more than ${VALIDATION.MAX_NAME_LENGTH} characters`
    isValid = false
  }

  const ageNum = Number(formData.age)
  if (formData.age === null || formData.age === undefined || formData.age === '') {
    errors.age = 'Age is required'
    isValid = false
  } else if (isNaN(ageNum)) {
    errors.age = 'Age must be a number'
    isValid = false
  } else if (ageNum < VALIDATION.MIN_AGE) {
    errors.age = `Age must be ${VALIDATION.MIN_AGE} or greater`
    isValid = false
  } else if (ageNum > VALIDATION.MAX_AGE) {
    errors.age = `Age must be no more than ${VALIDATION.MAX_AGE} years`
    isValid = false
  } else if (!Number.isInteger(ageNum)) {
    errors.age = 'Age must be a whole number'
    isValid = false
  }

  if (!formData.color || formData.color.trim().length === 0) {
    errors.color = 'Color is required'
    isValid = false
  }

  return isValid
}

/**
 * For form submission
 * @returns {Promise<void>}
 */
const handleSubmit = async () => {
  if (!validate()) return

  submitting.value = true
  try {
    await emit('submit', {
      name: formData.name.trim(),
      age: parseInt(formData.age, 10),
      color: formData.color.trim(),
    })
  } finally {
    submitting.value = false
  }
}
</script>

