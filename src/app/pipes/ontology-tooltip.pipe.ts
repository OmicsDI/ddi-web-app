import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'ontologyTooltip'
  , pure: false
})
export class OntologyTooltipPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){
  }

  transform(value: string) {
    if(null==value)
      return null;

    let newHtml : string = value.replace('Heart','<span ng2-tooltip="super fast">!1Heart!</span>');

    return this.sanitizer.bypassSecurityTrustHtml(newHtml);
  }

}
