import { useState, useEffect } from 'react';

/**
 * useFeaturePermission - Hook to check if current user has access to a specific feature.
 * Currently simplified for the current admin setup.
 */
export function useFeaturePermission(featureKey: string) {
    // For now, always return true as the system is in development mode
    // and full RBAC is not yet implemented in the frontend layer.
    const [hasAccess, setHasAccess] = useState(true);
    const [loading, setLoading] = useState(false);

    return {
        hasAccess,
        loading,
        canEdit: true,
        canDelete: true
    };
}

export default useFeaturePermission;
