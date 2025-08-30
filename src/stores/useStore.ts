import { create } from 'zustand';

interface NavigationStore {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface SiteData {
  companyName: string;
  slogan: string;
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  services: string[];
}

interface SiteStore {
  siteData: SiteData;
  setSiteData: (data: SiteData) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  rating?: number;
  stock?: number;
}

interface ShopStore {
  products: Product[];
  cart: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentPage: 'accueil',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export const useSiteStore = create<SiteStore>((set) => ({
  siteData: {
    companyName: "L'œil du topo",
    slogan: 'La précision au service de vos projets',
    contact: {
      phone: '+33 1 23 45 67 89',
      email: 'contact@toponexus.fr',
      address: '123 Avenue des Géomètres, 75001 Paris, France'
    },
    services: [
      'Topographie',
      'Immobilier',
      'Aménagement foncier',
      'Informatique',
      'Travaux publics',
      'Lotissement',
      'Hydraulique',
      'Transit',
      'Import-Export',
      'Forage'
    ]
  },
  setSiteData: (data) => set({ siteData: data }),
}));

export const useShopStore = create<ShopStore>((set, get) => ({
  products: [],
  cart: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => {
    const currentProducts = get().products;
    set({ products: [...currentProducts, product] });
  },
  addToCart: (product) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find(item => item.id === product.id);
    
    if (existingItem) {
      return;
    }
    
    set({ cart: [...currentCart, product] });
  },
  removeFromCart: (productId) => {
    const currentCart = get().cart;
    set({ cart: currentCart.filter(item => item.id !== productId) });
  },
  clearCart: () => set({ cart: [] }),
}));