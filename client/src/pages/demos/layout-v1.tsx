import React from 'react';
import StandardPageLayout from '@/components/StandardPageLayout';

export default function DemoLayoutV1() {
    return (
        <StandardPageLayout
            title="Demo Layout V1"
            subtitle="Testing Automatic Routing"
            heroImage="/images/hero-placeholder.jpg"

            seoTitle="Demo Layout V1"
            seoDescription="Testing the new StandardPageLayout component"
        >
            <div className="p-8 max-w-4xl mx-auto text-white">
                <h2 className="text-2xl font-bold mb-4">Automatic Routing Works!</h2>
                <p className="mb-4">
                    This page was automatically routed because it exists at
                    <code className="bg-slate-800 p-1 rounded mx-1">client/src/pages/demo/layout-v1.tsx</code>.
                </p>
                <p>
                    You can now add any file to the <code className="bg-slate-800 p-1 rounded">pages</code> directory
                    and it will be automatically available as a route.
                </p>
            </div>
        </StandardPageLayout>
    );
}
