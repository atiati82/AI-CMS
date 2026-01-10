import { useCart } from "@/contexts/cart-context";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { Link } from "wouter";

import productBottle from "@assets/generated_images/amber_glass_dropper_bottle_for_andara_ionic_product.png";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const getItemPrice = (item: typeof items[0]) => {
    if (item.bundleIndex !== null) {
      return item.product.bundles[item.bundleIndex].price;
    }
    return item.product.price;
  };

  const getItemName = (item: typeof items[0]) => {
    if (item.bundleIndex !== null) {
      const bundle = item.product.bundles[item.bundleIndex];
      return `${item.product.name} - ${bundle.name} (${bundle.units}x)`;
    }
    return item.product.name;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-4 sm:p-6" data-testid="cart-drawer">
        <SheetHeader className="space-y-2 pr-6">
          <SheetTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-12">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-lg">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add products to get started</p>
            </div>
            <Link href="/shop">
              <Button onClick={closeCart} data-testid="cart-browse-products">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.bundleIndex}`}
                  className="flex gap-4 p-4 bg-muted/30 rounded-xl"
                  data-testid={`cart-item-${idx}`}
                >
                  <div className="w-20 h-20 bg-background rounded-lg flex items-center justify-center flex-shrink-0 border border-border/50">
                    <img
                      src={productBottle}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm leading-tight line-clamp-2" data-testid={`cart-item-name-${idx}`}>
                      {getItemName(item)}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.product.sizeMl}ml
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 border border-border rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.bundleIndex, item.quantity - 1)}
                          className="p-1 hover:text-accent transition-colors"
                          data-testid={`cart-decrease-${idx}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center" data-testid={`cart-quantity-${idx}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.bundleIndex, item.quantity + 1)}
                          className="p-1 hover:text-accent transition-colors"
                          data-testid={`cart-increase-${idx}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold" data-testid={`cart-item-price-${idx}`}>
                          ${(getItemPrice(item) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.productId, item.bundleIndex)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          data-testid={`cart-remove-${idx}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-lg" data-testid="cart-subtotal">€{totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Shipping calculated at checkout
              </p>
              <Link href="/checkout">
                <Button
                  onClick={closeCart}
                  className="w-full h-11 sm:h-12 text-sm sm:text-base gap-2"
                  data-testid="cart-checkout-button"
                >
                  Proceed to Checkout
                </Button>
              </Link>
              <button
                onClick={clearCart}
                className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
                data-testid="cart-clear-button"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CartIcon() {
  const { toggleCart, totalItems } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-primary hover:text-accent transition-colors"
      data-testid="cart-icon-button"
      aria-label="Open cart"
    >
      <ShoppingBag className="w-5 h-5" />
      {totalItems > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
          data-testid="cart-item-count"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  );
}
