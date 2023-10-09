export const environment = {
  production: true,
  apiUrl: 'http://dns:8081',

  tokenWhitelistedDomains: [ /dns:8081/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
