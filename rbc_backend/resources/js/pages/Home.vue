<!-- resources/js/pages/Home.vue -->
<template>
  <div class="container mt-5">
      <h1>Vue 3 trong Laravel 11</h1>
      <div class="card mt-3">
          <div class="card-body">
              <p>{{ message }}</p>
              <button @click="fetchData" class="btn btn-primary">Tải dữ liệu từ API</button>
              
              <div v-if="loading" class="mt-3">Đang tải...</div>
              
              <div v-if="items.length > 0" class="mt-3">
                  <h3>Dữ liệu từ API:</h3>
                  <ul class="list-group">
                      <li v-for="item in items" :key="item.id" class="list-group-item">
                          {{ item.name }}
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { useItemsApi } from '../services/api.js';

export default {
  name: 'HomePage',
  data() {
      return {
          message: 'Vue đã được cấu hình thành công!',
          items: [],
          loading: false
      }
  },
  methods: {
      async fetchData() {
          this.loading = true;
          try {
              const { getItems } = useItemsApi();
              this.items = await getItems();
          } catch (error) {
              console.error('Lỗi khi lấy dữ liệu:', error);
          } finally {
              this.loading = false;
          }
      }
  }
}
</script>