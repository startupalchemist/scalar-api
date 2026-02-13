import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

const Services = lazy(() => import("@/pages/services"));
const About = lazy(() => import("@/pages/about"));
const FAQ = lazy(() => import("@/pages/faq"));
const Contact = lazy(() => import("@/pages/contact"));
const Admin = lazy(() => import("@/pages/admin"));
const Login = lazy(() => import("@/pages/login"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));

const HailDamageRepairDallas = lazy(() => import("@/pages/hail-damage-repair-dallas"));
const PaintlessDentRepairDallas = lazy(() => import("@/pages/paintless-dent-repair-dallas"));
const InsuranceClaimAssistance = lazy(() => import("@/pages/insurance-claim-assistance"));
const StormDamageRestoration = lazy(() => import("@/pages/storm-damage-restoration"));
const FreeLoanerVehicles = lazy(() => import("@/pages/free-loaner-vehicles"));
const PickupAndDeliveryService = lazy(() => import("@/pages/pickup-and-delivery-service"));
const FortyEightHourGuarantee = lazy(() => import("@/pages/forty-eight-hour-guarantee"));

const HailRepairDallas = lazy(() => import("@/pages/hail-repair-dallas"));
const HailRepairPlano = lazy(() => import("@/pages/hail-repair-plano"));
const HailRepairFrisco = lazy(() => import("@/pages/hail-repair-frisco"));
const HailRepairFortWorth = lazy(() => import("@/pages/hail-repair-fort-worth"));
const HailRepairArlington = lazy(() => import("@/pages/hail-repair-arlington"));
const HailRepairDenton = lazy(() => import("@/pages/hail-repair-denton"));
const HailRepairMcKinney = lazy(() => import("@/pages/hail-repair-mckinney"));
const HailRepairIrving = lazy(() => import("@/pages/hail-repair-irving"));
const HailRepairGarland = lazy(() => import("@/pages/hail-repair-garland"));

const StateFarmHailClaims = lazy(() => import("@/pages/state-farm-hail-claims"));
const GeicoHailDamageRepair = lazy(() => import("@/pages/geico-hail-damage-repair"));
const AllstateHailClaims = lazy(() => import("@/pages/allstate-hail-claims"));
const ProgressiveHailRepair = lazy(() => import("@/pages/progressive-hail-repair"));
const UsaaHailDamage = lazy(() => import("@/pages/usaa-hail-damage"));
const FarmersHailClaims = lazy(() => import("@/pages/farmers-hail-claims"));
const LibertyMutualHailClaims = lazy(() => import("@/pages/liberty-mutual-hail-claims"));

const PdrVsBodyShop = lazy(() => import("@/pages/pdr-vs-body-shop"));
const HailRepairVsRepaint = lazy(() => import("@/pages/hail-repair-vs-repaint"));
const IsHailDamageWorthFixing = lazy(() => import("@/pages/is-hail-damage-worth-fixing"));
const HowMuchDoesHailRepairCost = lazy(() => import("@/pages/how-much-does-hail-repair-cost"));
const WhatIsInsuranceSupplement = lazy(() => import("@/pages/what-is-insurance-supplement"));
const HowHailAffectsResaleValue = lazy(() => import("@/pages/how-hail-affects-resale-value"));

const FleetHailRepair = lazy(() => import("@/pages/fleet-hail-repair"));
const DealershipHailServices = lazy(() => import("@/pages/dealership-hail-services"));
const CommercialFleetPdr = lazy(() => import("@/pages/commercial-fleet-pdr"));
const PreSaleTouchUpServices = lazy(() => import("@/pages/pre-sale-touch-up-services"));
const DallasHailStorm2026 = lazy(() => import("@/pages/dallas-hail-storm-2026"));

function PageLoader() {
  return (
    <div className="bg-[#0B0B0D] min-h-screen flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-[#FF192C] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        <Route path="/hail-damage-repair-dallas" component={HailDamageRepairDallas} />
        <Route path="/paintless-dent-repair-dallas" component={PaintlessDentRepairDallas} />
        <Route path="/insurance-claim-assistance" component={InsuranceClaimAssistance} />
        <Route path="/storm-damage-restoration" component={StormDamageRestoration} />
        <Route path="/free-loaner-vehicles" component={FreeLoanerVehicles} />
        <Route path="/pickup-and-delivery-service" component={PickupAndDeliveryService} />
        <Route path="/48-hour-completion-guarantee" component={FortyEightHourGuarantee} />

        <Route path="/hail-repair-dallas" component={HailRepairDallas} />
        <Route path="/hail-repair-plano" component={HailRepairPlano} />
        <Route path="/hail-repair-frisco" component={HailRepairFrisco} />
        <Route path="/hail-repair-fort-worth" component={HailRepairFortWorth} />
        <Route path="/hail-repair-arlington" component={HailRepairArlington} />
        <Route path="/hail-repair-denton" component={HailRepairDenton} />
        <Route path="/hail-repair-mckinney" component={HailRepairMcKinney} />
        <Route path="/hail-repair-irving" component={HailRepairIrving} />
        <Route path="/hail-repair-garland" component={HailRepairGarland} />

        <Route path="/state-farm-hail-claims" component={StateFarmHailClaims} />
        <Route path="/geico-hail-damage-repair" component={GeicoHailDamageRepair} />
        <Route path="/allstate-hail-claims" component={AllstateHailClaims} />
        <Route path="/progressive-hail-repair" component={ProgressiveHailRepair} />
        <Route path="/usaa-hail-damage" component={UsaaHailDamage} />
        <Route path="/farmers-hail-claims" component={FarmersHailClaims} />
        <Route path="/liberty-mutual-hail-claims" component={LibertyMutualHailClaims} />

        <Route path="/pdr-vs-body-shop" component={PdrVsBodyShop} />
        <Route path="/hail-repair-vs-repaint" component={HailRepairVsRepaint} />
        <Route path="/is-hail-damage-worth-fixing" component={IsHailDamageWorthFixing} />
        <Route path="/how-much-does-hail-repair-cost" component={HowMuchDoesHailRepairCost} />
        <Route path="/what-is-insurance-supplement" component={WhatIsInsuranceSupplement} />
        <Route path="/how-hail-affects-resale-value" component={HowHailAffectsResaleValue} />

        <Route path="/fleet-hail-repair" component={FleetHailRepair} />
        <Route path="/dealership-hail-services" component={DealershipHailServices} />
        <Route path="/commercial-fleet-pdr" component={CommercialFleetPdr} />
        <Route path="/pre-sale-touch-up-services" component={PreSaleTouchUpServices} />
        <Route path="/dallas-hail-storm-2026" component={DallasHailStorm2026} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <div className="grain-overlay" />
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
