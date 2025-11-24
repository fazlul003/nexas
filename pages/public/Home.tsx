import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../App';
import { MockDB } from '../../services/mockDb';
import { Product } from '../../types';
import Meta from '../../components/Meta';

const Home: React.FC = () => {
  const { settings, addToCart } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState(MockDB.getPosts());

  useEffect(() => {
    setProducts(MockDB.getProducts());
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Meta 
        title="Home" 
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": settings.siteName,
          "url": window.location.href
        }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-[color:var(--color-primary)] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 animate-fade-in-up">
            {settings.homepageHeroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {settings.homepageHeroSubtext}
          </p>
          <div className="flex justify-center gap-4">
            <a href="#shop" className="bg-white text-[color:var(--color-primary)] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
              Shop Now
            </a>
            <a href="#collections" className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition duration-300">
              View Offers
            </a>
          </div>
        </div>
      </section>

      {/* Categories Intro */}
      <section id="collections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 rounded-2xl p-8 shadow-sm">
            <div className="w-full md:w-1/2">
              <img src="https://picsum.photos/600/400?random=10" alt="Electronics" className="rounded-xl w-full object-cover h-64 shadow-md" loading="lazy" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 font-heading text-gray-900">Electronics</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Discover the latest electronic devices with trusted quality and great prices.
              </p>
              <Link to="/product/smart-phone-x200" className="text-[color:var(--color-primary)] font-semibold hover:underline">
                Explore Collection <i className="fa-solid fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900">Trending Items</h2>
              <p className="text-gray-500 mt-2">Handpicked best sellers just for you.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  {product.salePrice && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-[color:var(--color-primary)] truncate">{product.title}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                       {product.salePrice ? (
                         <div className="flex items-center gap-2">
                           <span className="text-xl font-bold text-gray-900">${product.salePrice}</span>
                           <span className="text-sm text-gray-400 line-through">${product.price}</span>
                         </div>
                       ) : (
                         <span className="text-xl font-bold text-gray-900">${product.price}</span>
                       )}
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-[color:var(--color-primary)] hover:text-white transition-colors"
                      title="Add to Cart"
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {posts.map(post => (
                <div key={post.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-xl mb-4">
                     <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[color:var(--color-primary)]">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                </div>
             ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;