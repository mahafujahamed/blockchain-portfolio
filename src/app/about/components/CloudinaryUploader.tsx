'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  sources?: string[];
  multiple?: boolean;
  cropping?: boolean;
  defaultSource?: string;
  styles?: object;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
    [key: string]: unknown;
  };
}

interface CloudinaryUploaderProps {
  onUpload: (url: string) => void;
  uploadPreset: string;
}

export default function CloudinaryUploader({
  onUpload,
  uploadPreset,
}: CloudinaryUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = () => {
    if (!window.cloudinary || !window.cloudinary.createUploadWidget) return;

    const widgetOptions: CloudinaryWidgetOptions = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
      uploadPreset,
      sources: ['local', 'url', 'camera'],
      multiple: false,
      cropping: false,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#ffffff',
          sourceBg: '#f4f4f5',
          windowBorder: '#90a0b3',
          tabIcon: '#0078FF',
          inactiveTabIcon: '#69778A',
          menuIcons: '#555a5f',
          link: '#0078FF',
          action: '#FF620C',
          inProgress: '#0078FF',
          complete: '#20B832',
          error: '#c43737',
          textDark: '#000000',
          textLight: '#ffffff',
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
            active: true,
          },
        },
      },
    };

    const widget = window.cloudinary.createUploadWidget(
      widgetOptions,
      (error: unknown, result?: CloudinaryUploadResult) => {
        if (!error && result?.event === 'success') {
          const secureUrl = result.info.secure_url;
          setImageUrl(secureUrl);
          onUpload(secureUrl);
        }
      }
    );

    widget.open();
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={handleUpload}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Upload Image
      </button>

      {imageUrl && (
        <div className="relative w-64 h-40 rounded-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="Uploaded"
            layout="fill"
            objectFit="cover"
            className="rounded shadow"
            priority
          />
        </div>
      )}
    </div>
  );
}
