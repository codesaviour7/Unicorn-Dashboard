import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://crudcrud.com/api/YOUR_UNIQUE_ID/unicorns'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})


export const unicornAPI = {
  /**
   * @returns {Promise<Array>} Array of unicorn objects
   */
  async getAll() {
    const response = await apiClient.get('')
    return response.data
  },

  /**
   * @param {string} id - The unicorn ID
   * @returns {Promise<Object>} Unicorn object
   */
  async getById(id) {
    const response = await apiClient.get(`/${id}`)
    return response.data
  },

  /**
   * @param {Object} data - The unicorn data
   * @returns {Promise<Object>} Created unicorn object
   */
  async create(data) {
    const response = await apiClient.post('', data)
    return response.data
  },

  /**
   * @param {string} id - The unicorn ID
   * @param {Object} data - The updated unicorn data
   * @returns {Promise<Object>} Updated unicorn object
   */
  async update(id, data) {
    const response = await apiClient.put(`/${id}`, data)
    return response.data
  },

  /**
   * @param {string} id - The unicorn ID to delete
   * @returns {Promise<void>}
   */
  async delete(id) {
    await apiClient.delete(`/${id}`)
  },
}

export default apiClient

