import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useNavigationStore } from "@/stores/useStore";
import Accueil from "./Accueil";
import APropos from "./APropos";
import Services from "./Services";
import Contact from "./Contact";
import Boutique from "./Boutique";

const Index = () => {
  const { currentPage } = useNavigationStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <Accueil />;
      case 'apropos':
        return <APropos />;
      case 'services':
        return <Services />;
      case 'contact':
        return <Contact />;
      case 'boutique':
        return <Boutique />;
      default:
        return <Accueil />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
