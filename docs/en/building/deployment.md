# Deployment

The site is fully static: `pnpm build` gives a `dist/` folder holding the home page, one page per deck, and their files. `pnpm docs:build` adds this guide in `dist/docs/`; it needs Python and Zensical, installed with `pip install -r docs/requirements.txt`.

## Screenshots

The sharing previews of the decks and the pictures of this guide are files of the repository, taken from the built site by one script, in the test container so that they look the same whoever takes them:

```bash
docker compose -f docker/compose.test.yml run --rm test sh -c "pnpm build && pnpm screenshots"
```

It writes `src/decks/<deck>/preview.png` for every deck, and, for each language of this guide, the pictures of the interface and of every slide of the demo in `docs/<language>/images/`. Run it again after changing the interface, the first slide of a deck or the demo.

## Tests

The repository holds a test suite: unit tests with Vitest (`tests/unit/`), and end-to-end tests with Playwright (`tests/e2e/`) that drive the built site in Chromium and Firefox, and on a phone. They go through the home page, the navigation, the toolbar at every width, the panels, full screen, the presenter view, the PDF export, every component of the demo, both languages, accessibility, the content security policy of production, the files of the build, and compare screenshots of the interface and of every slide with the ones of the repository.

They run in a container, the one CI uses, so that the screenshots are drawn the same way everywhere:

```bash
pnpm test:docker                                                   # the whole suite
docker compose -f docker/compose.test.yml run --rm test pnpm test:update   # after a visible change: take the screenshots again
```

`pnpm test:unit` runs the unit tests alone, without a container. The report of the last run is in `playwright-report/`. A test failing on purpose after a change of the interface or of the demo means taking the screenshots again, and checking them before committing.

## GitHub Pages

Every push to `main` runs `.github/workflows/pages.yml`: it runs the tests, lints, builds the site and this guide against the address given by Pages, checks that every deck has its page and preview and that the guide is there, publishes, then fetches the published home page, decks and guide back. In the settings of the repository, Pages must deploy from GitHub Actions.

## Releases

Pushing a version tag runs the tests, then publishes a GitHub release, with notes generated from the commits and the built site, guide included, attached as `react-slides-<version>.zip`:

```bash
git tag v1.0.0
git push origin v1.0.0
```

The site in the archive uses relative addresses, so it can be copied to any web server, at the root of a domain or in a folder.

## Docker

To run the site on a server with Docker, ports 80 and 443 open and a DNS record pointing the domain at it:

```bash
cp docker/.env.example docker/.env                        # then fill it in
docker compose -f docker/compose.prod.yml up -d --build   # start, or update after a git pull
docker compose -f docker/compose.prod.yml logs -f         # follow the logs
docker compose -f docker/compose.prod.yml down            # stop
```

| Setting in `docker/.env` | Meaning |
| --- | --- |
| `DOMAIN` | Domain the site is served on |
| `ACME_EMAIL` | Address Let's Encrypt writes to about the certificate |
| `DOCKER_GID` | Group owning the Docker socket, given by `stat -c %g /var/run/docker.sock` |
| `DEV_PORT` | Port of the development server, 5173 by default |

The stack runs three containers, from Docker Hardened Images:

- `app` serves the site and this guide with nginx. Hashed files are cached for a year and pages are always checked again, so a new version shows at the next visit.
- `traefik` obtains and renews the Let's Encrypt certificate, redirects HTTP to HTTPS, serves HTTP/2 and HTTP/3, compresses responses and adds the security headers. Its content security policy only lets in, from outside, the YouTube and Vimeo players and the YouTube pictures.
- `socket-proxy` gives Traefik read access to the list of containers only, instead of the whole Docker socket.

All three run as an unprivileged user, on a read-only file system, without any Linux capability, with memory limits and rotated logs.
