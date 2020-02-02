import AzureStorage, { BlobService } from 'azure-storage';
require('dotenv').config();

const {
  STORAGE_ACCOUNT,
  STORAGE_KEY,
} = process.env;

export const blobService = AzureStorage.createBlobService(
  STORAGE_ACCOUNT,
  STORAGE_KEY,
);

export const uploadFileToAzureBlobFromFile = (
  file: string,
  destFile: string,
  destDir: string,
): Promise<BlobService.BlobResult> => {
  return new Promise(function(resolve, reject) {
    blobService.createBlockBlobFromLocalFile(destDir, destFile, file, function(
      error,
      resultUpload,
    ) {
      if (!error) {
        resolve(resultUpload);
        return;
      }
      reject(error);
    });
  });
};

export const deleteFileFromAzureBlob = (
  destFile: string,
  destDir: string,
): Promise<boolean> => {
  return new Promise(function(resolve, reject) {
    blobService.deleteBlobIfExists(destDir, destFile, function(
      error,
      resultUpload,
    ) {
      if (!error) {
        resolve(resultUpload);
        return;
      }
      reject(error);
    });
  });
};
