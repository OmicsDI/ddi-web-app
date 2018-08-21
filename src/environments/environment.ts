// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    // webServiceUrl : 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/ws/',
    // userServiceUrl : 'http://wwwdev.ebi.ac.uk/Tools/omicsdi/profilews/api/',
    // userServiceCookiePath: "/Tools/omicsdi/profilews/",
    // thorUrl: "https://www.ebi.ac.uk/europepmc/hubthor/api/dataclaiming/"
    webServiceUrl : 'http://localhost:8080/ddi-web-service/',
    userServiceUrl : 'http://localhost:8080/ddi-profile-service/api/',
    userServiceCookiePath: "/ddi-profile-service/",
    thorUrl: "https://www.ebi.ac.uk/europepmc/hubthor/api/dataclaiming/"
};
