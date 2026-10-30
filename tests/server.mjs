import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, "..");
const DIST = resolve(ROOT, "dist");
const BASE = "/react-slides/";
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".mp4": "video/mp4", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf", ".xml": "application/xml", ".txt": "text/plain" };

/** Reads a content security policy from the labels of the production stack, as Traefik serves it. */
function readPolicy(middleware) {
    const compose = readFileSync(resolve(ROOT, "docker/compose.prod.yml"), "utf8");
    const policy = new RegExp(`traefik\\.http\\.middlewares\\.${middleware}\\.headers\\.contentSecurityPolicy=(.+)`).exec(compose)?.[1];
    if (!policy)
        throw new Error(`No content security policy for ${middleware} in docker/compose.prod.yml`);
    return policy.trim();
}

const POLICIES = { app: readPolicy("security-headers"), docs: readPolicy("security-headers-docs") };

/** Serves the built site under the base path of GitHub Pages, redirecting folders like nginx and with the security policies of production. */
async function serve(request, response) {
    const [route] = request.url.split("?");
    if (!route.startsWith(BASE)) {
        response.writeHead(route==="/" ? 302 : 404, route==="/" ? { Location: BASE } : {});
        return response.end();
    }
    let path = normalize(join(DIST, decodeURIComponent(route.slice(BASE.length))));
    if (!path.startsWith(DIST)) {
        response.writeHead(403);
        return response.end();
    }
    try {
        if ((await stat(path)).isDirectory()) {
            if (!route.endsWith("/")) {
                response.writeHead(301, { Location: `${route}/` });
                return response.end();
            }
            path = join(path, "index.html");
        }
        const body = await readFile(path);
        response.writeHead(200, {
            "Content-Type": TYPES[extname(path)] ?? "application/octet-stream",
            "Content-Security-Policy": route.startsWith(`${BASE}docs/`) ? POLICIES.docs : POLICIES.app,
            "Cache-Control": "no-store"
        });
        response.end(body);
    } catch {
        response.writeHead(404);
        response.end();
    }
}

createServer(serve).listen(PORT, () => console.log(`test server on http://localhost:${PORT}${BASE}`));
