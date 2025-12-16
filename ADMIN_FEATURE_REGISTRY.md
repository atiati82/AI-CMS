# Admin Feature Registry - Design Document

## Overview

The Admin Feature Registry is a centralized system for registering, managing, and controlling admin features. It ensures consistent feature integration across routes, navigation, permissions, and audit logging.

## Problem Statement

**Current Issues:**
- Ad-hoc admin features scattered across codebase
- No centralized permission management
- Inconsistent navigation structure
- Missing audit trails for admin actions
- Difficult to test feature visibility/permissions

**Solution:**
Centralized registry where every admin feature must be registered with:
1. Feature key (unique identifier)
2. Route configuration
3. Navigation group and slot
4. Display order
5. Permission requirements
6. API bindings
7. Audit log events

---

## Registry Schema

### Feature Registration

```typescript
interface AdminFeature {
  // Identity
  featureKey: string;                    // Unique identifier (e.g., 'pages', 'products', 'ai-chat')
  name: string;                          // Display name
  description: string;                   // Feature description
  icon: LucideIcon;                      // Icon component
  
  // Routing
  route: {
    path: string;                        // Route path (e.g., '/admin/pages')
    component: React.ComponentType;      // Component to render
    exact?: boolean;                     // Exact path match
  };
  
  // Navigation
  navigation: {
    group: 'content' | 'ecommerce' | 'ai' | 'seo' | 'settings' | 'system';
    slot: number;                        // Display order within group (0-99)
    label: string;                       // Nav label
    badge?: () => number | string;       // Optional badge (e.g., count)
    hidden?: boolean;                    // Hide from nav
  };
  
  // Permissions
  permissions: {
    required: string[];                  // Required permissions (e.g., ['admin', 'pages.write'])
    optional?: string[];                 // Optional permissions for enhanced features
    roles?: string[];                    // Required roles (e.g., ['admin', 'editor'])
  };
  
  // API Bindings
  api: {
    endpoints: string[];                 // API endpoints used by this feature
    methods: ('GET' | 'POST' | 'PUT' | 'DELETE')[];
  };
  
  // Audit Logging
  audit: {
    events: AuditEvent[];                // Events to log
    category: string;                    // Audit category
  };
  
  // Metadata
  metadata: {
    version: string;                     // Feature version
    author?: string;                     // Feature author
    dependencies?: string[];             // Other features this depends on
    experimental?: boolean;              // Experimental feature flag
  };
}

interface AuditEvent {
  action: string;                        // Action name (e.g., 'page.create', 'page.update')
  severity: 'info' | 'warning' | 'critical';
  message: string;                       // Log message template
}
```

---

## Implementation

### 1. Registry File

**Location**: `client/src/config/adminFeatureRegistry.ts`

