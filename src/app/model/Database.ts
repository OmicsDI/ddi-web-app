/**
 * Created by Ricardo on 5/18/2017.
 */

export class Database {
    databaseName: string;
    source: string;
    repository: string;
    domain: string;
    title: string;
    sourceUrl: string;
    imgAlt: string;
    description: string;
    image: { $binary: string, $type: string };
    orcidName: string;
    accessionPrefix: string[];
    urlTemplate: string;
    icon: string;
}
