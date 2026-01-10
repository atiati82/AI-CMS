import React, { useState } from "react";
import { setAuthToken } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok && data.token) {
                setAuthToken(data.token);
                onLogin();
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
            <div className="bg-card p-8 rounded-xl border shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-display font-bold mb-2 text-center" data-testid="text-login-title">
                    Andara Ionic CMS
                </h1>
                <p className="text-muted-foreground text-center mb-6">Sign in to manage content</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Username</Label>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            data-testid="input-username"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=""
                            data-testid="input-password"
                        />
                    </div>
                    {error && <p className="text-destructive text-sm" data-testid="text-login-error">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading} data-testid="button-login">
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
