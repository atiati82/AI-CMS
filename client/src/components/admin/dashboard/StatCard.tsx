import React from "react";
import { TrendingUp } from "lucide-react";

export function StatCard({
    label,
    value,
    icon: Icon,
    gradient = "from-blue-500 to-blue-600",
    trend,
    trendLabel,
    subtitle
}: {
    label: string;
    value: number | string;
    icon: any;
    gradient?: string;
    trend?: number;
    trendLabel?: string;
    subtitle?: string;
}) {
    const isPositive = trend && trend > 0;
    const isNegative = trend && trend < 0;

    return (
        <div className="relative overflow-hidden glass-panel rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-linear-to-br opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: `linear-gradient(135deg, var(--admin-accent), var(--admin-accent-hover))` }} />

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                    <p className="text-3xl font-bold tracking-tight" data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                    )}
                    {trend !== undefined && (
                        <div className="flex items-center gap-1 mt-2">
                            <span className={`text-xs font-medium flex items-center gap-0.5 ${isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'}`}>
                                {isPositive && <TrendingUp className="w-3 h-3" />}
                                {isNegative && <TrendingUp className="w-3 h-3 rotate-180" />}
                                {isPositive ? '+' : ''}{trend}%
                            </span>
                            {trendLabel && <span className="text-xs text-muted-foreground">{trendLabel}</span>}
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl bg-linear-to-br ${gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}
