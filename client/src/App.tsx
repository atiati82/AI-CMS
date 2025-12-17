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
import ArticlePage from "@/pages/article";
import CrystallineMatrixPage from "@/pages/crystalline-matrix";
import BioelectricityPage from "@/pages/bioelectricity";
import WaterSciencePage from "@/pages/water-science";
import AdminPage from "@/pages/admin";
import SitemapPage from "@/pages/sitemap";
import DynamicPage from "@/pages/dynamic-page";
import ProductPage from "@/pages/product";
import ShopPage from "@/pages/shop";
import PrimordialPage from "@/pages/primordial";

import DnaMineralCodesPage from "@/pages/dna-mineral-codes";
import BioelectricityInvisibleVoltagePage from "@/pages/bioelectricity-invisible-voltage";
import ModernChatDemo from "@/pages/modern-chat-demo";
import FunctionDocsPage from "@/pages/function-docs";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/primordial" component={PrimordialPage} />
      <Route path="/science" component={ScienceLibrary} />
      <Route path="/science/crystalline-matrix" component={CrystallineMatrixPage} />
      <Route path="/science/bioelectricity" component={BioelectricityPage} />
      <Route path="/science/water" component={WaterSciencePage} />
      <Route path="/science/minerals/dna-mineral-codes" component={DnaMineralCodesPage} />
      <Route path="/science/bioelectricity/bioelectricity-invisible-voltage" component={BioelectricityInvisibleVoltagePage} />
      <Route path="/science/:slug" component={ArticlePage} />
      <Route path="/science/:cluster/:slug" component={ArticlePage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/modern-chat-demo" component={ModernChatDemo} />
      <Route path="/function-docs" component={FunctionDocsPage} />
      <Route path="/sitemap" component={SitemapPage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/shop/:slug" component={ProductPage} />
      <Route path="/about" component={DynamicPage} />
      <Route path="/about/:slug" component={DynamicPage} />
      <Route path="/trust" component={DynamicPage} />
      <Route path="/trust/:slug" component={DynamicPage} />
      <Route path="/blog" component={DynamicPage} />
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DesignSettingsProvider>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <CartDrawer />
            <Router />
          </CartProvider>
        </TooltipProvider>
      </DesignSettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
