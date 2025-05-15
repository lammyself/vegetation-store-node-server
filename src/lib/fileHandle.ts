import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

/**
 * 将 Buffer 写入临时文件并返回临时文件路径
 * @param buffer 文件二进制数据
 * @param originalName 原始文件名，用于扩展名提取
 */
export async function createTempFilePathForBuffer(
  buffer: Buffer,
  originalName: string,
): Promise<string> {
  const tempDir = tmpdir(); // 获取系统临时目录
  const fileExtension = originalName.slice(originalName.lastIndexOf('.')); // 获取文件后缀
  const tempFileName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${fileExtension}`;
  const tempFilePath = join(tempDir, tempFileName);

  // 写入临时文件
  await fs.writeFile(tempFilePath, buffer);

  return tempFilePath;
}
