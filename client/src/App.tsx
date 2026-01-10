import { useEffect } from "react";
console.log("[App.tsx] Module evaluation started");
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import { CartDrawer } from "@/components/cart-drawer";
import { DesignSettingsProvider } from "@/lib/design-settings";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import ScienceLibrary from "@/pages/science-library";
import ScienceLibraryMaster from "@/pages/science-library-master";
import HowAndaraWorks from "@/pages/how-andara-works";
import ArticlePage from "@/pages/article";
import CrystallineMatrixPage from "@/pages/crystalline-matrix";
import BioelectricityPage from "@/pages/bioelectricity";
import WaterSciencePage from "@/pages/water-science";
import WaterScienceMaster from "@/pages/water-science-master";
import MineralSourcesPage from "@/pages/mineral-sources";
import MineralScienceBlueprintPage from "@/pages/mineral-science-blueprint";
import B2BResellerPage from "@/pages/b2b-reseller";
import AdminPage from "@/pages/admin";
import SitemapPage from "@/pages/sitemap";
import DynamicPage from "@/pages/dynamic-page";
import ProductPage from "@/pages/product";
import ShopPage from "@/pages/shop";
import AndaraIonic100ml from "@/pages/andara-ionic-100ml";
import AndaraIonic1L from "@/pages/andara-ionic-1l";
import PrimordialPage from "@/pages/primordial";
import HowToUseAndaraPage from "@/pages/how-to-use-andara";
import AndaraDilutionCalculator from "@/pages/andara-dilution-calculator";
import AndaraIonicDilutionTable from "@/pages/andara-ionic-dilution-table";
import DilutionFuturisticPage from "@/pages/demos/dilution-futuristic";
import IconDemoPage from "@/pages/demos/icons";
import IonicMineralsSuperPage from "@/pages/demos/ionic-minerals-superpage";
import VideoGalleryPage from "@/pages/demos/video-gallery";
import DnaMineralCodesPage from "@/pages/dna-mineral-codes";
import BioelectricityInvisibleVoltagePage from "@/pages/bioelectricity-invisible-voltage";
import HexagonalWaterStructuresPage from "@/pages/hexagonal-water-structures";
import EzWaterOverviewPage from "@/pages/ez-water-overview";
import WaterClarificationLabPage from "@/pages/water-clarification-lab";
import StructuredWaterBasicsPage from "@/pages/science/structured-water-basics";
import SulfateChemistryPage from "@/pages/sulfate-chemistry";
import CellVoltagePage from "@/pages/cell-voltage";
import BioelectricTerrainModelPage from "@/pages/bioelectric-terrain-model";
import TetrahedralSulfateGeometryPage from "@/pages/tetrahedral-sulfate-geometry";
import SulfurSulfateOverviewPage from "@/pages/sulfur-sulfate-overview";
import SulfatePathwaysWaterBodyPage from "@/pages/sulfate-pathways-water-body";
import MineralsMicrobiomeWaterLinkPage from "@/pages/minerals-microbiome-water-link";
import CrystallineMatrixOverviewPage from "@/pages/crystalline-matrix-overview";
import SacredGeometryWaterPage from "@/pages/sacred-geometry-water";
import MicrobiomeMineralsPage from "@/pages/science/microbiome-minerals";
import BioelectricityRegenerationPage from "@/pages/spiritual-electricity-myths";
import BioelectricWaterPage from "@/pages/bioelectric-water";
import BioelectricMapsPage from "@/pages/ez-water-deep-dive";
import HydrationLayersInterfacesPage from "@/pages/hydration-layers-interfaces";
import PhotonicFlowPage from "@/pages/light-lattices-photonic-flow";
import LightAndWaterPage from "@/pages/light-sound-water";
import NaturalVsTreatedWaterPage from "@/pages/natural-vs-treated-water";
import ThreeSixNineHarmonicsPage from "@/pages/three-six-nine-harmonics";
import WaterCrystalGeometryMapPage from "@/pages/water-crystal-geometry-map";
import EzGeometryMapPage from "@/pages/ez-geometry-map";
import GeometryConsciousnessPage from "@/pages/geometry-consciousness";
import VortexTechnologiesPage from "@/pages/vortex-technologies";
import FerrousIronSulphatePage from "@/pages/ferrous-iron-sulphate";
import CookingTeaCoffeePage from "@/pages/applications-cooking-tea-coffee";
import DrinkingWaterHomePage from "@/pages/applications-drinking-water-home";
import PlantWateringPage from "@/pages/applications-plant-watering";
import ShowerBathPage from "@/pages/applications-shower-bath";
import SoilGardenPage from "@/pages/applications-soil-garden";
import TravelMobilePage from "@/pages/applications-travel-mobile";
import HowToPrepareWaterPage from "@/pages/how-to-prepare-water";
import AndaraVsBaselineWaterProtocolPage from "@/pages/andara-vs-baseline-water-protocol";
import MineralComparisonPage from "@/pages/comparison-other-mineral-products";
import ExperimentsIndexPage from "@/pages/experiments-index";
import VortexSpinExperimentsPage from "@/pages/vortex-spin-experiments";
import MagnetPlacementExperimentsPage from "@/pages/magnet-placement-experiments";
import DiyClarityTestsPage from "@/pages/diy-clarity-tests";
import ParameterTrackingPage from "@/pages/parameter-tracking";
import HomeWaterTestKitPage from "@/pages/home-water-test-kit";
import BrainHealthPage from "@/pages/brain-health";
import MicrobiomeGutPage from "@/pages/minerals-microbiome-gut";
import MineralScienceHubPage from "@/pages/minerals-prebiotics-scfa";
import LiquidCrystalBiologyPage from "@/pages/liquid-crystal-biology-overview";
import SourcingSustainabilityPage from "@/pages/sourcing-sustainability";
import CertificationsPage from "@/pages/trust-certifications";
import TrustFaqSafetyPage from "@/pages/trust-faq-safety";
import TrustGlossaryPage from "@/pages/trust-glossary";
import BioelectricityOverviewPage from "@/pages/science/bioelectricity";
import CitizenScienceHubPage from "@/pages/citizen-science-hub";
import CompareBundlesPage from "@/pages/compare-bundles";
import BioelectricConductivityPage from "@/pages/conductivity-signals";
import ConductivityTdsWaterPage from "@/pages/conductivity-tds-water";
import CrystalGridsInNaturePage from "@/pages/crystal-memory-minerals";
import PhilosophyPage from "@/pages/faq-philosophy";
import GeometricFlowDevicesPage from "@/pages/geometric-flow-devices";
import IonicVsColloidalPage from "@/pages/ionic-vs-colloidal-vs-solid";
import IronSulfurSynergyPage from "@/pages/iron-sulfur-synergy";
import LightAndWaterPage2 from "@/pages/light-and-water";
import LightMineralFieldPage from "@/pages/light-mineral-field";
import BioelectricCaseStudiesPage from "@/pages/liquid-crystal-bioelectric-bridge";
import LiquidCrystalResonancePage from "@/pages/liquid-crystal-resonance";
import MagneticsWaterPage from "@/pages/magnetics-water";
import EmfMineralsShieldingPage from "@/pages/mineral-deficiency-modern-world";
import MineralIntelligenceDemo from "@/pages/mineral-intelligence";
import TrustMineralOriginPage from "@/pages/mineral-origin";
import MineralsBiofilmsPage from "@/pages/minerals-biofilms";
import MineralsAndMicrobiomePage from "@/pages/minerals-microbiome-overview";
import MineralsPage from "@/pages/minerals-microbiome-research-hub";
import BlackMicaSulfatedMineralsPage from "@/pages/minerals-soil-water-body";
import OrpRedoxWaterPage from "@/pages/orp-redox-water";
import PhBalanceWaterPage2 from "@/pages/ph-balance-water";
import PhasesOfWaterPage from "@/pages/phases-of-water";
import PricePerLiterExplainer from "@/pages/price-per-liter-explainer";
import ProtonGradientsPage from "@/pages/proton-gradients-energy-transfer";
import RedoxBuffersPage from "@/pages/redox-buffers";
import EzWaterPage from "@/pages/science/ez-water";
import CrystallineGeometryPage from "@/pages/science/geometry";
import ORPRedoxBasicsPage from "@/pages/science/orp-redox-basics";
import PHWaterSystemsPage from "@/pages/science/ph-water-systems";
import StructuredWaterPage from "@/pages/science/structured-water";
import VortexTechnologiesDeepDivePage from "@/pages/science/vortex-technologies";
import WaterPhasesCompletePage from "@/pages/science/water-phases-complete";
import SpringsPage from "@/pages/springs";
import SulfateStructuringEZPage from "@/pages/sulfate-structuring-ez";
import SulfurDetoxTransportPage from "@/pages/sulfur-detox-transport";
import SulfurSpringsTraditionPage from "@/pages/sulfur-springs-tradition";
import SupportResourcesDownloadsPage from "@/pages/support-resources-downloads";
import SupportShippingReturnsPage from "@/pages/support-shipping-returns";
import TerrainConceptsPage from "@/pages/terrain-concepts";
import TerrainModelOverviewPage from "@/pages/terrain-model-overview";
import TerrainPrinciplesEverydayPage from "@/pages/terrain-principles-everyday";
import AluminumSchoolMineralsPage from "@/pages/trace-minerals-rare-earths";
import WaterCaseStudiesWorldPage from "@/pages/water-case-studies-world";
import WaterPhasesPage from "@/pages/water-phases";
import WaterStructurePage from "@/pages/water-structure";

