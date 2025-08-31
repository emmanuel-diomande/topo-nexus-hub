import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Category, api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CategoryManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoryManageDialog = ({ open, onOpenChange }: CategoryManageDialogProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories();
      setCategories(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les catégories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est requis",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.createCategory(newCategory);
      setNewCategory({ name: "", description: "" });
      setIsCreating(false);
      fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie créée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la catégorie",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !editingCategory.name.trim()) return;

    try {
      await api.updateCategory(editingCategory.id, {
        name: editingCategory.name,
        description: editingCategory.description,
      });
      setEditingCategory(null);
      fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie mise à jour avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la catégorie",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return;

    try {
      await api.deleteCategory(id);
      fetchCategories();
      toast({
        title: "Succès",
        description: "Catégorie supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la catégorie",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestion des Catégories</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create New Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nouvelle Catégorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isCreating ? (
                <Button onClick={() => setIsCreating(true)} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une catégorie
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-name">Nom *</Label>
                    <Input
                      id="new-name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="Nom de la catégorie"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-description">Description</Label>
                    <Textarea
                      id="new-description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Description de la catégorie"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateCategory}>
                      <Save className="w-4 h-4 mr-2" />
                      Créer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setIsCreating(false);
                        setNewCategory({ name: "", description: "" });
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Categories List */}
          <Card>
            <CardHeader>
              <CardTitle>Catégories Existantes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Chargement...</div>
              ) : categories.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  Aucune catégorie trouvée
                </div>
              ) : (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4">
                      {editingCategory?.id === category.id ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`edit-name-${category.id}`}>Nom *</Label>
                            <Input
                              id={`edit-name-${category.id}`}
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({ 
                                ...editingCategory, 
                                name: e.target.value 
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-description-${category.id}`}>Description</Label>
                            <Textarea
                              id={`edit-description-${category.id}`}
                              value={editingCategory.description || ""}
                              onChange={(e) => setEditingCategory({ 
                                ...editingCategory, 
                                description: e.target.value 
                              })}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleUpdateCategory}>
                              <Save className="w-4 h-4 mr-2" />
                              Sauvegarder
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setEditingCategory(null)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Annuler
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{category.name}</Badge>
                            </div>
                            {category.description && (
                              <p className="text-sm text-muted-foreground">
                                {category.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingCategory(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
