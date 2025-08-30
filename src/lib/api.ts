const API_BASE_URL = 'https://api.oeil-du-topo-consulting.com';

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// API Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  inStock: boolean;
  rating?: number;
  stock?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface StockUpdate {
  product_id: string;
  quantity: number;
}

export interface Statistics {
  total_products: number;
  total_orders: number;
  total_revenue: number;
  low_stock_items: number;
  recent_orders: number;
  monthly_sales: { month: string; amount: number }[];
  top_products: { product_id: string; product_name: string; sales: number }[];
}

// API Functions
export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  async updateStock(stockUpdate: StockUpdate): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${stockUpdate.product_id}/stock`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ quantity: stockUpdate.quantity }),
    });
    if (!response.ok) throw new Error('Failed to update stock');
    return response.json();
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },

  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...getAuthHeaders()
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Statistics
  async getStatistics(): Promise<Statistics> {
    const response = await fetch(`${API_BASE_URL}/statistics`);
    if (!response.ok) throw new Error('Failed to fetch statistics');
    return response.json();
  },

  // Upload images
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload image');
    const data = await response.json();
    return data.url;
  },

  async uploadMultipleImages(files: File[]): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload images');
    const data = await response.json();
    return data.urls;
  }
};