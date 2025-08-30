import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSiteStore } from "@/stores/useStore";
import { useNavigate } from "react-router-dom";
import { Target, Eye, Users, Award, ArrowRight } from "lucide-react";
import bannerApropos from "@/assets/banner-apropos.jpg";

const APropos = () => {
  const navigate = useNavigate();
  const { siteData } = useSiteStore();

  const values = [
    {
      icon: Target,
      title: "Précision",
      description: "Nous garantissons une précision millimétrique dans tous nos relevés et calculs topographiques."
    },
    {
      icon: Eye,
      title: "Innovation",
      description: "Utilisation des dernières technologies et équipements pour des résultats optimaux."
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Une équipe de géomètres-experts qualifiés avec une solide expérience terrain."
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Engagement qualité certifié avec des processus rigoureux et contrôlés."
    }
  ];

  const timeline = [
            {
              year: "2010",
              title: "Création de l'entreprise",
              description: `Fondation de ${siteData.companyName} par une équipe de géomètres passionnés`
            },
    {
      year: "2015",
      title: "Expansion des services",
      description: "Diversification vers l'immobilier et l'aménagement foncier"
    },
    {
      year: "2018",
      title: "Modernisation technologique",
      description: "Acquisition d'équipements de pointe et digitalisation des processus"
    },
    {
      year: "2020",
      title: "Services informatiques",
      description: "Lancement de la division informatique et solutions digitales"
    },
    {
      year: "2024",
      title: "Leadership régional",
      description: "Position de leader dans la région avec plus de 500 projets réalisés"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerApropos})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            À Propos de {siteData.companyName}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Depuis plus de 15 ans, {siteData.companyName} accompagne ses clients dans la réalisation de leurs projets 
            les plus complexes grâce à une expertise technique reconnue et un service client d'exception.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Fournir des services techniques de haute qualité en topographie, immobilier et aménagement, 
                en combinant expertise traditionnelle et innovations technologiques pour répondre aux défis 
                de demain.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nous croyons que la précision technique et l'accompagnement humain sont les clés du succès 
                de vos projets, qu'ils soient d'envergure locale ou internationale.
              </p>
              <Button onClick={() => navigate('/contact')}>
                Nous contacter
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gradient-card rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Nos Chiffres</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Projets réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">25</div>
                  <div className="text-sm text-muted-foreground">Collaborateurs experts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des principes qui guident notre action quotidienne et notre engagement envers nos clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Évolution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un parcours jalonné d'innovations et de succès partagés avec nos clients
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary-light"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-hero rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Découvrez comment notre expertise peut transformer vos projets en succès.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate('/services')}
            >
              Découvrir nos services
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
        </section>
      </div>
    </div>
  );
};

export default APropos;