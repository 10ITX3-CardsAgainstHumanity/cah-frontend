#!/usr/bin/env sh

# replace placeholders in dist/environment/environment.prod.ts
sed -i "s|___APIURL___|$___APIURL___|g" "src/environments/environment.prod.ts"
sed -i "s|___ENV___|$___ENV___|g" "src/environments/environment.prod.ts"
sed -i "s|___SENTRY_DSN___|$___SENTRY_DSN___|g" "src/environments/environment.prod.ts"

echo $___APIURL___
echo $___ENV___
echo $___SENTRY_DSN___

cat src/environments/environment.prod.ts
