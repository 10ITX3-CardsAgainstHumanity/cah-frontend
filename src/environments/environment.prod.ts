/*
 * The placeholders, ____XXX___, are replaced
 * from the preBuild.sh script.
 * The environment variables comes from cloudbuild.
 */

export const environment = {
  production: true,
  io: {
    url: '___APIURL___'
  },
  sentry: {
    dsn: '__SENTRY_DSN__',
    env: '__ENV__',
  }
};