// ION Cluster Pages
import IonPillarPage from "@/pages/ion/index";
import IonWaterPage from "@/pages/ion/water";
import IonConductivityPage from "@/pages/ion/conductivity-ec-tds";
import IonExchangePage from "@/pages/ion/ion-exchange";
import ORPRedoxPage from "@/pages/ion/orp-redox";
import SeaIonsPage from "@/pages/ion/sea";
import WavesCleaningPage from "@/pages/ion/waves-cleaning";
import LightningAtmospherePage from "@/pages/ion/lightning-atmosphere";
import SoilIonsPage from "@/pages/ion/soil";
import VolcanicMineralsPage from "@/pages/ion/volcanic-minerals";
import BioelectricPage from "@/pages/ion/bioelectric";
import ElectrolytesVsIonicMineralsPage from "@/pages/ion/electrolytes-vs-ionic-minerals";
import IonicSulfatesPage from "@/pages/ion/ionic-sulfates";
import MicrodoseLogicPage from "@/pages/ion/microdose-logic";

// Phase 1 Tier 2 Pages
import LiquidCrystalMemoryPage from "@/pages/liquid-crystal-memory";
import TerrainVsSymptomPage from "@/pages/terrain-vs-symptom";
import TimelinePage from "@/pages/timeline"; // Map to /timeline
import AndaraStoryPage from "@/pages/andara-story"; // Map to /about/andara-story
import ChargeCoherencePage from "@/pages/charge-coherence";
import IonTransportPage from "@/pages/ion-transport";
import VoltageDetoxPathwaysPage from "@/pages/voltage-detox-pathways";
import VisionMissionPage from "@/pages/vision-mission";
import CommunityJoinPage from "@/pages/community-join";
import WaterPhasesStructureActivationPage from "@/pages/water-phases-structure-activation";
import TurbidityClarityPage from "@/pages/turbidity-clarity";
import MineralCofactorsEnzymesPage from "@/pages/mineral-cofactors-enzymes";
import HowItWorksPage from "@/pages/how-it-works";
import IonicDropsPage from "@/pages/ionic-drops";

