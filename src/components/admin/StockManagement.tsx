import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Package, AlertTriangle, CheckCircle, Plus, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const StockManagement = () => {
  const { products, setProducts } = useShopStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProducts = products.map(product => 
      product.id === productId 
        ? { ...product, stock: newStock, inStock: newStock > 0 }
        : product
    );
    setProducts(updatedProducts);
    toast({
      title: "Stock mis à jour",
      description: `Stock modifié avec succès.`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé du catalogue.",
      variant: "destructive"
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Rupture", variant: "destructive", icon: AlertTriangle };
    if (stock < 5) return { label: "Faible", variant: "secondary", icon: AlertTriangle };
    return { label: "En stock", variant: "default", icon: CheckCircle };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Gestion des Stocks</h1>
            <p className="text-xl opacity-90">Gérez votre inventaire en temps réel</p>
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
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Produits</p>
                    <p className="text-3xl font-bold text-primary">{products.length}</p>
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">En Stock</p>
                    <p className="text-3xl font-bold text-accent">
                      {products.filter(p => p.inStock).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-destructive/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rupture</p>
                    <p className="text-3xl font-bold text-destructive">
                      {products.filter(p => !p.inStock).length}
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Inventaire des Produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map(product => {
                const stockInfo = getStockStatus(product.stock || 0);
                const IconComponent = stockInfo.icon;
                
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant={stockInfo.variant as any} className="flex items-center gap-1">
                        <IconComponent className="w-3 h-3" />
                        {stockInfo.label}
                      </Badge>
                      
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`stock-${product.id}`} className="text-sm">Stock:</Label>
                        <Input
                          id={`stock-${product.id}`}
                          type="number"
                          min="0"
                          defaultValue={product.stock || 0}
                          className="w-20"
                          onBlur={(e) => handleStockUpdate(product.id, parseInt(e.target.value) || 0)}
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingProduct(product);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground">Aucun produit en stock</h3>
                  <p className="text-sm text-muted-foreground">Ajoutez des produits depuis le panneau d'administration</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockManagement;