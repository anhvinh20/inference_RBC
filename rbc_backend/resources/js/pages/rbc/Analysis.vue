// pages/RBCAnalysis.vue
<template>
    <div class="rbc-analysis-container">
        <h1>RBC Cell Detection & Classification</h1>

        <div class="upload-section" v-if="!isUploading && !analysisId">
            <div
                class="dropzone"
                @dragover.prevent="onDragOver"
                @dragleave.prevent="onDragLeave"
                @drop.prevent="onDrop"
                :class="{ 'active-dropzone': isDragging }"
            >
                <div v-if="!selectedFile">
                    <i class="fas fa-upload"></i>
                    <p>
                        Kéo và thả file ảnh RBC (.tif) hoặc click để chọn file
                    </p>
                    <input
                        type="file"
                        ref="fileInput"
                        @change="onFileSelected"
                        accept=".tif,.tiff"
                        class="file-input"
                    />
                    <button @click="triggerFileInput" class="select-button">
                        Chọn file
                    </button>
                </div>
                <div v-else class="selected-file">
                    <p>{{ selectedFile.name }}</p>
                    <div class="file-actions">
                        <button @click="uploadFile" class="upload-button">
                            Phân tích
                        </button>
                        <button @click="clearFile" class="clear-button">
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isUploading" class="processing-section">
            <div class="spinner"></div>
            <p>Đang tải lên và xử lý ảnh...</p>
        </div>

        <div v-if="analysisId && !result" class="processing-section">
            <div class="spinner"></div>
            <p>Đang phân tích tế bào RBC...</p>
        </div>

        <div v-if="result" class="result-section">
            <h2>Kết quả phân tích</h2>

            <div class="result-summary">
                <p>
                    Tổng số tế bào: <strong>{{ result.total }}</strong>
                </p>
            </div>

            <div class="result-details">
                <div class="result-chart">
                    <RBCPieChart :data="result.counts" />
                </div>

                <div class="result-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Loại tế bào</th>
                                <th>Số lượng</th>
                                <th>Tỷ lệ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(count, type) in result.counts"
                                :key="type"
                            >
                                <td>{{ type }}</td>
                                <td>{{ count }}</td>
                                <td>
                                    {{
                                        ((count / result.total) * 100).toFixed(
                                            2
                                        )
                                    }}%
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <button @click="resetAnalysis" class="new-analysis-button">
                Phân tích ảnh mới
            </button>
        </div>

        <div v-if="error" class="error-message">
            <p>{{ error }}</p>
            <button @click="resetAnalysis" class="try-again-button">
                Thử lại
            </button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import RBCPieChart from "@/components/RBCPieChart.vue";
import { analyzeRBCImage, getRBCResult } from "@/services/rbc_api.js";

export default {
    name: "RBCAnalysis",
    components: {
        RBCPieChart,
    },
    setup() {
        const fileInput = ref(null);
        const selectedFile = ref(null);
        const isDragging = ref(false);
        const isUploading = ref(false);
        const analysisId = ref(null);
        const result = ref(null);
        const error = ref(null);
        const pollingInterval = ref(null);

        const triggerFileInput = () => {
            fileInput.value.click();
        };

        const onFileSelected = (event) => {
            const file = event.target.files[0];
            if (file) {
                if (
                    file.type === "image/tiff" ||
                    file.name.endsWith(".tif") ||
                    file.name.endsWith(".tiff")
                ) {
                    selectedFile.value = file;
                    error.value = null;
                } else {
                    error.value = "Vui lòng chọn file ảnh .tif hoặc .tiff";
                }
            }
        };

        const onDragOver = (event) => {
            isDragging.value = true;
        };

        const onDragLeave = () => {
            isDragging.value = false;
        };

        const onDrop = (event) => {
            isDragging.value = false;
            const file = event.dataTransfer.files[0];
            if (file) {
                if (
                    file.type === "image/tiff" ||
                    file.name.endsWith(".tif") ||
                    file.name.endsWith(".tiff")
                ) {
                    selectedFile.value = file;
                    error.value = null;
                } else {
                    error.value = "Vui lòng chọn file ảnh .tif hoặc .tiff";
                }
            }
        };

        const clearFile = () => {
            selectedFile.value = null;
            if (fileInput.value) {
                fileInput.value.value = "";
            }
        };

        const uploadFile = async () => {
            if (!selectedFile.value) return;

            isUploading.value = true;
            error.value = null;

            const formData = new FormData();
            formData.append("image", selectedFile.value);

            try {
                const response = await analyzeRBCImage(formData);

                if (response.status === "processing") {
                    analysisId.value = response.analysis_id;
                    startPolling();
                }
            } catch (err) {
                error.value = "Lỗi khi tải lên ảnh. Vui lòng thử lại.";
                isUploading.value = false;
            }
        };

        const startPolling = () => {
            isUploading.value = false;

            pollingInterval.value = setInterval(async () => {
                try {
                    const response = await getRBCResult(analysisId.value);

                    if (response.status === "completed") {
                        result.value = response.result;
                        clearInterval(pollingInterval.value);
                    }
                } catch (err) {
                    error.value =
                        "Lỗi khi lấy kết quả phân tích. Vui lòng thử lại.";
                    clearInterval(pollingInterval.value);
                }
            }, 2000);
        };

        const resetAnalysis = () => {
            selectedFile.value = null;
            isUploading.value = false;
            analysisId.value = null;
            result.value = null;
            error.value = null;

            if (pollingInterval.value) {
                clearInterval(pollingInterval.value);
            }

            if (fileInput.value) {
                fileInput.value.value = "";
            }
        };

        onMounted(() => {
            // Clean up on component unmount
            return () => {
                if (pollingInterval.value) {
                    clearInterval(pollingInterval.value);
                }
            };
        });

        return {
            fileInput,
            selectedFile,
            isDragging,
            isUploading,
            analysisId,
            result,
            error,
            triggerFileInput,
            onFileSelected,
            onDragOver,
            onDragLeave,
            onDrop,
            clearFile,
            uploadFile,
            resetAnalysis,
        };
    },
};
</script>

<style scoped>
.rbc-analysis-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
}

.dropzone {
    border: 2px dashed #ccc;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
}

.active-dropzone {
    border-color: #4caf50;
    background-color: rgba(76, 175, 80, 0.1);
}

.file-input {
    display: none;
}

.select-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.selected-file {
    margin-top: 1rem;
}

.file-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.upload-button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.clear-button {
    padding: 0.5rem 1rem;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.processing-section {
    text-align: center;
    margin-top: 2rem;
}

.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border-top: 4px solid #2c3e50;
    animation: spin 1s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.result-section {
    margin-top: 2rem;
}

.result-summary {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
}

.result-details {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

.result-chart {
    flex: 1;
    min-width: 300px;
}

.result-table {
    flex: 1;
    min-width: 300px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

.new-analysis-button {
    display: block;
    margin: 2rem auto 0;
    padding: 0.75rem 1.5rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.error-message {
    margin-top: 2rem;
    text-align: center;
    color: #f44336;
}

.try-again-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .result-details {
        flex-direction: column;
    }
}
</style>
