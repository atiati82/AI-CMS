import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { Link, useLocation } from "wouter";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Loader2, ShieldCheck, ArrowLeft, Package, Truck,
    CreditCard, Banknote, Building2, MapPin, CheckCircle2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VideoBackground } from "@/components/SmartVideoEmbed";

interface ShippingAddress {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

// Country options for shipping
const COUNTRIES = [
    { code: 'DE', name: 'Germany' },
    { code: 'AT', name: 'Austria' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'PT', name: 'Portugal' },
    { code: 'PL', name: 'Poland' },
    { code: 'CZ', name: 'Czech Republic' },
    { code: 'DK', name: 'Denmark' },
    { code: 'SE', name: 'Sweden' },
    { code: 'FI', name: 'Finland' },
    { code: 'NO', name: 'Norway' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IE', name: 'Ireland' },
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'JP', name: 'Japan' },
];

type PaymentMethod = 'cod' | 'bank_transfer' | 'stripe';

export default function CheckoutPage() {
    const { items, clearCart, totalPrice } = useCart();
    const [, navigate] = useLocation();
    const { toast } = useToast();

    const [isSuccess, setIsSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);

    // Customer info
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    // Shipping address
    const [address, setAddress] = useState<ShippingAddress>({
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "DE"
    });

    // Payment
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
    const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>(['cod', 'bank_transfer']);

    // Calculated totals
    const [totals, setTotals] = useState({
        subtotal: 0,
        shipping: 0,
        codFee: 0,
        tax: 0,
        total: 0,
        isFreeShipping: false,
        estimatedDays: { min: 1, max: 3 },
        region: 'germany'
    });

    // Calculate totals when items or country changes
    useEffect(() => {
        const calculateTotals = async () => {
            if (items.length === 0) return;

            setIsCalculating(true);
            try {
                const res = await fetch("/api/shop/orders/calculate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        items: items.map(item => ({
                            productId: item.productId,
                            price: item.bundleIndex !== null
                                ? item.product.bundles[item.bundleIndex].price * 100 // Convert to cents
                                : item.product.price * 100,
                            quantity: item.quantity
                        })),
                        countryCode: address.country,
                        paymentMethod
                    })
                });

                const data = await res.json();
                if (data.ok) {
                    setTotals({
                        subtotal: data.subtotal,
                        shipping: data.shipping,
                        codFee: data.codFee,
                        tax: data.tax,
                        total: data.total,
                        isFreeShipping: data.isFreeShipping,
                        estimatedDays: data.estimatedDays,
                        region: data.region
                    });
                    setAvailablePaymentMethods(data.availablePaymentMethods || ['bank_transfer']);

                    // If COD not available and currently selected, switch to bank transfer
                    if (!data.codAvailable && paymentMethod === 'cod') {
                        setPaymentMethod('bank_transfer');
                    }
                }
            } catch (error) {
                console.error("Failed to calculate totals:", error);
            } finally {
                setIsCalculating(false);
            }
        };

        calculateTotals();
    }, [items, address.country, paymentMethod]);

    // Format price in EUR
    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(cents / 100);
    };

    // Handle order submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!customerName || !customerEmail) {
            toast({ title: "Missing Information", description: "Please enter your name and email.", variant: "destructive" });
            return;
        }

        if (!address.line1 || !address.city || !address.postalCode || !address.country) {
            toast({ title: "Missing Address", description: "Please complete your shipping address.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);

        try {
            const orderItems = items.map(item => ({
                productId: item.productId,
                productName: item.bundleIndex !== null
                    ? `${item.product.name} - ${item.product.bundles[item.bundleIndex].name}`
                    : item.product.name,
                quantity: item.quantity,
                unitAmount: item.bundleIndex !== null
                    ? item.product.bundles[item.bundleIndex].price * 100
                    : item.product.price * 100,
                currency: 'eur'
            }));

            const res = await fetch("/api/shop/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerEmail,
                    customerName,
                    customerPhone,
                    items: orderItems,
                    shippingAddress: {
                        ...address,
                        name: address.name || customerName
                    },
                    paymentMethod
                })
            });

            const data = await res.json();

            if (data.ok) {
                setOrderNumber(data.order.order_number);
                setIsSuccess(true);
                clearCart();
                toast({
                    title: "Order Placed Successfully!",
                    description: `Your order number is ${data.order.order_number}`
                });
            } else {
                throw new Error(data.error || 'Failed to place order');
            }
        } catch (error: any) {
            console.error("Order submission error:", error);
            toast({
                title: "Order Failed",
                description: error.message || "Failed to place order. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success state
    if (isSuccess) {
        return (
            <Layout>
                <div className="relative min-h-screen flex items-center justify-center py-20 px-4">
                    <VideoBackground keywords={["clean", "pure", "mineral", "success"]} overlayOpacity={0.2} />
                    <div className="container max-w-2xl mx-auto text-center relative z-10">
                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-3xl font-display font-medium text-primary mb-4">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-muted-foreground mb-4">
                            Thank you for your order. We're preparing it for shipment.
                        </p>

                        {orderNumber && (
                            <div className="bg-muted/50 rounded-lg p-4 mb-8 inline-block">
                                <p className="text-sm text-muted-foreground">Order Number</p>
                                <p className="text-lg font-mono font-bold text-primary">{orderNumber}</p>
                            </div>
                        )}

                        {paymentMethod === 'cod' && (
                            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
                                <div className="flex items-start gap-3">
                                    <Banknote className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-amber-800 dark:text-amber-200">Cash on Delivery</p>
                                        <p className="text-sm text-amber-700 dark:text-amber-300">
                                            Please have {formatPrice(totals.total)} ready when your package arrives.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'bank_transfer' && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
                                <div className="flex items-start gap-3">
                                    <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-blue-800 dark:text-blue-200">Bank Transfer</p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                                            Please transfer {formatPrice(totals.total)} to:
                                        </p>
                                        <div className="text-xs font-mono bg-white/50 dark:bg-black/20 p-2 rounded">
                                            <p>IBAN: DE89 3704 0044 0532 0130 00</p>
                                            <p>BIC: COBADEFFXXX</p>
                                            <p>Reference: {orderNumber}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/orders/track">
                                <Button variant="outline" className="gap-2">
                                    <Package className="w-4 h-4" />
                                    Track Order
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button className="gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    // Empty cart
    if (items.length === 0) {
        return (
            <Layout>
                <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h1 className="text-3xl font-display font-medium mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">Add some products to your cart to checkout.</p>
                    <Link href="/shop">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="relative min-h-screen bg-secondary/30">
                <VideoBackground keywords={["safe", "secure", "premium", "minerals"]} overlayOpacity={0.15} />
                <div className="container max-w-6xl mx-auto py-12 px-4 relative z-10">
                    <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shop
                    </Link>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Left Column - Forms */}
                            <div className="space-y-8">
                                {/* Contact Information */}
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                    <h2 className="text-xl font-display font-medium text-primary mb-4">
                                        Contact Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Full Name *</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border rounded-lg bg-background"
                                                placeholder="Max Mustermann"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email Address *</label>
                                            <input
                                                type="email"
                                                className="w-full p-3 border rounded-lg bg-background"
                                                placeholder="max@example.com"
                                                value={customerEmail}
                                                onChange={(e) => setCustomerEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                                            <input
                                                type="tel"
                                                className="w-full p-3 border rounded-lg bg-background"
                                                placeholder="+49 123 456789"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                    <h2 className="text-xl font-display font-medium text-primary mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5" />
                                        Shipping Address
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Country *</label>
                                            <select
                                                className="w-full p-3 border rounded-lg bg-background"
                                                value={address.country}
                                                onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
                                                required
                                            >
                                                {COUNTRIES.map(c => (
                                                    <option key={c.code} value={c.code}>{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Street Address *</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border rounded-lg bg-background"
                                                placeholder="Musterstraße 123"
                                                value={address.line1}
                                                onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Apartment, Suite, etc. (optional)</label>
                                            <input
                                                type="text"
                                                className="w-full p-3 border rounded-lg bg-background"
                                                placeholder="Apt 4B"
                                                value={address.line2}
                                                onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Postal Code *</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 border rounded-lg bg-background"
                                                    placeholder="12345"
                                                    value={address.postalCode}
                                                    onChange={(e) => setAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">City *</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-3 border rounded-lg bg-background"
                                                    placeholder="Berlin"
                                                    value={address.city}
                                                    onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                    <h2 className="text-xl font-display font-medium text-primary mb-4">
                                        Payment Method
                                    </h2>
                                    <div className="space-y-3">
                                        {availablePaymentMethods.includes('cod') && (
                                            <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod'
                                                ? 'border-accent bg-accent/5'
                                                : 'border-border hover:border-accent/50'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={paymentMethod === 'cod'}
                                                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                    className="w-4 h-4"
                                                />
                                                <Banknote className="w-5 h-5 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <p className="font-medium">Cash on Delivery</p>
                                                    <p className="text-sm text-muted-foreground">Pay when your package arrives (+{formatPrice(490)} COD fee)</p>
                                                </div>
                                            </label>
                                        )}

                                        <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'bank_transfer'
                                            ? 'border-accent bg-accent/5'
                                            : 'border-border hover:border-accent/50'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="bank_transfer"
                                                checked={paymentMethod === 'bank_transfer'}
                                                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                className="w-4 h-4"
                                            />
                                            <Building2 className="w-5 h-5 text-muted-foreground" />
                                            <div className="flex-1">
                                                <p className="font-medium">Bank Transfer</p>
                                                <p className="text-sm text-muted-foreground">Transfer before shipping (no extra fee)</p>
                                            </div>
                                        </label>

                                        {/* Stripe would go here if enabled */}
                                        {availablePaymentMethods.includes('stripe') && (
                                            <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'stripe'
                                                ? 'border-accent bg-accent/5'
                                                : 'border-border hover:border-accent/50'
                                                }`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="stripe"
                                                    checked={paymentMethod === 'stripe'}
                                                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                                                    className="w-4 h-4"
                                                />
                                                <CreditCard className="w-5 h-5 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <p className="font-medium">Credit Card</p>
                                                    <p className="text-sm text-muted-foreground">Pay securely with Stripe</p>
                                                </div>
                                            </label>
                                        )}
                                    </div>

                                    {!availablePaymentMethods.includes('cod') && address.country !== 'DE' && (
                                        <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                                            <Banknote className="w-4 h-4" />
                                            Cash on Delivery is only available for Germany
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="space-y-6">
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50 sticky top-24">
                                    <h2 className="text-xl font-display font-medium text-primary mb-4">
                                        Order Summary
                                    </h2>

                                    {/* Cart Items */}
                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => {
                                            const itemName = item.bundleIndex !== null
                                                ? `${item.product.name} - ${item.product.bundles[item.bundleIndex].name}`
                                                : item.product.name;
                                            const itemPrice = item.bundleIndex !== null
                                                ? item.product.bundles[item.bundleIndex].price
                                                : item.product.price;

                                            return (
                                                <div key={`${item.productId}-${item.bundleIndex}`} className="flex gap-4">
                                                    <div className="h-16 w-16 bg-secondary/50 rounded-md overflow-hidden flex-shrink-0 border border-border/30">
                                                        {item.product.images?.[0] && (
                                                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-contain" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-primary text-sm">{itemName}</h4>
                                                        <div className="text-sm text-muted-foreground flex justify-between mt-1">
                                                            <span>Qty: {item.quantity}</span>
                                                            <span>€{(itemPrice * item.quantity).toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <Separator className="my-4" />

                                    {/* Shipping Info */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <Truck className="w-4 h-4" />
                                        <span>
                                            Estimated delivery: {totals.estimatedDays.min}-{totals.estimatedDays.max} business days
                                        </span>
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>{isCalculating ? '...' : formatPrice(totals.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Shipping {totals.isFreeShipping && <span className="text-green-600">(Free!)</span>}
                                            </span>
                                            <span>{isCalculating ? '...' : formatPrice(totals.shipping)}</span>
                                        </div>
                                        {totals.codFee > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">COD Fee</span>
                                                <span>{formatPrice(totals.codFee)}</span>
                                            </div>
                                        )}
                                        {totals.tax > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span>{formatPrice(totals.tax)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Separator className="my-4" />

                                    <div className="flex justify-between items-center text-lg font-medium mb-6">
                                        <span>Total</span>
                                        <span className="text-xl">{isCalculating ? '...' : formatPrice(totals.total)}</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isCalculating}
                                        className="w-full h-12 text-lg font-medium"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Placing Order...
                                            </>
                                        ) : (
                                            <>
                                                Place Order ({formatPrice(totals.total)})
                                            </>
                                        )}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Secure checkout • 30-day guarantee</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
