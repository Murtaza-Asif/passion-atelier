import './bootstrap';
import '../css/app.css';
import '../css/styles.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './Lib/cart-context';
import { AuthProvider, PendingCartRestorer } from './Lib/auth-context';
import { CartDrawer } from './Layouts/cart-drawer';
import { AuthModal } from './Components/AuthModal';
import { useCart } from './Lib/cart-context';
import { ErrorBoundary } from './Components/ErrorBoundary';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function AppShell({ children }) {
  return (
    <ErrorBoundary>
      <CartProvider>
        <AuthProvider>
          {children}
          <CartGlobal />
          <AuthModal />
          <PendingCartRestorer />
        </AuthProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

function CartGlobal() {
  const { cartOpen, closeCart } = useCart();
  return <CartDrawer open={cartOpen} onClose={closeCart} />;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.{tsx,jsx}');
        return resolvePageComponent(`./Pages/${name}.tsx`, pages)
            .catch(() => resolvePageComponent(`./Pages/${name}.jsx`, pages));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
          <AppShell>
            <App {...props} />
          </AppShell>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
