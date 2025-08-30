import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useShopStore } from "@/stores/useStore";
import { ShoppingCart, X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";
import LazyImage from "@/components/ui/lazy-image";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({ fullName: '', phone: '', address: '' });
  const { cart, removeFromCart, clearCart } = useShopStore();
  const { toast } = useToast();
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleWhatsApp = () => {
    const message = `Bonjour, je souhaite commander les articles suivants:\n\n${cart.map(item => `- ${item.name}: ${item.price.toLocaleString('fr-FR')} €`).join('\n')}\n\nTotal: ${total.toLocaleString('fr-FR')} €`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOrderSubmit = () => {
    if (!orderForm.fullName || !orderForm.phone || !orderForm.address) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Commande envoyée",
      description: "Nous vous contacterons bientôt"
    });
    setIsOrderModalOpen(false);
    setOrderForm({ fullName: '', phone: '', address: '' });
    clearCart();
  };

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
          <div className="ml-auto relative bg-background w-full max-w-2xl min-h-screen overflow-y-auto shadow-xl">
            <div className="p-8 min-h-screen">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
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
                <div className="text-center py-20">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <Card key={item.id} className="border">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          <div className="w-24 h-24 flex-shrink-0">
                            <LazyImage
                              src={Array.isArray(item.image) ? item.image[0] : item.image}
                              alt={item.name}
                              className="w-full h-full rounded-md"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate text-lg mb-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="font-semibold text-primary text-lg">
                                {item.price.toLocaleString('fr-FR')} €
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
                  <div className="pt-8 border-t space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">
                        Total: {total.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <Button className="w-full" size="lg">
                        Commander ({total.toLocaleString('fr-FR')} €)
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