'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';

type CloudinaryUploadResult = {
  event: string;
  info: {
    secure_url: string;
    public_id: string;
  };
};

export default function CloudinaryUploader({ onUpload }: { onUpload: (url: string, id: string) => void }) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{ multiple: false }}
      onUpload={(result: CloudinaryUploadResult) => {
        onUpload(result.info.secure_url, result.info.public_id);
      }}
    >
      {({ open }) => (
        <Button type="button" onClick={() => open()}>
          Upload Image
        </Button>
      )}
    </CldUploadWidget>
  );
}
