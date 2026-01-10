// Stub module for react-helmet
// Provides a no-op Helmet component for SSR-free builds
import React from 'react';

interface HelmetProps {
    children?: React.ReactNode;
}

interface ElementProps {
    children?: string;
    name?: string;
    property?: string;
    [key: string]: string | undefined;
}

export function Helmet({ children }: HelmetProps) {
    // Extract metadata from children and apply to document head
    React.useEffect(() => {
        React.Children.forEach(children, (child) => {
            if (React.isValidElement<ElementProps>(child)) {
                const childType = child.type as string;
                const props = child.props;

                if (childType === 'title' && typeof props.children === 'string') {
                    document.title = props.children;
                } else if (childType === 'meta') {
                    const meta = document.createElement('meta');
                    Object.entries(props).forEach(([key, value]) => {
                        if (key !== 'children' && typeof value === 'string') {
                            meta.setAttribute(key, value);
                        }
                    });
                    // Check for existing meta with same name/property
                    const nameAttr = props.name || '';
                    const propertyAttr = props.property || '';
                    const existingMeta = document.querySelector(
                        `meta[name="${nameAttr}"], meta[property="${propertyAttr}"]`
                    );
                    if (existingMeta) {
                        existingMeta.replaceWith(meta);
                    } else {
                        document.head.appendChild(meta);
                    }
                }
            }
        });
    }, [children]);

    return null;
}

export default Helmet;
