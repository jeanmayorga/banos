interface CloudinaryInfo {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  coordinates: {
    custom: number[][];
  };
  original_filename: string;
  path: string;
  thumbnail_url: string;
}

interface CloudinaryOptions {
  cloudName: string;
  uploadPreset: string;
  cropping: boolean;
  croppingAspectRatio: number;
  sources: string[];
}

interface CloudinaryWidget {
  open: (ar?: any, ar2?: ant) => void;
}

interface CloudinaryResult {
  event: string;
  info: CloudinaryInfo;
}

export declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: CloudinaryOptions,
        callback: (error: Error | null, result: CloudinaryResult) => void,
      ) => CloudinaryWidget;
    };
  }
}
