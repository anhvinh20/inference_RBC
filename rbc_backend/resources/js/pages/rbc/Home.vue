// pages/Home.vue
<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-content">
        <h1>RBC Analyzer</h1>
        <p class="subtitle">Phân tích và phân loại tế bào hồng cầu tự động với AI</p>
        <div class="hero-buttons">
          <router-link to="/analysis" class="primary-button">Bắt đầu phân tích</router-link>
          <router-link to="/about" class="secondary-button">Tìm hiểu thêm</router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <h2>Tính năng chính</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-microscope"></i>
          </div>
          <h3>Phát hiện chính xác</h3>
          <p>Sử dụng YOLOv5 để phát hiện chính xác vị trí của từng tế bào hồng cầu trong ảnh hiển vi.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-sitemap"></i>
          </div>
          <h3>Phân loại thông minh</h3>
          <p>Phân loại tế bào thành 4 loại: T, SG, Others và Diff với độ chính xác cao nhờ mô hình ResNet50.</p>
        </div>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-chart-pie"></i>
          </div>
          <h3>Phân tích thống kê</h3>
          <p>Hiển thị kết quả phân tích chi tiết với số lượng và phân bố của từng loại tế bào.</p>
        </div>
        
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2>Sẵn sàng để phân tích?</h2>
        <p>Tải lên ảnh hiển vi của bạn và nhận kết quả trong vài giây.</p>
        <router-link to="/analysis" class="cta-button">Bắt đầu ngay</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home-container {
  width: 100%;
}

.hero-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button, .cta-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.primary-button:hover, .cta-button:hover {
  background-color: #45a049;
}

.secondary-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.features-section {
  padding: 4rem 2rem;
  background-color: #f5f5f5;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.cta-section {
  background-color: #2c3e50;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>