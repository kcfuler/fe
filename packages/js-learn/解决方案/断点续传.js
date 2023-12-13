const url = "/upload";
const file = document.querySelector("#file-input").files[0];
const chunkSize = 1024 * 1024; // 每个分片的大小为 1MB
const chunks = Math.ceil(file.size / chunkSize); // 计算总共需要上传多少个分片
let uploadedChunks = []; // 已经上传的分片索引

// 上传文件分片
function uploadChunk(chunkIndex, start, end) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.setRequestHeader("X-Chunk-Index", chunkIndex);
    xhr.setRequestHeader("X-Chunk-Start", start);
    xhr.setRequestHeader("X-Chunk-End", end);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    /**
     * 直接使用 file.slice(start, end) 对文件进行分片是合理的，
     * 这是因为 HTML5 提供了一个非常强大的 API —— Blob.slice()，用于处理这类需求。
     * 而file类型是Blob类型的子类型，可以使用这个方法
     */
    xhr.send(file.slice(start, end));
  });
}

// 上传文件
async function uploadFile() {
  let start = 0;
  let end = 0;
  for (let i = 0; i < chunks; i++) {
    start = end;
    end = start + chunkSize;
    if (end > file.size) {
      end = file.size;
    }
    if (!uploadedChunks.includes(i)) {
      try {
        await uploadChunk(i, start, end);
        uploadedChunks.push(i);
        localStorage.setItem("uploadedChunks", JSON.stringify(uploadedChunks)); // 保存已经上传的分片索引
      } catch (error) {
        console.error(error);
      }
    }
  }
}

// 恢复上传
function resumeUpload() {
  const uploadedChunksJSON = localStorage.getItem("uploadedChunks");
  if (uploadedChunksJSON) {
    uploadedChunks = JSON.parse(uploadedChunksJSON);
  }
  // 补充恢复上传的逻辑
}

// 注册上传事件
document.querySelector("#upload-btn").addEventListener("click", () => {
  resumeUpload();
  uploadFile();
});
