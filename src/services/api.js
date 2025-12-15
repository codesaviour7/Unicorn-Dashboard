import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://crudcrud.com/api/YOUR_UNIQUE_ID/unicorns'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const unicornAPI = {
  async getAll() {
    const response = await apiClient.get('')
    return response.data
  },

  async getById(id) {
    const response = await apiClient.get(`/${id}`)
    return response.data
  },

  async create(data) {
    const response = await apiClient.post('', data)
    return response.data
  },

  async update(id, data) {
    const response = await apiClient.put(`/${id}`, data)
    return response.data
  },

  async delete(id) {
    await apiClient.delete(`/${id}`)
  },
}

export default apiClient

