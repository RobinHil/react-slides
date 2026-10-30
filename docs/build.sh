#!/bin/sh
set -eu

cd "$(dirname "$0")"
rm -rf site
for language in en fr; do
    SITE_URL="${SITE_URL:+${SITE_URL%/}/docs/$language/}" zensical build --strict -f "mkdocs.$language.yml"
done
cp index.html site/
if [ -n "${1:-}" ]; then
    rm -rf "$OLDPWD/$1"
    mkdir -p "$(dirname "$OLDPWD/$1")"
    cp -R site "$OLDPWD/$1"
fi
