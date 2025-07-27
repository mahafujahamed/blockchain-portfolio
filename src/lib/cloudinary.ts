import { v2 as cloudinary } from 'cloudinary'

interface CloudinaryConfig {
  cloud_name: string
  api_key: string
  api_secret: string
}

const config: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
}

cloudinary.config(config)

export { cloudinary }
