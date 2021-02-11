import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ListsService } from '../lists.service';

@Component({
  selector: 'lw-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  categories$ = this.lists.getAllCategories();

  continue(category: string) {
    console.log(category);
  }

  constructor(private lists: ListsService) {
    // this.categories$.subscribe((categories) => {
    //   console.log(categories);
    // });
  }
  encode(input: string) {
    return input.replace(/__slash__/g, '/').replace(/__dot__/g, '.');
  }

  ngOnInit(): void {}
}
