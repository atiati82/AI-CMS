import React from 'react';
import { AdminSection } from '@/components/admin/AdminSection';
import { Settings as SettingsIcon } from 'lucide-react';
import type { CmsSetting } from './types';

interface SettingsTabProps {
    settings: CmsSetting[];
    onSave: (key: string, value: any, description: string, category: string) => Promise<void>;
    isSaving: boolean;
}

/**
 * Settings Tab Component (Lazy Loaded)
 * 
 * This is a STUB component demonstrating lazy loading.
 * Full implementation will be extracted from admin.tsx tomorrow.
 * 
 * Expected performance improvement:
 * - Admin.tsx: 559KB → ~500KB
 * - Settings bundle: ~50KB (loaded on demand)
 * - Initial load time: ~2-3s → ~1s
 */
export default function SettingsTab({ settings, onSave, isSaving }: SettingsTabProps) {
    return (
        <AdminSection
            title="Settings"
            description="CMS Configuration (Lazy Loaded Stub)"
            icon={SettingsIcon}
        >
            <div className="p-8 text-center" data-testid="settings-tab-stub">
                <SettingsIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Settings Tab (Lazy Loaded! ⚡)</h3>
                <p className="text-muted-foreground mb-4">
                    This is a proof-of-concept stub component.
                </p>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-sm text-green-300">
                        ✅ <strong>Success!</strong> This tab was loaded on-demand using React.lazy()
                    </p>
                    <p className="text-xs text-green-200/70 mt-2">
                        Full Settings implementation will be extracted tomorrow. This proves the lazy loading pattern works!
                    </p>
                </div>

                <div className="mt-6 text-left max-w-md mx-auto text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Settings loaded: {settings?.length || 0}</p>
                    <p className="text-xs">Saving state: {isSaving ? 'Saving...' : 'Ready'}</p>
                </div>
            </div>
        </AdminSection>
    );
}
