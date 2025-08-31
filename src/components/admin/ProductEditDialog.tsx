import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, Upload, X } from "lucide-react";
import { api, API_BASE_URL, Category } from "@/lib/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: any;
  medias: any;
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
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    inStock: true
  });
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  const { data: apiCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  const categories = apiCategories?.map(cat => cat.name) || [];

  // Preload product data when product changes
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        category: product.category,
        stock: (product.stock || 0).toString(),
        inStock: product.inStock
      });
      
      // Handle existing images
      const images = Array.isArray(product.medias) ? product.medias : product.medias ? [product.medias] : [];
      setExistingImages(images);
      setSelectedImages([]);
      setImagesToRemove([]);
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      // 1. Upload new images first if any
      if (selectedImages.length > 0) {
        await api.uploadMultipleImages(selectedImages, product!.id);
        toast({
          title: "✅ Images ajoutées",
          description: `${selectedImages.length} image(s) ajoutée(s) avec succès`,
        });
      }
      
      // 2. Update product data
      const updatedProduct = await api.updateProduct(product!.id, {
        ...productData,
        inStock: productData.stock > 0
      });
      
      return updatedProduct;
    },
    onSuccess: (data) => {
      updateProduct(product!.id, data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "✅ Produit modifié",
        description: `${formData.name} a été mis à jour avec succès`,
      });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification du produit.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    if (!product || !formData.name || !formData.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    updateProductMutation.mutate({
      ...formData,
      price: Number(formData.price) || 0,
      stock: Number(formData.stock) || 0
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleRemoveExistingImage = async (imageObj: any) => {
    try {
      const mediaId = imageObj?.id || imageObj;
      if (mediaId) {
        await api.deleteMedia(mediaId);
        setExistingImages(existingImages.filter(img => img !== imageObj));
        toast({
          title: "✅ Image supprimée",
          description: "L'image a été supprimée avec succès",
        });
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
      toast({
        title: "❌ Erreur",
        description: "Impossible de supprimer l'image",
        variant: "destructive",
      });
    }
  };

  const handleRestoreImage = (imageUrl: string) => {
    setImagesToRemove(imagesToRemove.filter(img => img !== imageUrl));
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
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
            <Label htmlFor="price">Prix (Fcfa)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
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
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
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
          
          {/* Images existantes */}
          {existingImages.length > 0 && (
            <div className="space-y-2">
              <Label>Images actuelles</Label>
              <div className="grid grid-cols-2 gap-2">
                {existingImages.map((imageUrl:any, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={ API_BASE_URL + imageUrl?.url} 
                      alt={`Image ${index + 1}`}
                      className={`w-full h-24 object-cover rounded border ${
                        imagesToRemove.includes(imageUrl) ? 'opacity-50 grayscale' : ''
                      }`}
                    />
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {imagesToRemove.includes(imageUrl) ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleRestoreImage(imageUrl)}
                          className="h-6 w-6 p-0"
                        >
                          ↶
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveExistingImage(imageUrl)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Nouvelles images */}
          <div className="space-y-2">
            <Label htmlFor="images">Ajouter de nouvelles images</Label>
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
                {selectedImages.length} nouvelle(s) image(s) sélectionnée(s)
              </p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={updateProductMutation.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              {updateProductMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
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