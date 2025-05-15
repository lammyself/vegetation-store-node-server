import * as OSS from 'ali-oss';
// const OSS = require('ali-oss');
import { Injectable } from '@nestjs/common';
import { createTempFilePathForBuffer } from 'src/lib/fileHandle';
import { ConfigService } from '@nestjs/config';
// 自定义请求头
const headers = (fileName: string) => {
  const encodedFileName = encodeURIComponent(fileName);

  return {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'private',
    // 通过文件URL访问文件时，指定以附件形式下载文件，下载后的文件名称定义为example.txt。
    'Content-Disposition': `attachment; filename="${encodedFileName}"`,
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'true',
  };
};

@Injectable()
export class UFOService {
  constructor(private readonly configService: ConfigService) {}
  async uploadToOSS(file: Express.Multer.File): Promise<string> {
    const accessKeyId =
      this.configService.get<string | undefined>('OSS_ACCESS_KEY_ID') || '';
    const accessKeySecret =
      this.configService.get<string | undefined>('OSS_ACCESS_KEY_SECRET') || '';
    const bucket =
      this.configService.get<string | undefined>('OSS_BUCKET') || '';
    const endpoint =
      this.configService.get<string | undefined>('OSS_ENDPOINT') || '';
    const region =
      this.configService.get<string | undefined>('OSS_REGION') || '';

    if (!Object.hasOwnProperty.call(file, 'buffer')) {
      throw new Error('Invalid file or buffer missing');
    }

    // 显式声明 client 类型
    const client = new OSS({
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
      endpoint,
    });
    // 为文件创建本地临时路径
    const fileSourcePath = await createTempFilePathForBuffer(
      file.buffer,
      file.originalname,
    );
    // 随机生成文件名称 并转为16进制字符串
    const objectName = `vegetation-store-${Math.random().toString(16).slice(2)}-${file.originalname}`;
    const fileTargetPath = `/tem/${objectName}`;

    // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
    // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
    const result = await client.put(fileTargetPath, fileSourcePath, {
      headers: headers(file.originalname),
    });
    return client.signatureUrl(result.name); // 返回文件的访问地址
  }
}