// E-commerce Pages
import CheckoutPage from "@/pages/checkout";
import OrderTrackingPage from "@/pages/order-tracking";



function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/primordial" component={PrimordialPage} />
      <Route path="/how-andara-works" component={HowAndaraWorks} />
      <Route path="/science-library" component={ScienceLibraryMaster} />
      <Route path="/science" component={ScienceLibrary} />
      <Route path="/science/crystalline-matrix" component={CrystallineMatrixPage} />
      <Route path="/science/bioelectricity" component={BioelectricityPage} />
      <Route path="/science/water-science" component={WaterScienceMaster} />
      <Route path="/science/water-science-master" component={WaterScienceMaster} />
      <Route path="/science/mineral-science-blueprint" component={MineralScienceBlueprintPage} />
      <Route path="/science/mineral-sources" component={MineralSourcesPage} />
      <Route path="/science/water" component={WaterSciencePage} />
      <Route path="/science/minerals/dna-mineral-codes" component={DnaMineralCodesPage} />
      <Route path="/hexagonal-water-structures" component={HexagonalWaterStructuresPage} />
      <Route path="/science/hexagonal-water-structures" component={HexagonalWaterStructuresPage} />
      <Route path="/science/bioelectricity/bioelectricity-invisible-voltage" component={BioelectricityInvisibleVoltagePage} />
      {/* NEW SCIENCE ROUTES */}
      <Route path="/science/ez-water-overview" component={EzWaterOverviewPage} />
      <Route path="/science/water-clarification-lab" component={WaterClarificationLabPage} />
      <Route path="/science/structured-water-basics" component={StructuredWaterBasicsPage} />
      <Route path="/science/sulfate-chemistry" component={SulfateChemistryPage} />
      <Route path="/science/cell-voltage" component={CellVoltagePage} />
      <Route path="/science/bioelectric-terrain-model" component={BioelectricTerrainModelPage} />
      <Route path="/science/tetrahedral-sulfate-geometry" component={TetrahedralSulfateGeometryPage} />
      <Route path="/science/sulfur-sulfate-overview" component={SulfurSulfateOverviewPage} />
      <Route path="/science/sulfate-pathways-water-body" component={SulfatePathwaysWaterBodyPage} />
      <Route path="/science/minerals-microbiome-water-link" component={MineralsMicrobiomeWaterLinkPage} />
      <Route path="/science/crystalline-matrix-overview" component={CrystallineMatrixOverviewPage} />
      <Route path="/science/sacred-geometry-water" component={SacredGeometryWaterPage} />
      <Route path="/science/microbiome-minerals" component={MicrobiomeMineralsPage} />
      <Route path="/science/spiritual-electricity" component={BioelectricityRegenerationPage} />
      <Route path="/science/bioelectric-water" component={BioelectricWaterPage} />
      <Route path="/science/ez-water-deep-dive" component={BioelectricMapsPage} />
      <Route path="/science/hydration-layers-interfaces" component={HydrationLayersInterfacesPage} />
      <Route path="/science/light-lattices-photonic-flow" component={PhotonicFlowPage} />
      <Route path="/science/light-sound-water" component={LightAndWaterPage} />
      <Route path="/science/natural-vs-treated-water" component={NaturalVsTreatedWaterPage} />
      <Route path="/science/three-six-nine-harmonics" component={ThreeSixNineHarmonicsPage} />
      <Route path="/science/water-crystal-geometry-map" component={WaterCrystalGeometryMapPage} />
      <Route path="/science/ez-geometry-map" component={EzGeometryMapPage} />
      <Route path="/science/geometry-consciousness" component={GeometryConsciousnessPage} />
      <Route path="/science/vortex-technologies" component={VortexTechnologiesPage} />
      <Route path="/science/ferrous-iron-sulphate" component={FerrousIronSulphatePage} />
      <Route path="/science/:slug" component={ArticlePage} />
      <Route path="/science/:cluster/:slug" component={ArticlePage} />

      {/* ION Cluster Routes */}
      <Route path="/ion" component={IonPillarPage} />
      <Route path="/ion/water" component={IonWaterPage} />
      <Route path="/ion/conductivity-ec-tds" component={IonConductivityPage} />
      <Route path="/ion/ion-exchange" component={IonExchangePage} />
      <Route path="/ion/orp-redox" component={ORPRedoxPage} />
      <Route path="/ion/sea" component={SeaIonsPage} />
      <Route path="/ion/waves-cleaning" component={WavesCleaningPage} />
      <Route path="/ion/lightning-atmosphere" component={LightningAtmospherePage} />
      <Route path="/ion/soil" component={SoilIonsPage} />
      <Route path="/ion/volcanic-minerals" component={VolcanicMineralsPage} />
      <Route path="/ion/bioelectric" component={BioelectricPage} />
      <Route path="/ion/electrolytes-vs-ionic-minerals" component={ElectrolytesVsIonicMineralsPage} />
      <Route path="/ion/ionic-sulfates" component={IonicSulfatesPage} />
      <Route path="/ion/microdose-logic" component={MicrodoseLogicPage} />

      {/* Phase 1 Tier 2 Pages */}
      <Route path="/liquid-crystal-memory" component={LiquidCrystalMemoryPage} />
      <Route path="/terrain-vs-symptom" component={TerrainVsSymptomPage} />
      <Route path="/timeline" component={TimelinePage} />
      <Route path="/about/andara-story" component={AndaraStoryPage} />
      <Route path="/about/intention" component={VisionMissionPage} />
      <Route path="/charge-coherence" component={ChargeCoherencePage} />
      <Route path="/ion-transport" component={IonTransportPage} />
      <Route path="/voltage-detox-pathways" component={VoltageDetoxPathwaysPage} />
      <Route path="/vision-mission" component={VisionMissionPage} />
      <Route path="/community-join" component={CommunityJoinPage} />
      <Route path="/science/water-phases-structure-activation" component={WaterPhasesStructureActivationPage} />
      <Route path="/science/water-turbidity-clarity" component={TurbidityClarityPage} />
      <Route path="/science/mineral-cofactors-enzymes" component={MineralCofactorsEnzymesPage} />
      <Route path="/andara/how-it-works" component={HowItWorksPage} />
      <Route path="/ionic-drops" component={IonicDropsPage} />

      <Route path="/admin" component={AdminPage} />
      <Route path="/sitemap" component={SitemapPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/shop/andara-ionic-100ml" component={AndaraIonic100ml} />
      <Route path="/shop/andara-ionic-1l" component={AndaraIonic1L} />
      <Route path="/shop/:slug" component={ProductPage} />
      <Route path="/checkout" component={CheckoutPage} />
      <Route path="/orders/track" component={OrderTrackingPage} />
      <Route path="/how-to-use-andara" component={HowToUseAndaraPage} />
      <Route path="/andara-dilution-calculator" component={AndaraDilutionCalculator} />
      <Route path="/andara-ionic-dilution-table" component={AndaraIonicDilutionTable} />
      <Route path="/about" component={DynamicPage} />
      <Route path="/about/:slug" component={DynamicPage} />
      <Route path="/trust" component={DynamicPage} />
      <Route path="/trust/:slug" component={DynamicPage} />
      <Route path="/blog" component={DynamicPage} />
      <Route path="/demos/icons" component={IconDemoPage} />
      <Route path="/demos/dilution-futuristic" component={DilutionFuturisticPage} />
      <Route path="/demos/ionic-minerals" component={IonicMineralsSuperPage} />
      <Route path="/demos/video-gallery" component={VideoGalleryPage} />
      <Route path="/imprint" component={DynamicPage} />
      <Route path="/privacy" component={DynamicPage} />
      <Route path="/terms" component={DynamicPage} />
      <Route path="/tools/:slug" component={DynamicPage} />
      <Route path="/use-cases/cooking-tea-coffee" component={CookingTeaCoffeePage} />
      <Route path="/use-cases/drinking-water-home" component={DrinkingWaterHomePage} />
      <Route path="/use-cases/plant-watering" component={PlantWateringPage} />
      <Route path="/use-cases/shower-bath" component={ShowerBathPage} />
      <Route path="/use-cases/soil-garden" component={SoilGardenPage} />
      <Route path="/use-cases/travel-mobile" component={TravelMobilePage} />
      <Route path="/use-cases/how-to-prepare-water" component={HowToPrepareWaterPage} />
      <Route path="/trust/andara-vs-baseline" component={AndaraVsBaselineWaterProtocolPage} />
      <Route path="/trust/comparison" component={MineralComparisonPage} />
      <Route path="/trust/sourcing" component={SourcingSustainabilityPage} />
      <Route path="/trust/certifications" component={CertificationsPage} />
      <Route path="/trust/safety" component={TrustFaqSafetyPage} />
      <Route path="/trust/glossary" component={TrustGlossaryPage} />
      <Route path="/experiments" component={ExperimentsIndexPage} />
      <Route path="/experiments/vortex-spin" component={VortexSpinExperimentsPage} />
      <Route path="/experiments/magnet-placement" component={MagnetPlacementExperimentsPage} />
      <Route path="/experiments/diy-clarity" component={DiyClarityTestsPage} />
      <Route path="/experiments/parameter-tracking" component={ParameterTrackingPage} />
      <Route path="/experiments/home-test-kit" component={HomeWaterTestKitPage} />
      <Route path="/health/brain-health" component={BrainHealthPage} />
      <Route path="/health/microbiome-gut" component={MicrobiomeGutPage} />
      <Route path="/health/prebiotics-scfa" component={MineralScienceHubPage} />
      <Route path="/health/liquid-crystal-biology" component={LiquidCrystalBiologyPage} />
      <Route path="/science/bioelectricity-intro" component={BioelectricityOverviewPage} />
      <Route path="/science/citizen-science-hub" component={CitizenScienceHubPage} />
      <Route path="/science/conductivity-signals" component={BioelectricConductivityPage} />
      <Route path="/science/conductivity-tds-water" component={ConductivityTdsWaterPage} />
      <Route path="/science/crystal-memory-minerals" component={CrystalGridsInNaturePage} />
      <Route path="/science/geometric-flow-devices" component={GeometricFlowDevicesPage} />
      <Route path="/science/ionic-vs-colloidal-vs-solid" component={IonicVsColloidalPage} />
      <Route path="/science/iron-sulfur-synergy" component={IronSulfurSynergyPage} />
      <Route path="/science/light-and-water" component={LightAndWaterPage2} />
      <Route path="/science/light-mineral-field" component={LightMineralFieldPage} />
      <Route path="/science/liquid-crystal-bioelectric-bridge" component={BioelectricCaseStudiesPage} />
      <Route path="/science/liquid-crystal-resonance" component={LiquidCrystalResonancePage} />
      <Route path="/science/magnetics-water" component={MagneticsWaterPage} />
      <Route path="/science/mineral-deficiency-modern-world" component={EmfMineralsShieldingPage} />
      <Route path="/science/mineral-intelligence" component={MineralIntelligenceDemo} />
      <Route path="/science/minerals-biofilms" component={MineralsBiofilmsPage} />
      <Route path="/science/minerals-microbiome-overview" component={MineralsAndMicrobiomePage} />
      <Route path="/science/minerals-microbiome-research-hub" component={MineralsPage} />
      <Route path="/science/minerals-soil-water-body" component={BlackMicaSulfatedMineralsPage} />
      <Route path="/science/orp-redox-water" component={OrpRedoxWaterPage} />
      <Route path="/science/ph-balance-water" component={PhBalanceWaterPage2} />
      <Route path="/science/phases-of-water" component={PhasesOfWaterPage} />
      <Route path="/science/proton-gradients-energy-transfer" component={ProtonGradientsPage} />
      <Route path="/science/redox-buffers" component={RedoxBuffersPage} />
      <Route path="/science/ez-water" component={EzWaterPage} />
      <Route path="/science/geometry" component={CrystallineGeometryPage} />
      <Route path="/science/orp-redox-basics" component={ORPRedoxBasicsPage} />
      <Route path="/science/ph-water-systems" component={PHWaterSystemsPage} />
      <Route path="/science/structured-water" component={StructuredWaterPage} />
      <Route path="/science/vortex-technologies-deep-dive" component={VortexTechnologiesDeepDivePage} />
      <Route path="/science/water-phases-complete" component={WaterPhasesCompletePage} />
      <Route path="/science/springs" component={SpringsPage} />
      <Route path="/science/sulfate-structuring-ez" component={SulfateStructuringEZPage} />
      <Route path="/science/sulfur-detox-transport" component={SulfurDetoxTransportPage} />
      <Route path="/science/sulfur-springs-tradition" component={SulfurSpringsTraditionPage} />
      <Route path="/science/terrain-concepts" component={TerrainConceptsPage} />
      <Route path="/science/terrain-model-overview" component={TerrainModelOverviewPage} />
      <Route path="/science/terrain-principles-everyday" component={TerrainPrinciplesEverydayPage} />
      <Route path="/science/trace-minerals-rare-earths" component={AluminumSchoolMineralsPage} />
      <Route path="/science/water-case-studies" component={WaterCaseStudiesWorldPage} />
      <Route path="/science/water-phases" component={WaterPhasesPage} />
      <Route path="/science/water-structure" component={WaterStructurePage} />

      <Route path="/shop/compare-bundles" component={CompareBundlesPage} />
      <Route path="/shop/price-per-liter" component={PricePerLiterExplainer} />
      <Route path="/trust/faq-philosophy" component={PhilosophyPage} />
      <Route path="/trust/mineral-origin" component={TrustMineralOriginPage} />
      <Route path="/support/downloads" component={SupportResourcesDownloadsPage} />
      <Route path="/support/shipping-returns" component={SupportShippingReturnsPage} />

      <Route path="/b2b-reseller" component={B2BResellerPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function MetaInjector() {
  useEffect(() => {
    fetch('/api/public-settings')
      .then(res => res.json())
      .then(data => {
        if (data.google_site_verification_id) {
          let meta = document.querySelector('meta[name="google-site-verification"]');
          if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', 'google-site-verification');
            document.head.appendChild(meta);
          }
          meta.setAttribute('content', data.google_site_verification_id);
        }
      })
      .catch(err => console.error("Failed to load public settings", err));
  }, []);

  return null;
}

function App() {
  console.log("[App.tsx] App component rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <DesignSettingsProvider>
        <TooltipProvider>
          <CartProvider>
            <div>App Rendered (Debug)</div>
            <Toaster />
            <CartDrawer />
            <MetaInjector />
            <Router />
          </CartProvider>
        </TooltipProvider>
      </DesignSettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
