import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useStore";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const { toast } = useToast();

  const handleLogin = () => {
    const success = login(password);
    if (success) {
      toast({
        title: "✅ Connexion réussie",
        description: "Accès administration accordé",
      });
      onOpenChange(false);
      setPassword("");
    } else {
      toast({
        title: "❌ Erreur de connexion", 
        description: "Mot de passe incorrect",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5" />
            <span>Connexion Administration</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe administrateur</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Entrez le mot de passe"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={handleLogin} className="flex-1">
              Se connecter
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};