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
}

interface ShopStore {
  products: Product[];
  cart: Product[];
  setProducts: (products: Product[]) => void;
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
    companyName: 'TopoNexus',
    slogan: 'Votre partenaire en topographie et services techniques',
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

export const useShopStore = create<ShopStore>((set) => ({
  products: [],
  cart: [],
  setProducts: (products) => set({ products }),
  addToCart: (product) => set((state) => ({ 
    cart: [...state.cart, product] 
  })),
  removeFromCart: (productId) => set((state) => ({ 
    cart: state.cart.filter(item => item.id !== productId) 
  })),
  clearCart: () => set({ cart: [] }),
}));