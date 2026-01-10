import { useState } from "react";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
    Package, Truck, CheckCircle2, Clock, Search,
    ExternalLink, MapPin, CreditCard, ArrowLeft
} from "lucide-react";
import { Link } from "wouter";

interface TrackedOrder {
    orderNumber: string;
    status: string;
    total: number;
    currency: string;
    paymentMethod: string;
    shippingRegion: string;
    shippingAddress: {
        line1?: string;
        city?: string;
        postalCode?: string;
        country?: string;
    };
    trackingNumber?: string;
    trackingUrl?: string;
    createdAt: string;
    paidAt?: string;
    shippedAt?: string;
    deliveredAt?: string;
}

const STATUS_STEPS = [
    { key: 'pending', label: 'Order Placed', icon: Clock },
    { key: 'paid', label: 'Payment Received', icon: CreditCard },
    { key: 'processing', label: 'Processing', icon: Package },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderTrackingPage() {
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [order, setOrder] = useState<TrackedOrder | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(cents / 100);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIndex = (status: string) => {
        const idx = STATUS_STEPS.findIndex(s => s.key === status);
        return idx >= 0 ? idx : 0;
    };

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setOrder(null);
        setIsLoading(true);

        try {
            const res = await fetch("/api/shop/orders/track", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderNumber, email })
            });

            const data = await res.json();

            if (data.ok) {
                setOrder(data.order);
            } else {
                setError(data.error || "Order not found");
            }
        } catch (err) {
            setError("Failed to track order. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-secondary/30">
                <div className="container max-w-3xl mx-auto py-12 px-4">
                    <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shop
                    </Link>

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-accent" />
                        </div>
                        <h1 className="text-3xl font-display font-medium text-primary mb-2">
                            Track Your Order
                        </h1>
                        <p className="text-muted-foreground">
                            Enter your order number and email to check the status
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleTrack} className="bg-background rounded-xl p-6 shadow-sm border border-border/50 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Order Number</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg bg-background"
                                    placeholder="ORD-1234567890-ABCDEF"
                                    value={orderNumber}
                                    onChange={(e) => setOrderNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full p-3 border rounded-lg bg-background"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                            {isLoading ? (
                                "Searching..."
                            ) : (
                                <>
                                    <Search className="w-4 h-4 mr-2" />
                                    Track Order
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 text-center">
                            <p className="text-red-700 dark:text-red-300">{error}</p>
                        </div>
                    )}

                    {/* Order Details */}
                    {order && (
                        <div className="space-y-6">
                            {/* Status Timeline */}
                            <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                <h2 className="text-lg font-display font-medium text-primary mb-6">Order Status</h2>

                                <div className="relative">
                                    {/* Progress Line */}
                                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
                                    <div
                                        className="absolute left-4 top-0 w-0.5 bg-accent transition-all"
                                        style={{ height: `${(getStatusIndex(order.status) / (STATUS_STEPS.length - 1)) * 100}%` }}
                                    />

                                    {/* Steps */}
                                    <div className="space-y-6">
                                        {STATUS_STEPS.map((step, index) => {
                                            const isComplete = getStatusIndex(order.status) >= index;
                                            const isCurrent = STATUS_STEPS[getStatusIndex(order.status)]?.key === step.key;
                                            const Icon = step.icon;

                                            return (
                                                <div key={step.key} className="flex items-center gap-4 relative">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isComplete
                                                            ? 'bg-accent text-white'
                                                            : 'bg-background border-2 border-border text-muted-foreground'
                                                        }`}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className={`font-medium ${isComplete ? 'text-primary' : 'text-muted-foreground'}`}>
                                                            {step.label}
                                                            {isCurrent && <span className="ml-2 text-accent text-sm">(Current)</span>}
                                                        </p>
                                                        {step.key === 'pending' && order.createdAt && (
                                                            <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                                                        )}
                                                        {step.key === 'paid' && order.paidAt && (
                                                            <p className="text-sm text-muted-foreground">{formatDate(order.paidAt)}</p>
                                                        )}
                                                        {step.key === 'shipped' && order.shippedAt && (
                                                            <p className="text-sm text-muted-foreground">{formatDate(order.shippedAt)}</p>
                                                        )}
                                                        {step.key === 'delivered' && order.deliveredAt && (
                                                            <p className="text-sm text-muted-foreground">{formatDate(order.deliveredAt)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Tracking Info */}
                            {order.trackingNumber && (
                                <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                    <h2 className="text-lg font-display font-medium text-primary mb-4 flex items-center gap-2">
                                        <Truck className="w-5 h-5" />
                                        Tracking Information
                                    </h2>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Tracking Number</p>
                                            <p className="font-mono font-medium">{order.trackingNumber}</p>
                                        </div>
                                        {order.trackingUrl && (
                                            <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer">
                                                <Button variant="outline" className="gap-2">
                                                    Track Package
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Order Info */}
                            <div className="bg-background rounded-xl p-6 shadow-sm border border-border/50">
                                <h2 className="text-lg font-display font-medium text-primary mb-4">Order Details</h2>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Order Number</p>
                                        <p className="font-mono font-medium">{order.orderNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Total</p>
                                        <p className="font-medium text-lg">{formatPrice(order.total)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Payment Method</p>
                                        <p className="font-medium capitalize">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Shipping Region</p>
                                        <p className="font-medium capitalize">{order.shippingRegion}</p>
                                    </div>
                                </div>

                                {order.shippingAddress && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-muted-foreground text-sm flex items-center gap-1 mb-2">
                                            <MapPin className="w-4 h-4" />
                                            Shipping Address
                                        </p>
                                        <p className="text-sm">
                                            {order.shippingAddress.line1}<br />
                                            {order.shippingAddress.postalCode} {order.shippingAddress.city}<br />
                                            {order.shippingAddress.country}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
