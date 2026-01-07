import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Search, ShoppingBag, Truck, CheckCircle2, XCircle, MoreHorizontal, Package, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

type Order = {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    amount?: number; // fallback for some API versions
    currency: string;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    items?: Array<{ name: string; quantity: number; price: number }>;
    createdAt: string;
};

export default function OrdersTab() {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const { data: orders = [], isLoading } = useQuery<Order[]>({
        queryKey: ['/api/admin/orders'],
    });

    const { data: stats } = useQuery<{ totalOrders: number; pendingOrders: number; totalRevenue: number }>({
        queryKey: ['/api/admin/orders/stats'],
    });

    const updateStatusMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            await apiRequest('PUT', `/api/admin/orders/${id}/status`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/admin/orders'] });
            queryClient.invalidateQueries({ queryKey: ['/api/admin/orders/stats'] });
            toast({ title: "Order Updated", description: "Status changed successfully." });
        },
        onError: (error: Error) => {
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        }
    });

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
            case 'paid': return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
            case 'refunded': return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin opacity-50" /></div>;
    }

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            {/* Stats Header */}
            {stats && (
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                            <Package className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur-sm border-green-500/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <div className="font-bold text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded">USD</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${(stats.totalRevenue / 100).toFixed(2)}</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by email or ID..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders List */}
            <div className="border rounded-xl  flex-1 overflow-auto bg-card shadow-sm">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[100px]">Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Quick Status</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                                    <Package className="w-10 h-10 mx-auto mb-2 opacity-20" />
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map(order => (
                                <TableRow key={order.id} className="group hover:bg-muted/30">
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        #{order.id.substring(0, 8)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{order.customerName || 'N/A'}</div>
                                        <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {format(new Date(order.createdAt), 'MMM d, yyyy')}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider", getStatusColor(order.status))}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-primary">
                                        ${((order.total || order.amount || 0) / 100).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={order.status}
                                            onValueChange={(status) => updateStatusMutation.mutate({ id: order.id, status })}
                                        >
                                            <SelectTrigger className="w-[130px] h-8 text-xs" data-testid={`select-status-${order.id}`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="paid">Paid</SelectItem>
                                                <SelectItem value="processing">Processing</SelectItem>
                                                <SelectItem value="shipped">Shipped</SelectItem>
                                                <SelectItem value="delivered">Delivered</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                <SelectItem value="refunded">Refunded</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="group-hover:text-primary transition-colors" onClick={() => setSelectedOrder(order)}>
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Order Details Modal */}
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            Order Details
                            <Badge variant="outline" className="font-mono text-xs">#{selectedOrder?.id}</Badge>
                        </DialogTitle>
                        <DialogDescription>
                            Placed on {selectedOrder && format(new Date(selectedOrder.createdAt), 'PPP p')}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6 pt-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Customer</h4>
                                    <p className="font-medium text-sm">{selectedOrder.customerName}</p>
                                    <p className="text-xs text-muted-foreground">{selectedOrder.customerEmail}</p>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase">Payment Status</h4>
                                    <Badge variant="secondary" className={getStatusColor(selectedOrder.status)}>
                                        {selectedOrder.status}
                                    </Badge>
                                </div>
                            </div>

                            {selectedOrder.items && selectedOrder.items.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">Order Items</h4>
                                    <div className="border rounded-xl overflow-hidden divide-y bg-muted/20">
                                        {selectedOrder.items.map((item, i) => (
                                            <div key={i} className="flex justify-between p-3 text-sm items-center">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{item.name}</span>
                                                    <span className="text-xs text-muted-foreground">Quantity: {item.quantity}</span>
                                                </div>
                                                <span className="font-mono text-xs">${(item.price / 100).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between p-3 font-bold bg-primary/5 text-primary">
                                            <span>Subtotal</span>
                                            <span>${((selectedOrder.total || selectedOrder.amount || 0) / 100).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Update Status</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {['processing', 'shipped', 'delivered', 'cancelled', 'refunded'].map(status => (
                                        <Button
                                            key={status}
                                            variant={selectedOrder.status === status ? "default" : "outline"}
                                            size="sm"
                                            className="capitalize h-8 text-xs"
                                            onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status })}
                                            disabled={updateStatusMutation.isPending || selectedOrder.status === status}
                                        >
                                            {status === 'shipped' && <Truck className="w-3 h-3 mr-1" />}
                                            {status === 'delivered' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
                                            {status}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="bg-muted/30 -mx-6 -mb-6 p-4 rounded-b-xl border-t">
                        <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>Close</Button>
                        <Button size="sm">
                            <ExternalLink className="w-3 h-3 mr-2" /> View in Stripe
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
