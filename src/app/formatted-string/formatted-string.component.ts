import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ColoredString } from '../buch';

@Component({
  selector: 'lw-formatted-string',
  templateUrl: './formatted-string.component.html',
  styleUrls: ['./formatted-string.component.scss'],
})
export class FormattedStringComponent implements OnInit {
  @Input() data = {
    data: '',
    color: '',
  };
  @Output()
  dataChange: EventEmitter<ColoredString> = new EventEmitter<ColoredString>();
  touchUi = true;
  constructor() {}

  change(): void {
    this.dataChange.emit({ ...this.data, color: this.data.color.toString() });
  }
  ngOnInit(): void {}
}
