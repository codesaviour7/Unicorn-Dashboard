import { defineStore } from 'pinia'
import { unicornAPI } from '../services/api'
import { getStatusByAge } from '../utils/status'

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

