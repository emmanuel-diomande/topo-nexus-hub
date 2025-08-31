import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopStore } from "@/stores/useStore";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, HeadphonesIcon, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/lazy-image";
import { useEffect, useState } from "react";
import { API_BASE_URL, Product, api } from "@/lib/api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useShopStore();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await api.getProduct(id);
        setProduct(productData);
        setCurrentImageIndex(0);
      } catch (err) {
        setError('Erreur lors du chargement du produit');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "✅ Produit ajouté !",
        description: `${product.name} a été ajouté à votre panier avec succès.`,
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-foreground">Chargement du produit...</h2>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {error || "Produit introuvable"}
          </h2>
          <p className="text-muted-foreground mb-4">
            {error || "Le produit que vous recherchez n'existe pas."}
          </p>
          <Button onClick={() => navigate('/boutique')}>
            Retour à la boutique
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Shield, title: "Garantie 2 ans", description: "Garantie constructeur incluse" },
    { icon: Truck, title: "Livraison gratuite", description: "Livraison offerte dès 500€" },
    { icon: HeadphonesIcon, title: "Support technique", description: "Assistance 6j/7" },
  ];

  const specifications = {
    "Théodolite électronique DT-209": {
      "Précision angulaire": "5'' (1.5 mgon)",
      "Grossissement": "30x",
      "Portée": "3000m avec prisme",
      "Écran": "LCD couleur 4.3\"",
      "Autonomie": "20h en continu",
      "Poids": "5.2 kg"
    },
    "GPS RTK Leica GS18": {
      "Précision": "8mm H + 15mm V",
      "Constellations": "GPS, GLONASS, Galileo, BeiDou",
      "Portée RTK": "Jusqu'à 15km",
      "Autonomie": "13.5h",
      "Protection": "IP68",
      "Poids": "1.25 kg"
    },
    "Niveau automatique NA320": {
      "Précision": "1.5mm/km",
      "Grossissement": "24x",
      "Portée": "120m",
      "Compensateur": "Magnétique",
      "Diamètre objectif": "36mm",
      "Poids": "1.7 kg"
    },
    "Logiciel AutoCAD Civil 3D": {
      "Version": "2024",
      "Plateforme": "Windows 64-bit",
      "RAM minimum": "16 GB",
      "Espace disque": "18 GB",
      "Licence": "1 an inclus",
      "Support": "Autodesk Knowledge Network"
    },
    "Scanner laser 3D RTC360": {
      "Portée": "130m",
      "Précision": "1.9mm à 10m",
      "Vitesse scan": "2 millions points/sec",
      "Caméra": "HDR 36MP",
      "Autonomie": "5.5h",
      "Poids": "5.35 kg"
    },
    "Drone DJI Phantom RTK": {
      "Précision RTK": "1cm+1ppm H, 1.5cm+1ppm V",
      "Autonomie": "38 minutes",
      "Caméra": "20MP CMOS 1\"",
      "Vitesse": "50 km/h",
      "Résistance vent": "12 m/s",
      "Poids": "1391g"
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/boutique')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la boutique
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <LazyImage
                src={API_BASE_URL + (Array.isArray(product.medias) 
                  ? (product.medias[currentImageIndex]?.url || product.medias[0]?.url)
                  : (product.medias?.url || product.image)
                )}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows for multiple images */}
              {Array.isArray(product.medias) && product.medias.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? product.medias.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === product.medias.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Image thumbnails */}
            {Array.isArray(product.medias) && product.medias.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.medias.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <LazyImage
                      src={API_BASE_URL + media.url}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description.slice(0, 210) + '...'}</p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? "text-accent fill-current" 
                          : "text-muted-foreground"
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating}/5 (127 avis)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="border-t border-b py-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString('fr-FR')} FCFA
                  </span>
                  <p className="text-sm text-muted-foreground mt-1">HT - Livraison incluse</p>
                </div>
                {!product.inStock && (
                  <Badge variant="destructive">Rupture de stock</Badge>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.inStock ? "Ajouter au panier" : "Produit indisponible"}
              </Button>
              
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-3 bg-gradient-card rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-xs font-medium text-foreground">{feature.title}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "Aucune description disponible pour ce produit."}
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;