import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ColoredString } from '../buch';
import { TagService } from '../tag.service';

@Component({
  selector: 'lw-tagchooser',
  templateUrl: './tagchooser.component.html',
  styleUrls: ['./tagchooser.component.scss'],
})
export class TagchooserComponent implements OnInit {
  myControl = new FormControl();
  options: ColoredString[] | undefined;
  filteredOptions?: Observable<ColoredString[]>;
  @Input() tagType!: string;
  constructor(private tags: TagService) {}

  ngOnInit(): void {
    this.tags.getTags(this.tagType).subscribe((tags) => {
      this.options = tags;
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): ColoredString[] {
    const filterValue = value.toLowerCase();
    if (!this.options) {
      return [];
    }

    return this.options.filter(
      (option) => option.data.toLowerCase().indexOf(filterValue) === 0
    );
  }

  submit(): void {
    const tag = this.options?.filter((x) => {
      return x.data === this.myControl.value;
    });
    console.log(tag);
  }
}
