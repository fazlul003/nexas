export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  requiresPasswordChange: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
  stock: number;
  specs: Record<string, string>;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  excerpt: string;
  date: string;
}

export interface SiteSettings {
  siteName: string;
  primaryColor: string;
  address: string;
  supportEmail: string;
  homepageHeroTitle: string;
  homepageHeroSubtext: string;
  maintenanceMode: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}