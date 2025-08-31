import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, ShoppingCart, BarChart3, ArrowRight, ArrowLeft, FolderOpen } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductAddDialog } from "./ProductAddDialog";
import { CategoryManageDialog } from "./CategoryManageDialog";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isCategoryManageOpen, setIsCategoryManageOpen] = useState(false);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

          <Card className="border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-orange-500">Catégories</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setIsCategoryManageOpen(true)}
                className="flex items-center justify-between w-full p-6 h-auto text-left"
              >
                <div className="flex items-center">
                  <FolderOpen className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Gérer les catégories</div>
                    <div className="text-sm opacity-80">Créer, modifier, supprimer</div>
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
              <Button 
                onClick={() => setIsAddProductOpen(true)}
                className="flex items-center justify-between w-full p-6 h-auto text-left"
              >
                <div className="flex items-center">
                  <Plus className="w-6 h-6 mr-3" />
                  <div>
                    <div className="font-semibold">Ajouter un produit</div>
                    <div className="text-sm opacity-80">Nouveau produit au catalogue</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProductAddDialog 
        open={isAddProductOpen} 
        onOpenChange={setIsAddProductOpen} 
      />
      
      <CategoryManageDialog 
        open={isCategoryManageOpen} 
        onOpenChange={setIsCategoryManageOpen} 
      />
    </div>
  );
};

export default AdminPanel;