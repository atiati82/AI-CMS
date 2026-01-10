import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function AppMinimal() {
    console.log("[AppMinimal.tsx] Rendering");
    return (
        <QueryClientProvider client={queryClient}>
            <div style={{ padding: 20, color: 'white' }}>
                <h1>App Minimal (Debug)</h1>
                <p>If you see this, the issue is in the import graph of App.tsx</p>
                <Switch>
                    <Route path="/" component={() => <div>Home Page (Minimal)</div>} />
                    <Route path="/test" component={() => <div>Test Page (Minimal)</div>} />
                </Switch>
            </div>
        </QueryClientProvider>
    );
}

export default AppMinimal;
