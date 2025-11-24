import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MockDB } from '../../services/mockDb';
import { useAppContext } from '../../App';
import { Product } from '../../types';
import Meta from '../../components/Meta';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      const found = MockDB.getProductBySlug(slug);
      if (found) setProduct(found);
      else navigate('/');
    }
  }, [slug, navigate]);

  if (!product) return <div>Loading...</div>;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.images,
    "description": product.description,
    "sku": product.id,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "USD",
      "price": product.salePrice || product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="py-12 bg-white">
      <Meta title={product.title} description={product.description} schema={schema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-2xl overflow-hidden">
              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`View ${idx}`} className="rounded-lg cursor-pointer hover:opacity-75" />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
                ))}
              </div>
              <span className="ml-2 text-gray-500">({product.reviewsCount} reviews)</span>
            </div>

            <p className="text-lg text-gray-700 mb-8">{product.description}</p>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && (
                <span className="text-xl text-gray-400 line-through mb-1">${product.price}</span>
              )}
            </div>

            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-[color:var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg mb-8"
            >
              Add to Cart
            </button>

            {/* Specs */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-bold mb-4">Specifications</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b pb-2">
                    <dt className="text-sm font-medium text-gray-500 capitalize">{key}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;