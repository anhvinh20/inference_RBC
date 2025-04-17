// pages/About.vue
<template>
    <div class="about-container">
        <h1>Về RBC Analyzer</h1>

        <section class="about-section">
            <h2>RBC Analyzer là gì?</h2>
            <p>
                RBC Analyzer là một công cụ mạnh mẽ được thiết kế cho các chuyên
                gia y tế và các nhà nghiên cứu để tự động phát hiện và phân loại
                các tế bào hồng cầu (RBC) trong hình ảnh hiển vi. Hệ thống sử
                dụng các mô hình học sâu tiên tiến để xác định và phân loại các
                tế bào thành bốn loại: T, SG, Others và Diff.
            </p>
        </section>

        <section class="about-section">
            <h2>Hoạt động như thế nào?</h2>
            <div class="workflow">
                <div class="workflow-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Upload</h3>
                        <p>
                            Upload ảnh RBC của bạn.
                        </p>
                    </div>
                </div>

                <div class="workflow-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Detection</h3>
                        <p>
                            YOLOv5-m model detects RBC unhealthy cells in the
                            image.
                        </p>
                    </div>
                </div>

                <div class="workflow-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Classification</h3>
                        <p>
                            ResNet50 model classifies each cell into one of four
                            categories.
                        </p>
                    </div>
                </div>

                <div class="workflow-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h3>Results</h3>
                        <p>
                            Get detailed count and distribution of cell types.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="about-section">
            <h2>Công nghệ sử dụng</h2>
            <ul class="tech-stack">
                <li><strong>Frontend:</strong> Vue.js</li>
                <li><strong>Backend:</strong> Laravel</li>
                <li><strong>Cell Detection:</strong> YOLOv5-m</li>
                <li><strong>Cell Classification:</strong> ResNet50</li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    name: "About",
};
</script>

<style scoped>
.about-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 2rem;
}

.about-section {
    margin-bottom: 3rem;
}

h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
}

p {
    line-height: 1.7;
}

.workflow {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.workflow-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.step-number {
    background-color: #2c3e50;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
}

.step-content h3 {
    margin-bottom: 0.5rem;
}

.tech-stack {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

.tech-stack li {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
