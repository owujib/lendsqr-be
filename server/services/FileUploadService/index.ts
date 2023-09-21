import fileConfig from '../../config/fileConfig';
import Helpers from '../../helpers';
import { resourceTypes } from '../../types';
// import AwsStorageProvider from './AwsStorageProvider';
import CloudinaryStorageProvider from './CloudinaryStorageProvider';
import LocalDiskStorageProvider from './LocalDiskStorageProvider';

type FileSystemProviderInterface =
  | CloudinaryStorageProvider
  | LocalDiskStorageProvider;

class FileUploadService {
  fileSystemProvider: FileSystemProviderInterface;

  constructor() {
    this.fileSystemProvider =
      fileConfig.default === 'cloudinary'
        ? new CloudinaryStorageProvider()
        : // : fileConfig.default === 's3'
          // ? new AwsStorageProvider()
          new LocalDiskStorageProvider();
  }

  async uploadFile(
    file: Express.Multer.File,
    resource_type: resourceTypes,
    folder: string,
  ) {
    const filename = Helpers.generateUniqueFilename(file.originalname);
    return this.fileSystemProvider.uploadFile(file, resource_type, folder);
  }

  async deleteFile(filename: any) {
    // Delete the file using the storage provider
    // await this.storageProvider.deleteFile(filename);
  }
}

export default FileUploadService;
