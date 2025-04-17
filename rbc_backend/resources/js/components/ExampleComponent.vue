<!-- resources/js/components/ExampleComponent.vue -->
<template>
  <div class="card mt-3">
      <div class="card-header">
          <h3>Component Mẫu</h3>
      </div>
      <div class="card-body">
          <p>Đây là một component Vue mẫu</p>
          <button @click="count++" class="btn btn-sm btn-info">
              Đếm: {{ count }}
          </button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
          count: 0
      }
  }
}
</script>