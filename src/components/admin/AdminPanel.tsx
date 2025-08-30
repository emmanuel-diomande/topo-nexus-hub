import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, ShoppingCart, BarChart3, Settings, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    image: "/placeholder.svg"
  });
  
  const { addProduct } = useShopStore();
  const { toast } = useToast();

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      addProduct({
        id: Date.now().toString(),
        ...newProduct,
        inStock: true,
        rating: 0
      });
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        image: "/placeholder.svg"
      });
      setIsAddProductOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Administration</h1>
            <p className="text-xl opacity-90">Gérez votre boutique et vos services</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/accueil')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Gestion des Stocks</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin/stocks')}
                className="flex items-center justify-between w-full p-6 h-auto text-left"
              >
                <div className="flex items-center">
                  <Package className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Gérer les stocks</div>
                    <div className="text-sm opacity-80">Inventaire et approvisionnement</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader>
              <CardTitle className="text-secondary">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin/commandes')}
                className="flex items-center justify-between w-full p-6 h-auto text-left"
              >
                <div className="flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Voir les commandes</div>
                    <div className="text-sm opacity-80">Suivi des ventes</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="text-accent">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/admin/statistiques')}
                className="flex items-center justify-between w-full p-6 h-auto text-left"
              >
                <div className="flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Statistiques</div>
                    <div className="text-sm opacity-80">Analyses et performances</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center justify-between w-full p-6 h-auto text-left">
                    <div className="flex items-center">
                      <Plus className="w-6 h-6 mr-3" />
                      <div>
                        <div className="font-semibold">Ajouter un produit</div>
                        <div className="text-sm opacity-80">Nouveau produit au catalogue</div>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nom du produit</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="Nom du produit"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instruments">Instruments</SelectItem>
                          <SelectItem value="GPS">GPS</SelectItem>
                          <SelectItem value="Logiciels">Logiciels</SelectItem>
                          <SelectItem value="Scanning">Scanning</SelectItem>
                          <SelectItem value="Drones">Drones</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Description du produit"
                      />
                    </div>
                    <Button onClick={handleAddProduct} className="w-full">
                      Ajouter le produit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;