import Image from 'next/image';
import Link from 'next/link';

const BlogPage = async () => {
  // Fetch blog posts from your MongoDB backend
  const posts = [
    {
      _id: '1',
      title: 'The rise of custom controllers in gaming',
      category: 'GAMES',
      author: 'Brian Martins',
      date: 'April 15, 2025',
      image: '/blog/hamster.jpg',
    },
  ];

  const topPicks = [
    {
      id: 1,
      title: 'This vibe? Comfy, confident, and camera-ready',
      category: 'GAMES',
      date: 'April 15, 2025',
      avatar: '/avatars/1.png',
    },
    {
      id: 2,
      title: 'Teen creators are taking over YouTube',
      category: 'TRENDS',
      date: 'April 15, 2025',
      avatar: '/avatars/2.png',
    },
    {
      id: 3,
      title: 'VR is way more fun when you look like this',
      category: 'GAMES',
      date: 'April 15, 2025',
      avatar: '/avatars/3.png',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Main Blog */}
      <div className="md:col-span-2">
        {posts.map((post) => (
          <div key={post._id}>
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <p className="text-green-500 font-medium uppercase text-sm mb-1">{post.category}</p>
            <p className="text-gray-400 text-sm mb-2">by {post.author} • {post.date}</p>
            <h2 className="text-3xl font-bold dark:text-white mb-4">{post.title}</h2>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="space-y-10">
        <div>
          <h3 className="text-xl font-semibold dark:text-white mb-4">Top Picks</h3>
          <ul className="space-y-4">
            {topPicks.map((pick, index) => (
              <li key={pick.id} className="flex gap-4 items-start">
                <span className="text-xl font-bold text-orange-500">{index + 1}</span>
                <Image src={pick.avatar} alt="avatar" width={50} height={50} className="rounded-full" />
                <div>
                  <p className="text-xs text-purple-500 uppercase font-medium">{pick.category}</p>
                  <p className="text-sm text-gray-300 font-semibold">{pick.title}</p>
                  <p className="text-xs text-gray-500">{pick.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold dark:text-white mb-4">Featured</h3>
          <Image src="/blog/featured.png" alt="featured" width={300} height={200} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