```typescript
import { FileText, Package, Beaker, Brain, Search, Settings } from 'lucide-react';
import PagesTab from '@/components/admin/tabs/PagesTab';
import ProductsTab from '@/components/admin/tabs/ProductsTab';
// ... other imports

export const ADMIN_FEATURES: Record<string, AdminFeature> = {
  pages: {
    featureKey: 'pages',
    name: 'Pages',
    description: 'Manage website pages and content',
    icon: FileText,
    
    route: {
      path: '/admin/pages',
      component: PagesTab,
      exact: true,
    },
    
    navigation: {
      group: 'content',
      slot: 10,
      label: 'Pages',
      badge: () => usePageCount(), // Hook to get page count
    },
    
    permissions: {
      required: ['admin'],
      optional: ['pages.write', 'pages.delete'],
      roles: ['admin', 'editor'],
    },
    
    api: {
      endpoints: [
        '/api/pages',
        '/api/admin/pages',
        '/api/admin/pages/:id',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    
    audit: {
      events: [
        { action: 'page.create', severity: 'info', message: 'Created page: {title}' },
        { action: 'page.update', severity: 'info', message: 'Updated page: {title}' },
        { action: 'page.delete', severity: 'warning', message: 'Deleted page: {title}' },
        { action: 'page.publish', severity: 'info', message: 'Published page: {title}' },
      ],
      category: 'content',
    },
    
    metadata: {
      version: '1.0.0',
      author: 'Core Team',
    },
  },
  
  products: {
    featureKey: 'products',
    name: 'Products',
    description: 'Manage ecommerce products',
    icon: Package,
    
    route: {
      path: '/admin/products',
      component: ProductsTab,
    },
    
    navigation: {
      group: 'ecommerce',
      slot: 10,
      label: 'Products',
    },
    
    permissions: {
      required: ['admin'],
      optional: ['products.write'],
    },
    
    api: {
      endpoints: ['/api/products', '/api/admin/products'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
    
    audit: {
      events: [
        { action: 'product.create', severity: 'info', message: 'Created product: {name}' },
        { action: 'product.update', severity: 'info', message: 'Updated product: {name}' },
        { action: 'product.delete', severity: 'warning', message: 'Deleted product: {name}' },
      ],
      category: 'ecommerce',
    },
    
    metadata: {
      version: '1.0.0',
    },
  },
  
  // ... more features
};

// Navigation groups configuration
export const NAV_GROUPS = {
  content: { label: 'Content', order: 1 },
  ecommerce: { label: 'Ecommerce', order: 2 },
  ai: { label: 'AI Tools', order: 3 },
  seo: { label: 'SEO', order: 4 },
  settings: { label: 'Settings', order: 5 },
  system: { label: 'System', order: 6 },
};
```

---

### 2. Permission Guard Hook

**Location**: `client/src/hooks/useFeaturePermission.ts`

```typescript
import { useAuth } from '@/hooks/useAuth';
import { ADMIN_FEATURES } from '@/config/adminFeatureRegistry';

export function useFeaturePermission(featureKey: string) {
  const { user, permissions } = useAuth();
  const feature = ADMIN_FEATURES[featureKey];
  
  if (!feature) {
    console.warn(`Feature ${featureKey} not found in registry`);
    return { hasAccess: false, missingPermissions: [] };
  }
  
  // Check required permissions
  const missingPermissions = feature.permissions.required.filter(
    perm => !permissions.includes(perm)
  );
  
  // Check roles if specified
  const hasRole = !feature.permissions.roles || 
    feature.permissions.roles.some(role => user?.roles?.includes(role));
  
  const hasAccess = missingPermissions.length === 0 && hasRole;
  
  return {
    hasAccess,
    missingPermissions,
    optionalPermissions: feature.permissions.optional || [],
  };
}
```

---

### 3. Audit Logger

**Location**: `client/src/lib/auditLogger.ts`

```typescript
import { ADMIN_FEATURES } from '@/config/adminFeatureRegistry';

interface AuditLogEntry {
  timestamp: Date;
  featureKey: string;
  action: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  userId: string;
  metadata?: Record<string, any>;
}

export class AuditLogger {
  static async log(
    featureKey: string,
    action: string,
    data: Record<string, any> = {}
  ) {
    const feature = ADMIN_FEATURES[featureKey];
    if (!feature) {
      console.error(`Cannot log audit: feature ${featureKey} not found`);
      return;
    }
    
    const event = feature.audit.events.find(e => e.action === action);
    if (!event) {
      console.warn(`Audit event ${action} not registered for ${featureKey}`);
      return;
    }
    
    // Replace template variables in message
    const message = event.message.replace(/\{(\w+)\}/g, (_, key) => data[key] || '');
    
    const entry: AuditLogEntry = {
      timestamp: new Date(),
      featureKey,
      action,
      severity: event.severity,
      message,
      userId: data.userId || 'unknown',
      metadata: data,
    };
    
    // Send to backend
    await fetch('/api/admin/audit-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[AUDIT] ${entry.severity.toUpperCase()}: ${message}`);
    }
  }
}
```

---

### 4. Dynamic Navigation

**Location**: `client/src/components/admin/DynamicAdminNav.tsx`

```typescript
import { ADMIN_FEATURES, NAV_GROUPS } from '@/config/adminFeatureRegistry';
import { useFeaturePermission } from '@/hooks/useFeaturePermission';

