// services/api.js
import axios from 'axios';

// Khởi tạo Axios instance với cấu hình chung
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
});

/**
 * Gửi ảnh RBC để phân tích
 * @param {FormData} formData - FormData chứa file ảnh .tif
 * @returns {Promise} Promise với kết quả từ API
 */
export const analyzeRBCImage = async (formData) => {
  try {
    const response = await apiClient.post('/rbc/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error analyzing RBC image:', error);
    throw error;
  }
};

/**
 * Lấy kết quả phân tích từ server
 * @param {string} analysisId - ID phiên phân tích
 * @returns {Promise} Promise với kết quả từ API
 */
export const getRBCResult = async (analysisId) => {
  try {
    const response = await apiClient.get(`/rbc/result/${analysisId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching RBC analysis result:', error);
    throw error;
  }
};

export default {
  analyzeRBCImage,
  getRBCResult
};