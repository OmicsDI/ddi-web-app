// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    topDomain: 'omics',
    logoUri: './static/images/logo/imageedit_2_3220380406.png',
    title: 'OmicsDI',
    topStripClass: 'navbar-inverse',
    production: false,
    baseHref: '/',
    webServiceUrl : 'http://dev.omicsdi.org/ws/',
    userServiceUrl: 'http://dev.omicsdi.org/profilews/api/',
    userServiceCookiePath: '/profilews/',
    whileList: ['localhost:4200', 'dev.omicsdi.org', 'omicsdi.org', 'stage.omicsdi.org'],
    schemaServiceUrl: 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/ws/seo',
    thorUrl: 'https://www.ebi.ac.uk/europepmc/hubthor/api/dataclaiming/'
};
