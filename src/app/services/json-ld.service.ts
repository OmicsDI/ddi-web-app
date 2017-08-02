import { Injectable } from '@angular/core';

@Injectable()
export class JsonLdService {

  constructor() { }

  createForDataset(){

      var data = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": ""
      },
      "headline": "SCHEMA - Article Headline",
      "image": {
        "@type": "ImageObject",
          "url": "SCHEMA - Article Image",
        "height": 413,
          "width": 1159
      },
      "datePublished": "SCHEMA - Article datePublished",
      "author": {
        "@type": "Person",
          "name": "SCHEMA - Author Name"
      },
      "publisher": {
        "@type": "Organization",
          "name": "SERPs.com",
          "logo" : {
          "@type": "ImageObject",
            "url": "https://serps.com/app/uploads/2016/05/serps-logo-60.png",
            "height": 60,
            "width": 300
        }
      },
      "description": "SCHEMA - Article Description"
    }


      ///var script = document.createElement('script');
      //script.type = "application/ld+json";
      //script.innerHTML = JSON.stringify(data);
      //document.getElementsByTagName('head')[0].appendChild(script);

      console.log("json-ld service - script adde");

  }

}
