import React, { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react"; // Import Monitor if you want a system option, otherwise just Sun/Moon
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AndaraMode } from "@/lib/andaraTheme";
import { setAndaraMode, detectInitialMode } from "@/lib/theme/applyTheme";

export function ThemeToggle() {
    const [mode, setMode] = useState<AndaraMode>("light");

    useEffect(() => {
        // on mount, detect current mode (this might be slightly off if we don't expose a listener, 
        // but detectInitialMode gets us the current state from storage/DOM)
        setMode(detectInitialMode());
    }, []);

    const handleModeChange = (newMode: "light" | "dark") => {
        setAndaraMode(newMode);
        setMode(newMode);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-white hover:bg-white/5">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleModeChange("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleModeChange("dark")}>
                    Dark
                </DropdownMenuItem>
                {/* Admin mode is typically internal, but we could expose it if desired. 
            For public facing toggle, Light/Dark is usually sufficient. 
            If "System" is needed, we'd need more logic in applyTheme.ts. 
            For now, stick to Light/Dark explicitly as per request. */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
