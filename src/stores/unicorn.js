import { defineStore } from 'pinia'
import { unicornAPI } from '../services/api'
import { dummyUnicorns } from '../data/unicorns'
import { getStatusByAge } from '../utils/status'

const USE_DUMMY_DATA = true

export const useUnicornStore = defineStore('unicorn', {
  state: () => ({
    unicorns: [],
    loading: false,
    error: null,
    sortField: null,
    sortDirection: 'asc',
  }),

  getters: {
    /**
     * @param {Object} state - The store state
     * @returns {Array} Sorted array of unicorns
     */
    sortedUnicorns(state) {
      if (!state.sortField) return state.unicorns

      return [...state.unicorns].sort((a, b) => {
        let aVal = a[state.sortField]
        let bVal = b[state.sortField]

        if (state.sortField === 'name') {
          aVal = aVal.toLowerCase()
          bVal = bVal.toLowerCase()
        }

        if (aVal < bVal) return state.sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return state.sortDirection === 'asc' ? 1 : -1
        return 0
      })
    },

    /**
     * @returns {Function} Function that takes age and returns status label
     */
    getStatusByAge: () => (age) => {
      return getStatusByAge(age).label
    },
  },

  actions: {
    /**
     * Fetches all unicorns from the API
     * @returns {Promise<void>}
     */
    async fetchUnicorns() {
      if (USE_DUMMY_DATA) {
        this.unicorns = dummyUnicorns.map((u) => ({ ...u }))
        this.error = null
        return
      }

      this.loading = true
      this.error = null
      try {
        const data = await unicornAPI.getAll()
        this.unicorns = Array.isArray(data) ? data : []
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to fetch unicorns'
        this.unicorns = []
      } finally {
        this.loading = false
      }
    },

    /**
     * Creates a new unicorn
     * @param {Object} unicornData - The unicorn data to create
     * @returns {Promise<void>}
     * @throws {Error} If creation fails
     */
    async createUnicorn(unicornData) {
      if (USE_DUMMY_DATA) {
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 300))
        const newUnicorn = {
          _id: Date.now().toString(),
          ...unicornData,
        }
        this.unicorns.push(newUnicorn)
        this.loading = false
        return
      }

      this.loading = true
      this.error = null
      try {
        await unicornAPI.create(unicornData)
        await this.fetchUnicorns()
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to create unicorn'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Updates an existing unicorn
     * @param {string} id - The unicorn ID
     * @param {Object} unicornData - The updated unicorn data
     * @returns {Promise<void>}
     * @throws {Error} If update fails
     */
    async updateUnicorn(id, unicornData) {
      if (USE_DUMMY_DATA) {
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 300))
        const index = this.unicorns.findIndex((u) => u._id === id)
        if (index !== -1) {
          this.unicorns[index] = {
            ...this.unicorns[index],
            ...unicornData,
          }
        }
        this.loading = false
        return
      }

      this.loading = true
      this.error = null
      try {
        await unicornAPI.update(id, unicornData)
        await this.fetchUnicorns()
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to update unicorn'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Deletes a unicorn by ID
     * @param {string} id - The unicorn ID to delete
     * @returns {Promise<void>}
     * @throws {Error} If deletion fails
     */
    async deleteUnicorn(id) {
      if (USE_DUMMY_DATA) {
        this.loading = true
        await new Promise(resolve => setTimeout(resolve, 300))
        this.unicorns = this.unicorns.filter((u) => u._id !== id)
        this.loading = false
        return
      }

      this.loading = true
      this.error = null
      try {
        await unicornAPI.delete(id)
        await this.fetchUnicorns()
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Failed to delete unicorn'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Sets the sort field and direction
     * @param {string} field - The field to sort by ('name' or 'age')
     */
    setSort(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
    },

    /**
     * Clears the current sort settings
     */
    clearSort() {
      this.sortField = null
      this.sortDirection = 'asc'
    },
  },
})

