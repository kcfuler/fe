import * as fs from "fs";
import * as path from "path";

/**
 * 递归查找目录中最深层的 PDF 文件。
 * "最深层" 指的是那些不包含任何子目录的文件夹。
 * @param dirPath 要搜索的目录路径。
 * @returns 返回一个包含最深层 PDF 文件绝对路径的数组。
 */
function findDeepestPdfFiles(dirPath: string): string[] {
  let deepestPdfs: string[] = [];
  let entries: fs.Dirent[] = [];

  try {
    // 读取目录内容，获取文件和子目录
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error: any) {
    // 处理可能的权限问题或目录不存在错误
    console.error(`无法读取目录 ${dirPath}: ${error.message}`);
    return []; // 返回空数组表示此路径下无法查找
  }

  const subdirectories = entries.filter((entry) => entry.isDirectory());
  const files = entries.filter((entry) => entry.isFile());

  // 检查当前目录是否是"最深层"（即不包含子目录）
  if (subdirectories.length === 0) {
    // 如果是，则收集当前目录下的所有 PDF 文件
    const pdfsInDir = files
      .filter((file) => file.name.toLowerCase().endsWith(".pdf"))
      .map((file) => path.resolve(dirPath, file.name)); // 使用 resolve 获取绝对路径
    deepestPdfs.push(...pdfsInDir);
  } else {
    // 如果不是最深层，则递归进入每个子目录
    for (const subdir of subdirectories) {
      const pdfsFromSubdir = findDeepestPdfFiles(
        path.join(dirPath, subdir.name)
      );
      deepestPdfs.push(...pdfsFromSubdir);
    }
    // 注意：我们忽略了非最深层目录中直接包含的 PDF 文件
  }

  return deepestPdfs;
}

// --- 使用示例 ---

// 替换为你要扫描的目标文件夹路径
// 可以是相对路径（相对于脚本运行的位置）或绝对路径
const targetDirectory = `C:\Users\kcfuler1\Zotero\storage`; // 例如 './my_documents' 或 'C:/Users/YourUser/Documents'

// 检查目标目录是否存在
if (
  !fs.existsSync(targetDirectory) ||
  !fs.lstatSync(targetDirectory).isDirectory()
) {
  console.error(
    `错误：目标目录 "${targetDirectory}" 不存在或不是一个有效的目录。`
  );
} else {
  console.log(`开始扫描目录: ${path.resolve(targetDirectory)}`);
  const pdfFiles = findDeepestPdfFiles(targetDirectory);

  if (pdfFiles.length > 0) {
    console.log("\n找到的最深层 PDF 文件:");
    pdfFiles.forEach((file) => console.log(file));
    console.log(`\n总共找到 ${pdfFiles.length} 个文件。`);
  } else {
    console.log(
      `\n在 "${path.resolve(
        targetDirectory
      )}" 及其子目录的最深层未找到 PDF 文件。`
    );
  }
}
