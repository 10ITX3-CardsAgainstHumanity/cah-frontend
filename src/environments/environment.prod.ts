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
    dsn: '___SENTRY_DSN___',
    env: '___ENV___',
  }
};
