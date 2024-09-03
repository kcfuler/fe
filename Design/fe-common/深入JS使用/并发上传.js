/**
 * 整体思路：
 *  通过Promise.race()实现超时控制
 *  通过循环 + return 实现重试机制
 *  通过 concurrency 控制并发数，processQueue 调度并发队列，通过 Promise.all() 等待所有任务完成
 */
async function concurrentUpload(files, uploadFn, options = {}) {
  const {
    concurrency = 3,
    retries = 3,
    timeout = 30000,
    retryDelay = 1000,
  } = options;

  const results = new Array(files.length);
  const queue = files.map((file, index) => ({ file, index }));

  async function upload({ file, index }) {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const uploadPromise = uploadFn(file);
        const result = await Promise.race([
          uploadPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Upload timeout")), timeout)
          ),
        ]);
        results[index] = { file, result, success: true };
        return; // 成功上传，退出重试循环
      } catch (error) {
        lastError = error;
        if (attempt < retries) {
          console.warn(
            `Attempt ${attempt + 1} failed for ${
              file.name
            }, retrying in ${retryDelay}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          // 这里不需要额外的操作，循环会自动进行下一次尝试
        }
      }
    }
    // 所有重试都失败后，记录最后一次的错误
    results[index] = { file, error: lastError, success: false };
    console.error(
      `Failed to upload ${file.name} after ${retries + 1} attempts:`,
      lastError
    );
  }

  async function processQueue() {
    while (queue.length > 0) {
      const item = queue.shift();
      await upload(item);
    }
  }

  const workers = Array(concurrency).fill().map(processQueue);
  await Promise.all(workers);

  return results;
}

async function main() {
  const files = [
    { name: "file1.txt", content: "Hello" },
    { name: "file2.txt", content: "World" },
    { name: "file3.txt", content: "!" },
  ];

  const mockUpload = async (file) => {
    const randomTime = Math.random() * 2000;
    await new Promise((resolve) => setTimeout(resolve, randomTime));
    if (Math.random() < 0.3) throw new Error("Random upload error");
    return `Uploaded ${file.name} with content: ${file.content}`;
  };

  try {
    const results = await concurrentUpload(files, mockUpload, {
      concurrency: 2,
      retries: 2,
      timeout: 1500,
      retryDelay: 500,
    });

    console.log("Upload results (in original order):");
    results.forEach((result, index) => {
      console.log(
        `File ${index + 1}:`,
        result.success ? result.result : result.error.message
      );
    });
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

main();
