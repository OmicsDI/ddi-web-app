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
    baseHref: 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/',
    webServiceUrl: 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/ws/',
    userServiceUrl: 'http://localhost:8080/profile-1.0-SNAPSHOT/api/',
    userServiceCookiePath: '/profile-1.0-SNAPSHOT/',
    schemaServiceUrl: 'https://www.omicsdi.org/ws/seo',
    thorUrl: 'https://www.ebi.ac.uk/europepmc/hubthor/api/dataclaiming/'
};
