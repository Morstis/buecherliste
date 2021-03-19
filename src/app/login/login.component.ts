import { Component, OnInit } from '@angular/core';
import { ListsService } from '../lists.service';

@Component({
  selector: 'lw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private service: ListsService) {
    // service.getrtdbTostore().then(() => {
    //   console.log('fertig');
    // });
    // service.removeDoppleTags('fuer');
    // service.removeDoppleTags('tags');
  }

  ngOnInit(): void {}
}
// elem = elem.replace('*_S%ë5nN', '/');
