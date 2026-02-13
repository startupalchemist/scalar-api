import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Services from "@/pages/services";
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import HailDamageRepairDallas from "@/pages/hail-damage-repair-dallas";
import PaintlessDentRepairDallas from "@/pages/paintless-dent-repair-dallas";
import InsuranceClaimAssistance from "@/pages/insurance-claim-assistance";
import StormDamageRestoration from "@/pages/storm-damage-restoration";
import FreeLoanerVehicles from "@/pages/free-loaner-vehicles";
import PickupAndDeliveryService from "@/pages/pickup-and-delivery-service";
import FortyEightHourGuarantee from "@/pages/forty-eight-hour-guarantee";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route path="/hail-damage-repair-dallas" component={HailDamageRepairDallas} />
      <Route path="/paintless-dent-repair-dallas" component={PaintlessDentRepairDallas} />
      <Route path="/insurance-claim-assistance" component={InsuranceClaimAssistance} />
      <Route path="/storm-damage-restoration" component={StormDamageRestoration} />
      <Route path="/free-loaner-vehicles" component={FreeLoanerVehicles} />
      <Route path="/pickup-and-delivery-service" component={PickupAndDeliveryService} />
      <Route path="/48-hour-completion-guarantee" component={FortyEightHourGuarantee} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="grain-overlay" />
        <Header />
        <main>
          <Router />
        </main>
        <Footer />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
