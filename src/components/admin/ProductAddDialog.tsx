import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Upload } from "lucide-react";
import { api, Category } from "@/lib/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

interface ProductAddDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProductAddDialog = ({ open, onOpenChange }: ProductAddDialogProps) => {
  const { addProduct } = useShopStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Modifier le type initial des valeurs numériques
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: ""
  });
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { data: apiCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: api.getCategories
  });

  const categories = apiCategories?.map(cat => cat.name) || [];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom du produit est obligatoire";
    }
    
    if (!formData.category) {
      newErrors.category = "La catégorie est obligatoire";
    }
    
    const price = Number(formData.price);
    if (isNaN(price) || price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "La description est obligatoire";
    }
    
    const stock = Number(formData.stock);
    if (isNaN(stock) || stock < 0) {
      newErrors.stock = "Le stock ne peut pas être négatif";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      // 1. Créer d'abord le produit sans images
      const createdProduct = await api.createProduct({
        ...productData,
        inStock: productData.stock > 0
      });
      
      // 2. Uploader les images avec l'ID du produit créé
      let images: string[] = [];
      if (selectedImages.length > 0) {
         images = await  api.uploadMultipleImages(selectedImages, createdProduct.id);
      }

      createdProduct.image = images;
      
      return createdProduct
    },
    onSuccess: (data) => {
      addProduct(data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "✅ Produit ajouté",
        description: "Le produit a été ajouté avec succès.",
      });
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: ""
      });
      setSelectedImages([]);
      setErrors({});
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du produit.",
        variant: "destructive"
      });
    }
  });

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez corriger les erreurs dans le formulaire.",
        variant: "destructive"
      });
      return;
    }
    
    createProductMutation.mutate({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Ajouter un nouveau produit</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Nom du produit"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({...formData, category: value})}
            >
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Prix (Fcfa) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="0.00"
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="stock">Stock initial</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              placeholder="0"
              className={errors.stock ? "border-red-500" : ""}
            />
            {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Description du produit"
              rows={3}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="images">Images (optionnel)</Label>
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
          
          <div className="flex space-x-2">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={createProductMutation.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              {createProductMutation.isPending ? "Ajout en cours..." : "Ajouter le produit"}
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
