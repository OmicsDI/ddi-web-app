/**
 * Created by Ricardo on 5/18/2017.
 */

export class Database {
  title: string;
  sourceUrl: string;
  imgAlt: string;
  repository: string;
  description: string;
  image: { $binary: string, $type:string };
}
