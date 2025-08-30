import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShopStore } from "@/stores/useStore";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import LazyImage from "@/components/ui/lazy-image";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, clearCart } = useShopStore();
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Cart Button */}
      <Button 
        variant="default" 
        size="sm" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Panier
        {cart.length > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center p-0 text-xs"
            variant="destructive"
          >
            {cart.length}
          </Badge>
        )}
      </Button>

      {/* Cart Modal/Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="ml-auto relative bg-background w-full max-w-md h-full overflow-y-auto shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Panier</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Cart Items */}
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="border">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 flex-shrink-0">
                            <LazyImage
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full rounded-md"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-semibold text-primary">
                                Sur devis
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Actions */}
                  <div className="pt-6 border-t space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">
                        Total: Sur devis
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full" size="lg">
                        Demander un devis
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={clearCart}
                      >
                        Vider le panier
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;