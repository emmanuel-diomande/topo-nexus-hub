import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { Product, API_BASE_URL } from "@/lib/api";

interface CardProduitProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isAdminMode?: boolean;
  isAuthenticated?: boolean;
  onEdit?: (product: Product) => void;
  onStock?: (product: Product) => void;
}

export const CardProduit = ({ 
  product, 
  onAddToCart, 
  isAdminMode = false, 
  isAuthenticated = false,
  onEdit,
  onStock 
}: CardProduitProps) => {
  return (
    <Card 
      key={product.id} 
      className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
      onClick={() => window.location.href = `/produit/${product.id}`}
    >
      <CardContent className="p-0">
        <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
          <img 
            src={API_BASE_URL + (Array.isArray(product.medias) ? product.medias[0]?.url : product.medias?.url)} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <Badge variant="secondary">{product.category}</Badge>
            {!product.inStock && (
              <Badge variant="destructive">Rupture</Badge>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/produit/${product.id}`;
                }}>
              {product.name} 
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating || 0) 
                        ? "text-accent fill-current" 
                        : "text-muted-foreground"
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating}/5
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-2xl font-bold text-primary">
              {product.price.toLocaleString('fr-FR')} FCFA
            </span>
            
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={!product.inStock}
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? "Panier" : "Indisponible"}
            </Button>
          </div>

          {isAdminMode && isAuthenticated && (
            <div className="flex space-x-2 pt-2 border-t border-accent/20">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(product);
                }}
              >
                Modifier
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onStock?.(product);
                }}
              >
                Stock
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
