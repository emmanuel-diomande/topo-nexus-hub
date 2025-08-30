import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Package, Star, TrendingUp, Edit, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, setProducts } = useShopStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const product = products.find(p => p.id === id);
  const [editedProduct, setEditedProduct] = useState(product || {
    id: '',
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    inStock: false
  });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Produit non trouvé</h2>
          <Button onClick={() => navigate('/admin')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour Administration
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const updatedProducts = products.map(p => 
      p.id === id ? { ...p, ...editedProduct } : p
    );
    setProducts(updatedProducts);
    setIsEditing(false);
    toast({
      title: "Produit mis à jour",
      description: "Les modifications ont été sauvegardées avec succès.",
    });
  };

  const salesData = [
    { month: "Jan", sales: 5 },
    { month: "Fév", sales: 8 },
    { month: "Mar", sales: 12 },
    { month: "Avr", sales: 7 },
    { month: "Mai", sales: 15 },
    { month: "Juin", sales: 10 }
  ];

  const reviews = [
    {
      id: 1,
      customer: "Jean Dupont",
      rating: 5,
      comment: "Excellent produit, très précis et fiable. Je le recommande vivement.",
      date: "2024-01-15"
    },
    {
      id: 2,
      customer: "Marie Martin",
      rating: 4,
      comment: "Bon rapport qualité-prix, livraison rapide.",
      date: "2024-01-10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Détail du Produit</h1>
            <p className="text-xl opacity-90">Gestion et analyse détaillée</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour Administration
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations produit */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-primary">Informations du produit</CardTitle>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom du produit</Label>
                    {isEditing ? (
                      <Input 
                        id="name"
                        value={editedProduct.name || ''}
                        onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-lg font-semibold">{product.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    {isEditing ? (
                      <Select 
                        value={editedProduct.category}
                        onValueChange={(value) => setEditedProduct({...editedProduct, category: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instruments">Instruments</SelectItem>
                          <SelectItem value="GPS">GPS</SelectItem>
                          <SelectItem value="Logiciels">Logiciels</SelectItem>
                          <SelectItem value="Scanning">Scanning</SelectItem>
                          <SelectItem value="Drones">Drones</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="secondary">{product.category}</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea 
                      id="description"
                      value={editedProduct.description || ''}
                      onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <p className="text-muted-foreground">{product.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Prix</Label>
                    {isEditing ? (
                      <Input 
                        id="price"
                        type="text"
                        value="Sur devis"
                        disabled
                      />
                    ) : (
                      <p className="text-2xl font-bold text-primary">Sur devis</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    {isEditing ? (
                      <Input 
                        id="stock"
                        type="number"
                        value={editedProduct.stock || 0}
                        onChange={(e) => setEditedProduct({...editedProduct, stock: parseInt(e.target.value)})}
                      />
                    ) : (
                      <p className="text-lg font-semibold">{product.stock || 0} unités</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Note moyenne</Label>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating || 0) 
                                ? "text-accent fill-current" 
                                : "text-muted-foreground"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating || 0}/5
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Historique des ventes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-primary">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Historique des ventes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{data.month} 2024</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{data.sales} ventes</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(data.sales / 15) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image produit */}
            <Card>
              <CardContent className="p-6">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img 
                    src={Array.isArray(product.image) ? product.image[0] : product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge variant={product.inStock ? "default" : "destructive"} className="w-full justify-center">
                  {product.inStock ? "En stock" : "Rupture de stock"}
                </Badge>
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vues totales</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ventes totales</span>
                  <span className="font-semibold">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taux conversion</span>
                  <span className="font-semibold">5.4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenus générés</span>
                  <span className="font-semibold text-primary">Sur devis</span>
                </div>
              </CardContent>
            </Card>

            {/* Avis clients */}
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Avis clients récents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{review.customer}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < review.rating 
                                ? "text-accent fill-current" 
                                : "text-muted-foreground"
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{review.comment}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;