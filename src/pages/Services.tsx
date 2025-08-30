import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigationStore, useSiteStore } from "@/stores/useStore";
import { useNavigate } from "react-router-dom";
import bannerServices from "@/assets/banner-services.jpg";
import serviceTopographie from "@/assets/service-topographie.jpg";
import serviceImmobilier from "@/assets/service-immobilier.jpg";
import serviceAmenagement from "@/assets/service-amenagement.jpg";
import serviceInformatique from "@/assets/service-informatique.jpg";
import serviceTravauxPublics from "@/assets/service-travaux-publics.jpg";
import serviceLotissement from "@/assets/service-lotissement.jpg";
import serviceHydraulique from "@/assets/service-hydraulique.jpg";
import serviceTransit from "@/assets/service-transit.jpg";
import serviceImportExport from "@/assets/service-import-export.jpg";
import serviceForage from "@/assets/service-forage.jpg";
import LazyImage from "@/components/ui/lazy-image";
import { 
  MapPin, 
  Home, 
  TreePine, 
  Monitor, 
  Truck, 
  Building, 
  Droplets, 
  Ship, 
  Import, 
  Drill,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const { siteData } = useSiteStore();
  const [activeCategory, setActiveCategory] = useState("Tous");

  const serviceDetails = [
    {
      icon: MapPin,
      title: "Topographie",
      description: "Levés topographiques, implantations, calculs de surfaces et volumes",
      features: ["Levés de terrain", "Implantation de constructions", "Calculs topométriques", "Plans cotés"],
      price: "Sur devis",
      category: "Géomètre",
      image: serviceTopographie
    },
    {
      icon: Home,
      title: "Immobilier",
      description: "Expertises immobilières, évaluations, conseils en investissement",
      features: ["Expertise immobilière", "Évaluation de biens", "Conseil en investissement", "Diagnostics"],
      price: "Sur devis",
      category: "Immobilier",
      image: serviceImmobilier
    },
    {
      icon: TreePine,
      title: "Aménagement Foncier",
      description: "Remembrement, division parcellaire, études d'aménagement",
      features: ["Remembrement rural", "Division parcellaire", "Études d'impact", "Dossiers réglementaires"],
      price: "Sur devis",
      category: "Foncier",
      image: serviceAmenagement
    },
    {
      icon: Monitor,
      title: "Informatique",
      description: "Solutions logicielles métier, SIG, développement sur mesure",
      features: ["Logiciels SIG", "Applications métier", "Formation", "Support technique"],
      price: "Sur devis",
      category: "Tech",
      image: serviceInformatique
    },
    {
      icon: Truck,
      title: "Travaux Publics",
      description: "Études techniques, maîtrise d'œuvre, suivi de chantiers",
      features: ["Études de faisabilité", "Maîtrise d'œuvre", "Suivi de chantier", "Réception d'ouvrages"],
      price: "Sur devis",
      category: "TP",
      image: serviceTravauxPublics
    },
    {
      icon: Building,
      title: "Lotissement",
      description: "Conception de lotissements, études de viabilité, VRD",
      features: ["Conception de lotissements", "Études VRD", "Dossiers d'autorisation", "Suivi réalisation"],
      price: "Sur devis",
      category: "Urbanisme",
      image: serviceLotissement
    },
    {
      icon: Droplets,
      title: "Hydraulique",
      description: "Études hydrauliques, réseaux d'assainissement, gestion des eaux",
      features: ["Études hydrauliques", "Dimensionnement réseaux", "Gestion eaux pluviales", "Assainissement"],
      price: "Sur devis",
      category: "Hydraulique",
      image: serviceHydraulique
    },
    {
      icon: Ship,
      title: "Transit",
      description: "Transport international, logistique, déclarations douanières",
      features: ["Transport international", "Logistique", "Douanes", "Suivi cargaisons"],
      price: "Sur devis",
      category: "Transport",
      image: serviceTransit
    },
    {
      icon: Import,
      title: "Import-Export",
      description: "Commerce international, sourcing, accompagnement administratif",
      features: ["Commerce international", "Sourcing produits", "Formalités", "Accompagnement"],
      price: "Sur devis",
      category: "Commerce",
      image: serviceImportExport
    },
    {
      icon: Drill,
      title: "Forage",
      description: "Forages d'eau, géotechniques, installations de pompage",
      features: ["Forage d'eau", "Études géotechniques", "Installation pompes", "Maintenance"],
      price: "Sur devis",
      category: "Forage",
      image: serviceForage
    }
  ];

  const categories = ["Tous", "Géomètre", "Immobilier", "Foncier", "Tech", "TP", "Urbanisme", "Hydraulique", "Transport", "Commerce", "Forage"];

  const filteredServices = activeCategory === "Tous" 
    ? serviceDetails 
    : serviceDetails.filter(service => service.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerServices})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Nos Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Une gamme complète de services techniques pour accompagner tous vos projets, 
            de la conception à la réalisation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <LazyImage
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="w-fit">{service.category}</Badge>
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground text-sm">Prestations incluses :</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-secondary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/contact')}
                  >
                    Devis gratuit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Processus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une méthode éprouvée pour garantir la réussite de vos projets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analyse", description: "Étude de vos besoins et contraintes" },
              { step: "02", title: "Proposition", description: "Devis détaillé et planning" },
              { step: "03", title: "Réalisation", description: "Exécution avec suivi régulier" },
              { step: "04", title: "Livraison", description: "Remise des livrables et support" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-gradient-card rounded-2xl p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Certifications & Agréments</h2>
            <p className="text-lg text-muted-foreground">
              Nos qualifications professionnelles garantissent la qualité de nos prestations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Géomètre-Expert DPLG",
              "Qualibat RGE",
              "ISO 9001",
              "Certification Topographe"
            ].map((cert, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-8 h-8 text-secondary mx-auto mb-2" />
                <span className="text-sm font-medium text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-hero rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de votre projet et recevoir une proposition adaptée à vos besoins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/contact')}
            >
              Demander un devis
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/a-propos')}
            >
              En savoir plus
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;