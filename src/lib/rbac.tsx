import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { supabase } from "./supabase";

export type UserRole = 'user' | 'admin' | 'salon_owner';

export interface Permission {
  resource: string;
  action: string;
}

interface RBACContextType {
  userRole: UserRole | null;
  permissions: Permission[];
  hasPermission: (resource: string, action: string) => boolean;
  isAdmin: () => boolean;
  isSalonOwner: () => boolean;
  isUser: () => boolean;
  loading: boolean;
}

const RBACContext = createContext<RBACContextType>({
  userRole: null,
  permissions: [],
  hasPermission: () => false,
  isAdmin: () => false,
  isSalonOwner: () => false,
  isUser: () => false,
  loading: true,
});

// Define role-based permissions
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // Admin can do everything
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'update' },
    { resource: 'users', action: 'delete' },
    { resource: 'salons', action: 'read' },
    { resource: 'salons', action: 'create' },
    { resource: 'salons', action: 'update' },
    { resource: 'salons', action: 'delete' },
    { resource: 'bookings', action: 'read' },
    { resource: 'bookings', action: 'create' },
    { resource: 'bookings', action: 'update' },
    { resource: 'bookings', action: 'delete' },
    { resource: 'reviews', action: 'read' },
    { resource: 'reviews', action: 'create' },
    { resource: 'reviews', action: 'update' },
    { resource: 'reviews', action: 'delete' },
    { resource: 'analytics', action: 'read' },
    { resource: 'dashboard', action: 'admin' },
  ],
  salon_owner: [
    // Salon owners can manage their own salons and related data
    { resource: 'salons', action: 'read' },
    { resource: 'salons', action: 'update' }, // Only their own
    { resource: 'services', action: 'read' },
    { resource: 'services', action: 'create' },
    { resource: 'services', action: 'update' },
    { resource: 'services', action: 'delete' },
    { resource: 'bookings', action: 'read' }, // Only their salon's bookings
    { resource: 'bookings', action: 'update' }, // Only their salon's bookings
    { resource: 'reviews', action: 'read' }, // Only their salon's reviews
    { resource: 'staff', action: 'read' },
    { resource: 'staff', action: 'create' },
    { resource: 'staff', action: 'update' },
    { resource: 'staff', action: 'delete' },
    { resource: 'dashboard', action: 'salon' },
  ],
  user: [
    // Regular users can manage their own data and make bookings
    { resource: 'salons', action: 'read' },
    { resource: 'services', action: 'read' },
    { resource: 'bookings', action: 'read' }, // Only their own
    { resource: 'bookings', action: 'create' },
    { resource: 'bookings', action: 'update' }, // Only their own
    { resource: 'reviews', action: 'read' },
    { resource: 'reviews', action: 'create' }, // Only for their bookings
    { resource: 'reviews', action: 'update' }, // Only their own
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'dashboard', action: 'user' },
  ],
};

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile) {
      setUserRole(profile.role as UserRole || 'user');
      setLoading(false);
    } else if (user && !profile) {
      // If user exists but no profile, default to user role
      setUserRole('user');
      setLoading(false);
    } else {
      setUserRole(null);
      setLoading(false);
    }
  }, [user, profile]);

  const permissions = userRole ? ROLE_PERMISSIONS[userRole] : [];

  const hasPermission = (resource: string, action: string): boolean => {
    if (!userRole) return false;
    
    return permissions.some(
      permission => permission.resource === resource && permission.action === action
    );
  };

  const isAdmin = (): boolean => userRole === 'admin';
  const isSalonOwner = (): boolean => userRole === 'salon_owner';
  const isUser = (): boolean => userRole === 'user';

  return (
    <RBACContext.Provider value={{
      userRole,
      permissions,
      hasPermission,
      isAdmin,
      isSalonOwner,
      isUser,
      loading,
    }}>
      {children}
    </RBACContext.Provider>
  );
}

export function useRBAC() {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
}

// Higher-order component for protecting routes
export function withRoleProtection<T extends object>(
  Component: React.ComponentType<T>,
  requiredRole: UserRole | UserRole[],
  fallbackComponent?: React.ComponentType
) {
  return function ProtectedComponent(props: T) {
    const { userRole, loading } = useRBAC();
    
    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>;
    }

    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const hasAccess = userRole && allowedRoles.includes(userRole);

    if (!hasAccess) {
      if (fallbackComponent) {
        const FallbackComponent = fallbackComponent;
        return <FallbackComponent />;
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-sm text-gray-600 mb-4">
              You don't have permission to access this page. Required role: {allowedRoles.join(' or ')}.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Hook for permission-based UI rendering
export function usePermission(resource: string, action: string): boolean {
  const { hasPermission } = useRBAC();
  return hasPermission(resource, action);
}

// Component for conditional rendering based on permissions
export function PermissionGate({ 
  resource, 
  action, 
  children, 
  fallback = null 
}: {
  resource: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const hasPermission = usePermission(resource, action);
  
  return hasPermission ? <>{children}</> : <>{fallback}</>;
}

// Role-based component rendering
export function RoleGate({ 
  roles, 
  children, 
  fallback = null 
}: {
  roles: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { userRole } = useRBAC();
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  const hasAccess = userRole && allowedRoles.includes(userRole);
  
  return hasAccess ? <>{children}</> : <>{fallback}</>;
}