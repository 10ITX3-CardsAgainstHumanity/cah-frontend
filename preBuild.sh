#!/usr/bin/env sh

# replace placeholders in dist/environment/environment.ts

# ___APIURL___
sed -i "s|___APIURL___|$___APIURL___|g" "src/environments/environment.ts"
