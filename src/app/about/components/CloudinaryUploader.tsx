'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { UploadCloud } from 'lucide-react';

type Props = {
  onUpload: (url: string, publicId: string) => void;
  imageUrl?: string;
};

export default function CloudinaryUploader({ onUpload, imageUrl }: Props) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{ multiple: false }}
      onUpload={(result: any) => {
        if (result?.event === 'success') {
          onUpload(result.info.secure_url, result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open()}
          className="cursor-pointer border rounded-xl p-4 flex items-center justify-center flex-col gap-2 hover:shadow-md transition"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Upload"
              width={300}
              height={200}
              className="rounded-xl object-cover"
            />
          ) : (
            <>
              <UploadCloud className="w-10 h-10 text-gray-500" />
              <span className="text-gray-500">Upload Image</span>
            </>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
}
