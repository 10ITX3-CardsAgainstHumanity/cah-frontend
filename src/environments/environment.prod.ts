/*
 * The placeholders, ____XXX___, are replaced
 * from the preBuild.sh script.
 * The environment variables comes from cloudbuild.
 */

export const environment = {
  production: true,
  io: {
    url: '___APIURL___',
    env: '__ENV__',
    sentryDsn: '__SENTRY_DSN___'
  }
};
