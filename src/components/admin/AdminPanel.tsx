import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, ShoppingCart, BarChart3, Settings } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
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
    <Card className="mb-8 border-accent">
      <CardHeader>
        <CardTitle className="text-accent flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Panneau d'Administration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un produit
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
                  <Label htmlFor="price">Prix (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                    placeholder="Prix"
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

          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => window.open('/stocks', '_blank')}
          >
            <Package className="w-4 h-4 mr-2" />
            Gérer les stocks
          </Button>
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => window.open('/commandes', '_blank')}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Voir les commandes
          </Button>
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={() => toast({
              title: "Statistiques",
              description: "Dashboard statistiques disponible bientôt.",
            })}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Statistiques
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;