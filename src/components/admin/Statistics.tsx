import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, ShoppingCart, Package, Euro, Calendar, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();

  const stats = {
    totalSales: 125000,
    totalOrders: 235,
    totalCustomers: 156,
    totalProducts: 45,
    monthlyGrowth: 12.5,
    avgOrderValue: 532,
    topCategory: "Instruments",
    conversionRate: 3.2
  };

  const monthlyData = [
    { month: "Jan", sales: 15000, orders: 28 },
    { month: "Fév", sales: 18500, orders: 32 },
    { month: "Mar", sales: 22000, orders: 45 },
    { month: "Avr", sales: 19800, orders: 38 },
    { month: "Mai", sales: 25600, orders: 52 },
    { month: "Juin", sales: 23800, orders: 40 }
  ];

  const topProducts = [
    { name: "Théodolite DT-209", sales: 15, revenue: 43485 },
    { name: "GPS RTK Leica", sales: 8, revenue: 100000 },
    { name: "Scanner 3D RTC360", sales: 3, revenue: 135000 },
    { name: "Drone DJI RTK", sales: 12, revenue: 102000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="relative">
        <div className="h-48 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Statistiques</h1>
            <p className="text-xl opacity-90">Analysez les performances de votre boutique</p>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chiffre d'affaires</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalSales.toLocaleString()}€</p>
                  <p className="text-sm text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{stats.monthlyGrowth}%
                  </p>
                </div>
                <Euro className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-secondary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Commandes</p>
                  <p className="text-3xl font-bold text-secondary">{stats.totalOrders}</p>
                  <p className="text-sm text-muted-foreground">Panier moyen: {stats.avgOrderValue}€</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Clients</p>
                  <p className="text-3xl font-bold text-accent">{stats.totalCustomers}</p>
                  <p className="text-sm text-muted-foreground">Taux conversion: {stats.conversionRate}%</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Produits</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalProducts}</p>
                  <p className="text-sm text-muted-foreground">Top: {stats.topCategory}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ventes mensuelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <BarChart3 className="w-5 h-5 mr-2" />
                Évolution des ventes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.orders} commandes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{data.sales.toLocaleString()}€</p>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(data.sales / 30000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top produits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Package className="w-5 h-5 mr-2" />
                Produits les plus vendus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} ventes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{product.revenue.toLocaleString()}€</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métriques détaillées */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Métriques détaillées</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">Taux de fidélisation</h3>
                <p className="text-3xl font-bold text-primary mb-1">68%</p>
                <p className="text-sm text-muted-foreground">Clients fidèles</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">Temps moyen session</h3>
                <p className="text-3xl font-bold text-secondary mb-1">8:42</p>
                <p className="text-sm text-muted-foreground">Minutes</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-2">Taux de rebond</h3>
                <p className="text-3xl font-bold text-accent mb-1">24%</p>
                <p className="text-sm text-muted-foreground">Visiteurs uniques</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;