import { useSiteStore } from "@/stores/useStore";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoImage from "@/assets/logo.jpeg";
import { Link } from "react-router-dom";

const Footer = () => {
  const { siteData } = useSiteStore();

  return (
    <footer className="bg-gradient-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/accueil"
            className="flex items-center"
          >
            <img 
              src={logoImage} 
              alt="L'œil du topo" 
              className="w-12 h-12 rounded-full mr-3"
            />
          </Link>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {siteData.companyName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              {siteData.slogan}
            </p>
            <p className="text-muted-foreground text-sm">
              Expert en topographie et services techniques depuis plus de 10 ans.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Nos Services</h3>
            <ul className="space-y-2">
              {siteData.services.slice(0, 5).map((service, index) => (
                <li key={index} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-8 h-8 text-primary mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  {siteData.contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {siteData.contact.phone}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {siteData.contact.email}
                </span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Horaires</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p>Lun - Ven: 8h00 - 18h00</p>
                  <p>Sam: 9h00 - 12h00</p>
                  <p>Dim: Fermé</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {siteData.companyName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;