export function DynamicAdminNav() {
  // Group features by navigation group
  const groupedFeatures = Object.values(ADMIN_FEATURES)
    .filter(f => !f.navigation.hidden)
    .reduce((acc, feature) => {
      const group = feature.navigation.group;
      if (!acc[group]) acc[group] = [];
      acc[group].push(feature);
      return acc;
    }, {} as Record<string, AdminFeature[]>);
  
  // Sort groups and features
  const sortedGroups = Object.entries(groupedFeatures)
    .sort(([a], [b]) => NAV_GROUPS[a].order - NAV_GROUPS[b].order)
    .map(([group, features]) => ({
      group,
      label: NAV_GROUPS[group].label,
      features: features.sort((a, b) => a.navigation.slot - b.navigation.slot),
    }));
  
  return (
    <nav>
      {sortedGroups.map(({ group, label, features }) => (
        <div key={group} className="nav-group">
          <h3>{label}</h3>
          {features.map(feature => (
            <FeatureNavItem key={feature.featureKey} feature={feature} />
          ))}
        </div>
      ))}
    </nav>
  );
}

function FeatureNavItem({ feature }: { feature: AdminFeature }) {
  const { hasAccess } = useFeaturePermission(feature.featureKey);
  
  if (!hasAccess) return null;
  
  const Icon = feature.icon;
  const badge = feature.navigation.badge?.();
  
  return (
    <Link to={feature.route.path} className="nav-item">
      <Icon className="w-4 h-4" />
      <span>{feature.navigation.label}</span>
      {badge && <Badge>{badge}</Badge>}
    </Link>
  );
}
```

---

### 5. Feature Route Guard

**Location**: `client/src/components/admin/FeatureRoute.tsx`

```typescript
import { Navigate } from 'react-router-dom';
import { useFeaturePermission } from '@/hooks/useFeaturePermission';
import { ADMIN_FEATURES } from '@/config/adminFeatureRegistry';

export function FeatureRoute({ featureKey }: { featureKey: string }) {
  const feature = ADMIN_FEATURES[featureKey];
  const { hasAccess, missingPermissions } = useFeaturePermission(featureKey);
  
  if (!feature) {
    return <div>Feature not found</div>;
  }
  
  if (!hasAccess) {
    console.warn(`Access denied to ${featureKey}. Missing: ${missingPermissions.join(', ')}`);
    return <Navigate to="/admin/unauthorized" />;
  }
  
  const Component = feature.route.component;
  return <Component />;
}
```

---

### 6. Testing

**Location**: `tests/admin/featureRegistry.test.tsx`

```typescript
import { render, screen } from '@testing-library/react';
import { DynamicAdminNav } from '@/components/admin/DynamicAdminNav';
import { FeatureRoute } from '@/components/admin/FeatureRoute';
import { AuthProvider } from '@/contexts/AuthContext';

