import { defineStore } from 'pinia'
import { unicornAPI } from '../services/api'
import { dummyUnicorns } from '../data/unicorns'

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

    getStatusByAge: () => (age) => {
      if (age >= 0 && age <= 8) return 'Baby Unicorn'
      if (age >= 9 && age <= 25) return 'Mature Unicorn'
      return 'Old Unicorn'
    },
  },

  actions: {
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

    async createUnicorn(unicornData) {
      if (USE_DUMMY_DATA) {
        const newUnicorn = {
          _id: Date.now().toString(),
          ...unicornData,
        }
        this.unicorns.push(newUnicorn)
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

    async updateUnicorn(id, unicornData) {
      if (USE_DUMMY_DATA) {
        const index = this.unicorns.findIndex((u) => u._id === id)
        if (index !== -1) {
          this.unicorns[index] = {
            ...this.unicorns[index],
            ...unicornData,
          }
        }
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

    async deleteUnicorn(id) {
      if (USE_DUMMY_DATA) {
        this.unicorns = this.unicorns.filter((u) => u._id !== id)
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

    setSort(field) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
    },

    clearSort() {
      this.sortField = null
      this.sortDirection = 'asc'
    },
  },
})

