import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

type MetadataProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: MetadataProps) {
  await connectDB();

  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.content?.slice(0, 160),
    openGraph: {
      images: post.image ? [post.image] : [],
    },
  };
}