describe('Admin Feature Registry', () => {
  it('should show feature in nav when user has permission', () => {
    const mockUser = {
      id: '1',
      permissions: ['admin', 'pages.write'],
      roles: ['admin'],
    };
    
    render(
      <AuthProvider value={{ user: mockUser, permissions: mockUser.permissions }}>
        <DynamicAdminNav />
      </AuthProvider>
    );
    
    expect(screen.getByText('Pages')).toBeInTheDocument();
  });
  
  it('should hide feature from nav when user lacks permission', () => {
    const mockUser = {
      id: '1',
      permissions: [],
      roles: ['viewer'],
    };
    
    render(
      <AuthProvider value={{ user: mockUser, permissions: [] }}>
        <DynamicAdminNav />
      </AuthProvider>
    );
    
    expect(screen.queryByText('Pages')).not.toBeInTheDocument();
  });
  
  it('should redirect when accessing feature without permission', () => {
    const mockUser = {
      id: '1',
      permissions: [],
      roles: [],
    };
    
    render(
      <AuthProvider value={{ user: mockUser, permissions: [] }}>
        <FeatureRoute featureKey="pages" />
      </AuthProvider>
    );
    
    // Should redirect to unauthorized page
    expect(window.location.pathname).toBe('/admin/unauthorized');
  });
  
  it('should render feature when user has permission', () => {
    const mockUser = {
      id: '1',
      permissions: ['admin'],
      roles: ['admin'],
    };
    
    render(
      <AuthProvider value={{ user: mockUser, permissions: mockUser.permissions }}>
        <FeatureRoute featureKey="pages" />
      </AuthProvider>
    );
    
    // Feature component should render
    expect(screen.getByTestId('pages-tab')).toBeInTheDocument();
  });
});
```

---

## Usage Example

### Adding a New Feature

```typescript
// 1. Register in adminFeatureRegistry.ts
export const ADMIN_FEATURES = {
  // ... existing features
  
  'ai-chat': {
    featureKey: 'ai-chat',
    name: 'AI Chat',
    description: 'BigMind AI assistant',
    icon: Brain,
    
    route: {
      path: '/admin/ai-chat',
      component: AIChatTab,
    },
    
    navigation: {
      group: 'ai',
      slot: 10,
      label: 'BigMind Chat',
    },
    
    permissions: {
      required: ['admin'],
      optional: ['ai.advanced'],
    },
    
    api: {
      endpoints: ['/api/ai/chat'],
      methods: ['POST'],
    },
    
    audit: {
      events: [
        { action: 'chat.message', severity: 'info', message: 'Sent message to AI' },
      ],
      category: 'ai',
    },
    
    metadata: {
      version: '1.0.0',
      experimental: true,
    },
  },
};

// 2. Use in component
import { AuditLogger } from '@/lib/auditLogger';

function AIChatTab() {
  const handleSendMessage = async (message: string) => {
    // Send message
    const response = await sendToAI(message);
    
    // Log audit event
    await AuditLogger.log('ai-chat', 'chat.message', {
      userId: user.id,
      message: message.substring(0, 100),
    });
  };
  
  return <div>AI Chat Interface</div>;
}
```

---

## Benefits

1. **Centralized Control**: All features in one place
2. **Consistent Permissions**: Standardized permission checks
3. **Audit Trail**: Automatic logging of all admin actions
4. **Testable**: Easy to test feature visibility and permissions
5. **Self-Documenting**: Registry serves as feature documentation
6. **Type-Safe**: TypeScript ensures correct registration
7. **Dynamic Navigation**: Nav automatically updates based on permissions

---

## Migration Plan

### Phase 1: Infrastructure (Week 1)
- Create registry schema
- Build permission hooks
- Implement audit logger
- Create test framework

### Phase 2: Core Features (Week 2)
- Register existing features (pages, products, clusters, articles)
- Migrate navigation to use registry
- Add permission guards

### Phase 3: Advanced Features (Week 3)
- Register AI features
- Register SEO features
- Add audit logging to all features

### Phase 4: Testing & Documentation (Week 4)
- Write comprehensive tests
- Document all features
- Create developer guide

---

## Next Steps

1. **Immediate**: Create the registry infrastructure
2. **Short-term**: Register all existing admin features
3. **Medium-term**: Add comprehensive tests
4. **Long-term**: Extend with feature flags, A/B testing

---

## Conclusion

The Admin Feature Registry provides a robust, scalable foundation for managing admin features. It ensures consistency, security, and maintainability across the entire admin panel.
