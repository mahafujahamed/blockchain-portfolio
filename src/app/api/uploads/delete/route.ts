import { NextResponse } from 'next/server';
import { cloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  const { publicId } = await req.json();

  await cloudinary.uploader.destroy(publicId);

  return NextResponse.json({ message: 'Deleted' });
}
