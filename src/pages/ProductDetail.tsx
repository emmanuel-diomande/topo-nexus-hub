import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopStore } from "@/stores/useStore";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Shield, Truck, HeadphonesIcon, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LazyImage from "@/components/ui/lazy-image";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useShopStore();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

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

  if (!product) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Produit introuvable</h2>
          <p className="text-muted-foreground mb-4">Le produit que vous recherchez n'existe pas.</p>
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
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <LazyImage
                src={Array.isArray(product.image) ? product.image[0] : product.image}
                alt={product.name}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
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
                    {product.price.toLocaleString('fr-FR')} €
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

        {/* Detailed Information */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="description">Description détaillée</TabsTrigger>
            <TabsTrigger value="reviews">Avis clients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Spécifications techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specifications[product.name] && Object.entries(specifications[product.name] as Record<string, string>).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="description" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Description détaillée</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {product.name} est un équipement professionnel de haute précision conçu pour répondre aux besoins 
                  des géomètres, topographes et professionnels du BTP. Cet instrument allie performances exceptionnelles 
                  et facilité d'utilisation pour des mesures fiables sur le terrain.
                </p>
                <p className="text-muted-foreground">
                  Développé avec les dernières technologies du secteur, il garantit une précision millimétrique 
                  et une productivité optimale pour tous vos projets d'arpentage, de construction et d'aménagement.
                </p>
                <div className="bg-gradient-card p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Points forts :</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Précision exceptionnelle pour des mesures fiables</li>
                    <li>• Interface intuitive et ergonomique</li>
                    <li>• Construction robuste pour usage intensif</li>
                    <li>• Compatibilité avec logiciels professionnels</li>
                    <li>• Support technique expert inclus</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Avis clients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    name: "Pierre L.",
                    rating: 5,
                    comment: "Excellent produit, très précis et robuste. Je le recommande vivement.",
                    date: "15 mars 2024"
                  },
                  {
                    name: "Marie D.", 
                    rating: 4,
                    comment: "Bon rapport qualité-prix, l'interface est intuitive.",
                    date: "8 mars 2024"
                  },
                  {
                    name: "Jean C.",
                    rating: 5,
                    comment: "Parfait pour nos besoins professionnels, livraison rapide.",
                    date: "2 mars 2024"
                  }
                ].map((review, index) => (
                  <div key={index} className="border-b border-muted pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{review.name}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < review.rating 
                                  ? "text-accent fill-current" 
                                  : "text-muted-foreground"
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => navigate(`/produit/${relatedProduct.id}`)}>
                  <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                    <LazyImage
                      src={Array.isArray(relatedProduct.image) ? relatedProduct.image[0] : relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold text-primary">
                      {relatedProduct.price.toLocaleString('fr-FR')} €
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;