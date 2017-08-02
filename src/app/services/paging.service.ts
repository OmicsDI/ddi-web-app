import { Injectable } from '@angular/core';

@Injectable()
export class PagingService {
  selectedPageSize = "10";
  pageSizes = ["10","20","50", ];

  constructor() { }
}
