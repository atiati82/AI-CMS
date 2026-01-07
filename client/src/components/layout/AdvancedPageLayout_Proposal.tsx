import React from 'react';
import LandingLayout from '@/templates/gpt/LandingLayout';

/**
 * AdvancedPageLayout_Proposal - A wrapper for experimental layout features.
 * Currently falls back to LandingLayout for stability until final design is approved.
 */
const AdvancedPageLayout_Proposal: React.FC<{ children: React.ReactNode } & any> = ({ children, ...props }) => {
    return (
        <LandingLayout {...props}>
            {children}
        </LandingLayout>
    );
};

export default AdvancedPageLayout_Proposal;
