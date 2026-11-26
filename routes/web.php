<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__.'/settings.php';

$pagesPath = resource_path('js/pages');

if (is_dir($pagesPath)) {
    $registeredUris = collect(Route::getRoutes()->getRoutes())
        ->filter(fn ($route) => in_array('GET', $route->methods(), true))
        ->map(fn ($route) => trim($route->uri(), '/'))
        ->flip();

    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($pagesPath, FilesystemIterator::SKIP_DOTS)
    );

    $pageComponents = [];

    foreach ($files as $file) {
        if ($file->getExtension() !== 'tsx') {
            continue;
        }

        $pageComponents[] = str_replace(
            '\\',
            '/',
            substr($file->getPathname(), strlen($pagesPath) + 1, -4)
        );
    }

    usort($pageComponents, fn (string $a, string $b) => (int) str_contains($a, '[') <=> (int) str_contains($b, '['));

    foreach ($pageComponents as $component) {
        if (str_starts_with($component, '_') || str_contains($component, '/_')) {
            continue;
        }

        $segments = explode('/', $component);
        $middlewares = [];
        $uriSegments = [];

        foreach ($segments as $segment) {
            if (preg_match('/^\(([^)]+)\)$/', $segment, $matches) === 1) {
                foreach (explode(',', $matches[1]) as $mw) {
                    $mw = trim($mw);
                    if ($mw !== '') {
                        $middlewares[] = str_replace('-', '.', $mw);
                    }
                }

                continue;
            }

            $uriSegments[] = $segment;
        }

        $cleanPath = implode('/', $uriSegments);

        $uri = (string) preg_replace('/(^|\/)index$/', '', $cleanPath);
        $uri = (string) preg_replace('/\[([^\]]+)\]/', '{$1}', $uri);
        $uri = trim($uri, '/');

        if ($registeredUris->has($uri)) {
            continue;
        }

        $registeredUris->put($uri, true);

        $routeName = $uri === ''
            ? 'home'
            : str_replace(['/', '[', ']'], ['.', '', ''], $uri);

        $route = Route::get($uri === '' ? '/' : $uri, fn (Request $request) => inertia(
            $component,
            $request->route()?->parameters() ?? []
        ))->name($routeName);

        if ($middlewares !== []) {
            $route->middleware(array_values(array_unique($middlewares)));
        }
    }
}
