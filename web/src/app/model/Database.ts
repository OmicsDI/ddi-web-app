/**
 * Created by Ricardo on 5/18/2017.
 */

export class Database {
  title: string;
  source: string;
  imgAlt: string;
  searchUrl: string;
  description: string;
  image: { $binary: string, $type:string };
}
