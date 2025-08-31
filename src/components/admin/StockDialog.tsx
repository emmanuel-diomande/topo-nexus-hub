import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Package, Plus, Minus } from "lucide-react";

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

interface StockDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StockDialog = ({ product, open, onOpenChange }: StockDialogProps) => {
  const { updateProduct } = useShopStore();
  const { toast } = useToast();
  
  const [stockValue, setStockValue] = useState(product?.stock || 0);
  const [adjustment, setAdjustment] = useState(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (product) {
      setStockValue(product.stock || 0);
      setAdjustment(0);
    }
  }, [product]);

  const updateStockMutation = useMutation({
    mutationFn: async (newStock: number) => {
      if (!product) throw new Error('No product selected');
      
      return api.updateProduct(product.id, {
        stock: Math.max(0, newStock),
        inStock: newStock > 0
      });
    },
    onSuccess: (data) => {
      const newStock = data.stock || 0;
      updateProduct(product!.id, data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      toast({
        title: "✅ Stock mis à jour",
        description: `Stock de ${product!.name} : ${newStock} unités`,
      });
      
      setStockValue(newStock);
      setAdjustment(0);
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Failed to update stock:', error);
      toast({
        title: "❌ Erreur",
        description: "Impossible de mettre à jour le stock",
        variant: "destructive",
      });
    }
  });

  const handleStockUpdate = () => {
    if (!product) return;
    
    const newStock = stockValue + adjustment;
    updateStockMutation.mutate(newStock);
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>Gestion du stock</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <h3 className="font-medium">{product.name}</h3>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className="text-sm text-muted-foreground">Stock actuel :</span>
              <Badge variant={product.inStock ? "default" : "destructive"}>
                {stockValue} unités
              </Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="adjustment">Ajustement de stock</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdjustment(Math.max(-stockValue, adjustment - 1))}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                id="adjustment"
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(Number(e.target.value))}
                className="text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAdjustment(adjustment + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {adjustment !== 0 && (
            <div className="text-center p-2 bg-accent/20 rounded">
              <span className="text-sm">
                Nouveau stock : <strong>{stockValue + adjustment} unités</strong>
              </span>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleStockUpdate} 
              className="flex-1" 
              disabled={adjustment === 0 || updateStockMutation.isPending}
            >
              {updateStockMutation.isPending ? "Mise à jour..." : "Mettre à jour"}
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