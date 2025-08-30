import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Calendar, Euro, User, Package, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

const OrderManagement = () => {
  const { toast } = useToast();
  
  // Données d'exemple pour les commandes
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      customerName: "Jean Dupont",
      customerEmail: "jean.dupont@email.com",
      date: "2024-01-15",
      status: "pending",
      items: [
        { id: "1", name: "Théodolite numérique", price: 2500, quantity: 1 },
        { id: "2", name: "GPS de précision", price: 1200, quantity: 1 }
      ],
      total: 3700
    },
    {
      id: "ORD-2024-002",
      customerName: "Marie Martin",
      customerEmail: "marie.martin@email.com",
      date: "2024-01-14",
      status: "processing",
      items: [
        { id: "3", name: "Logiciel AutoCAD", price: 800, quantity: 1 }
      ],
      total: 800
    },
    {
      id: "ORD-2024-003",
      customerName: "Pierre Bernard",
      customerEmail: "pierre.bernard@email.com",
      date: "2024-01-13",
      status: "shipped",
      items: [
        { id: "4", name: "Scanner 3D", price: 15000, quantity: 1 },
        { id: "5", name: "Drone topographique", price: 5000, quantity: 1 }
      ],
      total: 20000
    }
  ]);

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} a été mise à jour.`,
    });
  };

  const getOrderStats = () => {
    const pending = orders.filter(o => o.status === 'pending').length;
    const processing = orders.filter(o => o.status === 'processing').length;
    const shipped = orders.filter(o => o.status === 'shipped').length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    
    return { pending, processing, shipped, totalRevenue };
  };

  const stats = getOrderStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Gestion des Commandes</h1>
            <p className="text-xl opacity-90">Suivez et gérez toutes vos commandes</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalRevenue.toLocaleString()}€</p>
                </div>
                <Euro className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Liste des Commandes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                const IconComponent = statusInfo.icon;
                
                return (
                  <Card key={order.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Commande {order.id}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {order.customerName}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(order.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Badge variant={statusInfo.variant as any} className="flex items-center gap-1">
                            <IconComponent className="w-3 h-3" />
                            {statusInfo.label}
                          </Badge>
                          <Select 
                            value={order.status} 
                            onValueChange={(value) => handleStatusChange(order.id, value)}
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
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center py-2 border-b border-muted">
                            <span>{item.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.quantity}x {item.price}€ = {item.quantity * item.price}€
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{order.customerEmail}</span>
                        <span className="text-xl font-bold text-primary">Total: {order.total.toLocaleString()}€</span>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderManagement;