import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safedom'
})
export class SafedomPipe implements PipeTransform {

	constructor(private domSanitizer: DomSanitizer){ }

	transform(value: any, params?: any): any {
		if(params && params == 'url')
    		return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    else if(params && params == 'html')
      return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}