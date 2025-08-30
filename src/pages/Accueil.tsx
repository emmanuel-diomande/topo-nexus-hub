import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteStore } from "@/stores/useStore";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Users, Award, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-topographie.jpg";
import serviceTopographie from "@/assets/service-topographie.jpg";
import serviceImmobilier from "@/assets/service-immobilier.jpg";
import serviceAmenagement from "@/assets/service-amenagement.jpg";
import serviceInformatique from "@/assets/service-informatique.jpg";
import LazyImage from "@/components/ui/lazy-image";

const Accueil = () => {
  const { siteData } = useSiteStore();
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Précision Millimétrique",
      description: "Mesures topographiques de haute précision avec des équipements de dernière génération"
    },
    {
      icon: Users,
      title: "Équipe Experte", 
      description: "Géomètres-experts diplômés avec plus de 10 ans d'expérience terrain"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Agréments officiels et certifications qualité pour tous nos services"
    }
  ];

  const stats = [
    { number: "500+", label: "Projets réalisés" },
    { number: "15+", label: "Années d'expérience" },
    { number: "98%", label: "Clients satisfaits" },
    { number: "24h", label: "Délai de réponse" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            {siteData.companyName}
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8">
            {siteData.slogan}
          </p>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Services professionnels de topographie, immobilier, aménagement foncier et plus encore. 
            Votre partenaire de confiance pour tous vos projets techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => navigate('/services')}
            >
              Découvrir nos services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              Demander un devis
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre expertise et notre engagement qualité font de nous le partenaire idéal 
              pour vos projets de topographie et services techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos Services Principaux
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une expertise complète pour tous vos projets d'aménagement et de développement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { 
                title: "Topographie", 
                desc: "Relevés précis et cartographie professionnelle avec équipements de pointe",
                image: serviceTopographie
              },
              { 
                title: "Immobilier", 
                desc: "Conseil et expertise foncière pour tous vos projets immobiliers",
                image: serviceImmobilier
              },
              { 
                title: "Aménagement Foncier", 
                desc: "Planification et développement urbain durable",
                image: serviceAmenagement
              },
              { 
                title: "Informatique", 
                desc: "Solutions digitales intégrées et modernisation",
                image: serviceInformatique
              }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer"
                    onClick={() => navigate('/services')}>
                <div className="aspect-square overflow-hidden">
                  <LazyImage
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {siteData.services.slice(4).map((service, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate('/services')}
              >
                <div className="flex items-center justify-center">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-center">
                    {service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              onClick={() => navigate('/services')}
            >
              Voir tous nos services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/contact')}
            >
              Demander un devis gratuit
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/boutique')}
            >
              Visiter la boutique
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accueil;