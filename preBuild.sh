#!/usr/bin/env sh

# replace placeholders in dist/environment/environment.prod.ts
sed -i "s|___APIURL___|$___APIURL___|g" "src/environments/environment.prod.ts"
sed -i "s|__ENV__|$__ENV__|g" "src/environments/environment.prod.ts"
sed -i "s|__SENTRY_DSN__|$__SENTRY_DSN__|g" "src/environments/environment.prod.ts"
