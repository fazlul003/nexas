import React, { useEffect, useState } from 'react';
import { MockDB } from '../../services/mockDb';
import { BlogPost } from '../../types';
import Meta from '../../components/Meta';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(MockDB.getPosts());
  }, []);

  return (
    <div className="py-12 bg-white">
      <Meta title="Blog" description="Latest news and updates from Arabian Market Store" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold font-heading text-center mb-12">Latest News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map(post => (
            <article key={post.id} className="flex flex-col h-full bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-[color:var(--color-primary)]">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 flex-1">
                  {post.excerpt}
                </p>
                <button className="text-[color:var(--color-primary)] font-semibold hover:underline self-start">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;