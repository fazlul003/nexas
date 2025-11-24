import { User, Product, Order, SiteSettings, UserRole, BlogPost } from '../types';

// Initial Seed Data
const INITIAL_SETTINGS: SiteSettings = {
  siteName: 'Arabian Market Store',
  primaryColor: '#0f172a', // Slate 900
  address: 'Badmintas Road',
  supportEmail: 'support@site.com',
  homepageHeroTitle: 'Welcome to Arabian Market Store',
  homepageHeroSubtext: 'The best products with fast delivery, secure checkout, and premium quality.',
  maintenanceMode: false,
};

const INITIAL_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@site.com',
  passwordHash: 'possward321@', // In real app, this would be bcrypt hashed
  name: 'Super Admin',
  role: UserRole.ADMIN,
  requiresPasswordChange: true, // REQUIREMENT: Force change on first login
  createdAt: new Date().toISOString(),
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Smart Phone X200',
    slug: 'smart-phone-x200',
    description: 'A powerful smartphone with 6.5" display, 50MP camera, and 128GB storage.',
    price: 699,
    category: 'Electronics',
    images: ['https://picsum.photos/400/400?random=1', 'https://picsum.photos/400/400?random=11'],
    stock: 50,
    specs: { screen: '6.5 inch', ram: '8GB', storage: '128GB' },
    rating: 4.8,
    reviewsCount: 120,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Premium Leather Bag',
    slug: 'premium-leather-bag',
    description: 'Handcrafted leather bag perfect for travel and daily use.',
    price: 149,
    salePrice: 129,
    category: 'Fashion',
    images: ['https://picsum.photos/400/400?random=2', 'https://picsum.photos/400/400?random=22'],
    stock: 20,
    specs: { material: 'Leather', color: 'Brown' },
    rating: 4.5,
    reviewsCount: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Wireless Noise Cancelling Headphones',
    slug: 'wireless-headphones',
    description: 'Immersive sound experience with 30-hour battery life.',
    price: 299,
    category: 'Electronics',
    images: ['https://picsum.photos/400/400?random=3'],
    stock: 100,
    specs: { type: 'Over-ear', battery: '30 hours' },
    rating: 4.9,
    reviewsCount: 300,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    title: 'Arabian Coffee Set',
    slug: 'arabian-coffee-set',
    description: 'Traditional porcelain coffee set with gold accents.',
    price: 89,
    category: 'Home',
    images: ['https://picsum.photos/400/400?random=4'],
    stock: 15,
    specs: { pieces: '12', material: 'Porcelain' },
    rating: 5.0,
    reviewsCount: 12,
    createdAt: new Date().toISOString(),
  }
];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 'post1',
    title: 'The Future of Tech in 2024',
    slug: 'future-tech-2024',
    excerpt: 'Explore the upcoming trends in electronics and smart devices.',
    content: 'Full article content here...',
    image: 'https://picsum.photos/800/400?random=5',
    date: new Date().toISOString(),
  }
];

// LocalStorage Keys
const KEYS = {
  SETTINGS: 'ams_settings',
  USERS: 'ams_users',
  PRODUCTS: 'ams_products',
  ORDERS: 'ams_orders',
  POSTS: 'ams_posts',
};

// Database Service
export const MockDB = {
  init: () => {
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify([INITIAL_ADMIN]));
    }
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(KEYS.POSTS)) {
      localStorage.setItem(KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      localStorage.setItem(KEYS.ORDERS, JSON.stringify([]));
    }
  },

  getSettings: (): SiteSettings => {
    return JSON.parse(localStorage.getItem(KEYS.SETTINGS) || JSON.stringify(INITIAL_SETTINGS));
  },

  updateSettings: (settings: SiteSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    // Trigger a custom event to update styles immediately
    window.dispatchEvent(new Event('settings-updated'));
  },

  getProducts: (): Product[] => {
    return JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || '[]');
  },

  getProductBySlug: (slug: string): Product | undefined => {
    const products = MockDB.getProducts();
    return products.find(p => p.slug === slug);
  },

  saveProduct: (product: Product) => {
    const products = MockDB.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  deleteProduct: (id: string) => {
    let products = MockDB.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  },

  getOrders: (): Order[] => {
    return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
  },

  createOrder: (order: Order) => {
    const orders = MockDB.getOrders();
    orders.unshift(order); // Add to top
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  },

  getPosts: (): BlogPost[] => {
    return JSON.parse(localStorage.getItem(KEYS.POSTS) || '[]');
  },

  // Auth Simulation
  findUser: (email: string): User | undefined => {
    const users: User[] = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    return users.find(u => u.email === email);
  },

  updateUser: (user: User) => {
    const users: User[] = JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  }
};