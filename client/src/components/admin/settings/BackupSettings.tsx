import React, { useState } from 'react';
import { GoldLogoLoader } from "@/components/ui/GoldLogoLoader";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Loader2, Database, Download, HardDrive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BackupFile {
    name: string;
    path: string;
    size: number;
    formattedSize: string;
    created: string;
}

export function BackupSettings() {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isCreating, setIsCreating] = useState(false);

    const { data: backups, isLoading } = useQuery<BackupFile[]>({
        queryKey: ['/api/admin/backups'],
        queryFn: async () => {
            const res = await apiRequest('GET', '/api/admin/backups');
            return res.json();
        },
        refetchInterval: 30000 // Refresh every 30s
    });

    const handleCreateBackup = async () => {
        setIsCreating(true);
        try {
            const res = await apiRequest('POST', '/api/admin/backups/trigger');
            if (res.ok) {
                toast({
                    title: "Backup Started",
                    description: "Database backup process has been triggered.",
                });
                // Wait a bit and refresh list
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ['/api/admin/backups'] });
                }, 2000);
            } else {
                throw new Error('Failed to trigger backup');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to start backup process",
                variant: "destructive",
            });
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Database className="w-5 h-5 text-primary" />
                        Database Backups
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage database snapshots. Automated backups run every 5 minutes and are retained for 24 hours.
                    </p>
                </div>
                <Button
                    onClick={handleCreateBackup}
                    disabled={isCreating}
                >
                    {isCreating ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <HardDrive className="w-4 h-4 mr-2" />
                            Create New Backup
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{backups?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">snapshots stored</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Latest Backup</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {backups && backups.length > 0 ? (
                                <span className="text-sm font-normal truncate block">
                                    {new Date(backups[0].created).toLocaleTimeString()}
                                </span>
                            ) : (
                                "None"
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {backups && backups.length > 0 ? new Date(backups[0].created).toLocaleDateString() : ""}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Active
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Schedule: Every 5 min</p>
                    </CardContent>
                </Card>
            </div>

            <div className="border rounded-lg bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Filename</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <div className="flex justify-center">
                                        <GoldLogoLoader size={32} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : backups?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No backups found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            backups?.slice(0, 10).map((file) => (
                                <TableRow key={file.name}>
                                    <TableCell className="font-mono text-xs">{file.name}</TableCell>
                                    <TableCell>{file.formattedSize}</TableCell>
                                    <TableCell>
                                        {new Date(file.created).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" disabled title="Download not implemented yet">
                                            <Download className="w-4 h-4 text-muted-foreground" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {backups && backups.length > 10 && (
                    <div className="p-2 text-center text-xs text-muted-foreground border-t bg-muted/20">
                        Showing latest 10 of {backups.length} backups
                    </div>
                )}
            </div>
        </div>
    );
}
