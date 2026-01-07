import { useEffect } from "react";
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
import AdminPage from "@/pages/admin";
import SitemapPage from "@/pages/sitemap";
import DynamicPage from "@/pages/dynamic-page";
import ProductPage from "@/pages/product";
import ShopPage from "@/pages/shop";
import AndaraIonic100ml from "@/pages/andara-ionic-100ml";
import PrimordialPage from "@/pages/primordial";
import HowToUseAndaraPage from "@/pages/how-to-use-andara";
import AndaraDilutionCalculator from "@/pages/andara-dilution-calculator";
import AndaraIonicDilutionTable from "@/pages/andara-ionic-dilution-table";
import DilutionFuturisticPage from "@/pages/demos/dilution-futuristic";
import IconDemoPage from "@/pages/demos/icons";

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
      <Route path="/science/:slug" component={ArticlePage} />
      <Route path="/science/:cluster/:slug" component={ArticlePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/sitemap" component={SitemapPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/shop/andara-ionic-100ml" component={AndaraIonic100ml} />
      <Route path="/shop/:slug" component={ProductPage} />
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
      <Route path="/imprint" component={DynamicPage} />
      <Route path="/privacy" component={DynamicPage} />
      <Route path="/terms" component={DynamicPage} />
      <Route path="/how-to-use-andara" component={DynamicPage} />
      <Route path="/how-to-use-andara/:slug" component={DynamicPage} />
      <Route path="/tools/:slug" component={DynamicPage} />
      <Route path="/b2b-reseller" component={DynamicPage} />
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
  return (
    <QueryClientProvider client={queryClient}>
      <DesignSettingsProvider>
        <TooltipProvider>
          <CartProvider>
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
