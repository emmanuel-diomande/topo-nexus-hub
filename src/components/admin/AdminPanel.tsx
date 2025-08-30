import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Package, ShoppingCart, BarChart3, Settings, ArrowRight, ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AdminPanel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    stock: 0
  });
  
  const { addProduct } = useShopStore();
  const { toast } = useToast();

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      let imageUrls: string[] = [];
      
      if (selectedImages.length > 0) {
        imageUrls = await api.uploadMultipleImages(selectedImages);
      }
      
      return api.createProduct({
        ...productData,
        image: imageUrls,
        inStock: productData.stock > 0
      });
    },
    onSuccess: (data) => {
      addProduct(data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté avec succès.",
      });
      setNewProduct({
        name: "",
        price: 0,
        description: "",
        category: "",
        stock: 0
      });
      setSelectedImages([]);
      setIsAddProductOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du produit.",
        variant: "destructive"
      });
    }
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      createProductMutation.mutate(newProduct);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
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
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock initial</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                        placeholder="Quantité en stock"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="images">Images (multiples)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="flex-1"
                        />
                        <Upload className="w-4 h-4" />
                      </div>
                      {selectedImages.length > 0 && (
                        <p className="text-sm text-muted-foreground">
                          {selectedImages.length} image(s) sélectionnée(s)
                        </p>
                      )}
                    </div>
                    <Button 
                      onClick={handleAddProduct} 
                      className="w-full"
                      disabled={createProductMutation.isPending}
                    >
                      {createProductMutation.isPending ? "Ajout en cours..." : "Ajouter le produit"}
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