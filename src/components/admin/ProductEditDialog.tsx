import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | string[];
  category: string;
  inStock: boolean;
  rating?: number;
  stock?: number;
}

interface ProductEditDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductEditDialog = ({ product, open, onOpenChange }: ProductEditDialogProps) => {
  const { updateProduct } = useShopStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    category: product?.category || "",
    stock: product?.stock || 0,
    inStock: product?.inStock || true
  });

  const categories = ["Instruments", "GPS", "Logiciels", "Scanning", "Drones"];

  const handleSave = () => {
    if (!product) return;
    
    updateProduct(product.id, {
      ...formData,
      inStock: formData.stock > 0
    });
    
    toast({
      title: "✅ Produit modifié",
      description: `${formData.name} a été mis à jour avec succès`,
    });
    
    onOpenChange(false);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>Modifier le produit</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};