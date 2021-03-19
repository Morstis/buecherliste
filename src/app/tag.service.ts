import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ColoredString } from './buch';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private store: AngularFirestore) {}

  getTags(tagType: string): Observable<ColoredString[]> {
    return this.store.collection<ColoredString>(tagType).valueChanges();
  }
}
