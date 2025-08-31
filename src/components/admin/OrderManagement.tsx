import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Calendar, Euro, User, Package, Truck, CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { Order } from "@/lib/api";


const OrderManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', variant: 'secondary', icon: Clock };
      case 'processing':
        return { label: 'En traitement', variant: 'default', icon: Package };
      case 'shipped':
        return { label: 'Expédiée', variant: 'default', icon: Truck };
      case 'delivered':
        return { label: 'Livrée', variant: 'default', icon: CheckCircle };
      case 'cancelled':
        return { label: 'Annulée', variant: 'destructive', icon: XCircle };
      default:
        return { label: status, variant: 'secondary', icon: Clock };
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    setIsUpdating(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast({
        title: "Statut mis à jour",
        description: `La commande ${orderId} a été mise à jour.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(null);
    }
  };

  const getOrderStats = () => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseInt(order.total.toString(), 10), 0);
    
    return { pending, processing, shipped, totalRevenue };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex orderProducts-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Gestion des Commandes</h1>
            <p className="text-xl opacity-90">Suivez et gérez toutes vos commandes</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-secondary/20">
            <CardContent className="p-6">
              <div className="flex orderProducts-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En attente</p>
                  <p className="text-3xl font-bold text-secondary">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex orderProducts-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">En traitement</p>
                  <p className="text-3xl font-bold text-primary">{stats.processing}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20">
            <CardContent className="p-6">
              <div className="flex orderProducts-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expédiées</p>
                  <p className="text-3xl font-bold text-accent">{stats.shipped}</p>
                </div>
                <Truck className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex orderProducts-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalRevenue.toLocaleString()} Fcfa</p>
                </div>
                <Euro className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex orderProducts-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Liste des Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground">Chargement des commandes...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const statusInfo = getStatusInfo(order.status);
                  const IconComponent = statusInfo.icon;
                  
                  return (
                    <Card key={order.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex orderProducts-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">Commande {order.id}</h3>
                            <div className="flex orderProducts-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex orderProducts-center">
                                <User className="w-4 h-4 mr-1" />
                                {order.customer_name}
                              </div>
                              <div className="flex orderProducts-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex orderProducts-center space-x-4">
                            <Badge variant={statusInfo.variant as any} className="flex orderProducts-center gap-1">
                              <IconComponent className="w-3 h-3" />
                              {statusInfo.label}
                            </Badge>
                            <Select 
                              value={order.status} 
                              onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                              disabled={isUpdating === order.id}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="processing">En traitement</SelectItem>
                                <SelectItem value="shipped">Expédiée</SelectItem>
                                <SelectItem value="delivered">Livrée</SelectItem>
                                <SelectItem value="cancelled">Annulée</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {order.orderProducts.map(item => (
                            <div key={item.product_id} className="flex justify-between orderProducts-center py-2 border-b border-muted">
                              <span>{item.product_name}</span>
                              <span className="text-sm text-muted-foreground">
                                {item.quantity}x {item.price}€ = {item.quantity * item.price}€
                              </span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between orderProducts-center">
                          <span className="text-sm text-muted-foreground">{order.customer_email}</span>
                          <span className="text-xl font-bold text-primary">Total: {order.total.toLocaleString()} Fcfa</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {orders.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground">Aucune commande</h3>
                    <p className="text-sm text-muted-foreground">Les nouvelles commandes apparaîtront ici</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderManagement;