export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};

declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (
        config: CloudinaryUploadWidgetConfig,
        callback: CloudinaryUploadWidgetCallback
      ) => {
        open: () => void;
        close: () => void;
        destroy: () => void;
      };
    };
  }
}

interface CloudinaryUploadWidgetConfig {
  cloudName: string;
  uploadPreset: string;
  sources?: string[];
  multiple?: boolean;
  cropping?: boolean;
  croppingAspectRatio?: number;
  folder?: string;
  maxFileSize?: number;
  maxImageFileSize?: number;
  maxImageWidth?: number;
  maxImageHeight?: number;
  themes?: {
    palette?: {
      window?: string;
      sourceBg?: string;
      windowBorder?: string;
      tabIcon?: string;
      inactiveTabIcon?: string;
      menuIcons?: string;
      link?: string;
      action?: string;
      inProgress?: string;
      complete?: string;
      error?: string;
      textDark?: string;
      textLight?: string;
    };
  };
}

interface CloudinaryError {
  message?: string;
  http_code?: number;
}

interface CloudinaryUploadWidgetCallback {
  (
    error: CloudinaryError | null,
    result: {
      event?: string;
      info?: {
        secure_url?: string;
        public_id?: string;
        width?: number;
        height?: number;
        format?: string;
        resource_type?: string;
        created_at?: string;
        bytes?: number;
        type?: string;
        etag?: string;
        placeholder?: boolean;
        url?: string;
        asset_id?: string;
        version_id?: string;
        version?: number;
        signature?: string;
        folder?: string;
        api_key?: string;
      };
    }
  ): void;
}

export const openAvatarUpload = (
  onSuccess: (url: string) => void,
  onError?: (error: CloudinaryError | string) => void
) => {
  if (!window.cloudinary) {
    console.error('Cloudinary widget not loaded');
    onError?.('Cloudinary widget not loaded');
    return;
  }

  if (!CLOUDINARY_CONFIG.cloudName || !CLOUDINARY_CONFIG.uploadPreset) {
    console.error('Cloudinary configuration missing');
    onError?.('Cloudinary configuration missing');
    return;
  }

  const widget = window.cloudinary.openUploadWidget(
    {
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
      sources: ['local', 'camera'],
      multiple: false,
      cropping: true,
      croppingAspectRatio: 1,
      folder: 'avatars',
      maxFileSize: 5000000, // 5MB
      maxImageFileSize: 5000000, // 5MB
      maxImageWidth: 1000,
      maxImageHeight: 1000,
      themes: {
        palette: {
          window: '#FFFFFF',
          sourceBg: '#F7FAFC',
          windowBorder: '#E2E8F0',
          tabIcon: '#4A5568',
          inactiveTabIcon: '#A0AEC0',
          menuIcons: '#4A5568',
          link: '#3182CE',
          action: '#3182CE',
          inProgress: '#3182CE',
          complete: '#38A169',
          error: '#E53E3E',
          textDark: '#2D3748',
          textLight: '#FFFFFF',
        },
      },
    },
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        onError?.(error);
        return;
      }

      if (result?.event === 'success' && result.info?.secure_url) {
        console.log('Avatar uploaded successfully:', result.info.secure_url);
        onSuccess(result.info.secure_url);
      }
    }
  );

  return widget;
};
