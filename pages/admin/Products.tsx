import React, { useEffect, useState } from 'react';
import { MockDB } from '../../services/mockDb';
import { Product } from '../../types';
import Meta from '../../components/Meta';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    setProducts(MockDB.getProducts());
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      MockDB.deleteProduct(id);
      setProducts(MockDB.getProducts());
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      id: `p${Date.now()}`,
      images: ['https://picsum.photos/400/400'],
      specs: {},
      stock: 10,
      rating: 5,
      reviewsCount: 0,
      createdAt: new Date().toISOString()
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.title && currentProduct.price) {
      // Basic slug generation
      const slug = currentProduct.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const finalProduct = { ...currentProduct, slug } as Product;
      
      MockDB.saveProduct(finalProduct);
      setProducts(MockDB.getProducts());
      setIsEditing(false);
    }
  };

  return (
    <div>
      <Meta title="Manage Products" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <i className="fa-solid fa-plus mr-2"></i> Add Product
        </button>
      </div>

      {/* Product List */}
      {!isEditing ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="p-4">
                    <img src={product.images[0]} alt="" className="w-10 h-10 rounded object-cover" />
                  </td>
                  <td className="p-4 font-medium">{product.title}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Edit Form */
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
          <h2 className="text-xl font-bold mb-6">{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input required className="w-full border p-2 rounded" value={currentProduct.title || ''} 
                onChange={e => setCurrentProduct({...currentProduct, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input required type="number" className="w-full border p-2 rounded" value={currentProduct.price || ''} 
                  onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sale Price (Optional)</label>
                <input type="number" className="w-full border p-2 rounded" value={currentProduct.salePrice || ''} 
                  onChange={e => setCurrentProduct({...currentProduct, salePrice: parseFloat(e.target.value)})} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full border p-2 rounded" value={currentProduct.category || ''}
                 onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}>
                 <option value="">Select Category</option>
                 <option value="Electronics">Electronics</option>
                 <option value="Fashion">Fashion</option>
                 <option value="Home">Home</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea required className="w-full border p-2 rounded h-32" value={currentProduct.description || ''} 
                onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Product</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Products;