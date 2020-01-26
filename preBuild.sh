#!/usr/bin/env sh

# replace placeholders in dist/environment/environment.prod.ts

# ___APIURL___
sed -i "s|___APIURL___|$___APIURL___|g" "src/environments/environment.prod.ts"
