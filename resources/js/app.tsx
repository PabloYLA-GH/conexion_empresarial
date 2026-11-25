import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const layouts = import.meta.glob('./pages/**/_layout.tsx', {
    eager: true,
    import: 'default',
});

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        const segments = name.split('/');

        for (let i = segments.length - 1; i >= 0; i--) {
            const prefix = segments.slice(0, i).join('/');
            const key = prefix
                ? `./pages/${prefix}/_layout.tsx`
                : './pages/_layout.tsx';

            if (key in layouts) {
                return layouts[key];
            }
        }

        return null;
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
