import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternelService {
  public edit$ = new BehaviorSubject<boolean>(false);
  constructor() {}
}
