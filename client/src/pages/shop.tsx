import { Link } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/data";
import { ShoppingBag, ArrowRight, Droplets, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/animations";
import { VideoBackground } from "@/components/SmartVideoEmbed";

import productBottle from "@assets/generated_images/amber_glass_dropper_bottle_for_andara_ionic_product.png";

export default function ShopPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <section className="relative overflow-hidden py-16 sm:py-24 px-4 min-h-[400px] flex items-center">
          <VideoBackground keywords={["minerals", "pure", "drop", "premium", "amber"]} overlayOpacity={0.4} />
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-accent/10 mb-4 sm:mb-6">
                <ShoppingBag className="w-6 sm:w-8 h-6 sm:h-8 text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-primary mb-3 sm:mb-4" data-testid="shop-title">
                Shop Andara Ionic
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Primordial ionic sulfate minerals to structure and revitalize your water.
                Choose from our concentrated formulas.
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {PRODUCTS.map((product) => (
                <StaggerItem key={product.id}>
                  <ScaleOnHover>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="group block"
                      data-testid={`product-card-${product.slug}`}
                    >
                      <div className="bg-muted/30 border border-border/50 rounded-3xl p-8 hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square bg-background rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-border/30">
                          <img
                            src={productBottle}
                            alt={product.name}
                            className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                              {product.sizeMl >= 1000 ? 'Bulk Size' : 'Standard'}
                            </span>
                            <h3 className="text-xl font-display font-medium text-primary mt-1 group-hover:text-accent transition-colors" data-testid={`product-name-${product.slug}`}>
                              {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                              {product.descriptionShort}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50">
                            <div>
                              <span className="text-2xl font-display font-bold text-primary" data-testid={`product-price-${product.slug}`}>
                                ${product.price.toFixed(2)}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">
                                / {product.sizeMl}ml
                              </span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full gap-1 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors"
                              data-testid={`view-product-${product.slug}`}
                            >
                              View
                              <ArrowRight className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeIn delay={0.3} className="mt-10 sm:mt-16">
              <StaggerContainer className="grid grid-cols-3 gap-3 sm:gap-6 max-w-4xl mx-auto">
                <StaggerItem>
                  <div className="text-center p-3 sm:p-6 bg-muted/20 rounded-xl sm:rounded-2xl border border-border/30">
                    <Droplets className="w-5 sm:w-8 h-5 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-medium text-primary mb-0.5 sm:mb-1 text-xs sm:text-base">Free Shipping</h4>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Orders over $100</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center p-3 sm:p-6 bg-muted/20 rounded-xl sm:rounded-2xl border border-border/30">
                    <Sparkles className="w-5 sm:w-8 h-5 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-medium text-primary mb-0.5 sm:mb-1 text-xs sm:text-base">30-Day Guarantee</h4>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Full refund if unsatisfied</p>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="text-center p-3 sm:p-6 bg-muted/20 rounded-xl sm:rounded-2xl border border-border/30">
                    <ShoppingBag className="w-5 sm:w-8 h-5 sm:h-8 text-accent mx-auto mb-2 sm:mb-3" />
                    <h4 className="font-medium text-primary mb-0.5 sm:mb-1 text-xs sm:text-base">Bundle & Save</h4>
                    <p className="text-[10px] sm:text-sm text-muted-foreground">Up to 20% off</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </FadeIn>
          </div>
        </section>
      </div>
    </Layout>
  );
}
