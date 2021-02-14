import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { first, map, reduce, take, tap } from 'rxjs/operators';
import { Buch, ColoredString, MetaData } from './buch';
import { Message } from './message.class';

@Injectable({
  providedIn: 'root',
})
export class ListsService extends Message {
  dbCollRef: AngularFirestoreCollection<any> = this.store.collection(
    'allebuecher'
  );
  constructor(
    private store: AngularFirestore,
    private rtdb: AngularFireDatabase,
    protected snackbar: MatSnackBar
  ) {
    super(snackbar);
  }

  getAllFromCategory(category: string): Observable<Buch[]> {
    return this.dbCollRef
      .doc(category)
      .collection<Buch>('buecher', (ref) => ref.orderBy('nr'))
      .valueChanges();
  }
  getTagColor(tag: string):Observable<ColoredString> {
    return this.store
      .collection<ColoredString>('tags', (ref) => ref.where('data', '==', tag))
      .valueChanges().pipe(map(all => all[0]));
  }

  getAllCategories(): Observable<{ titel: string }[]> {
    return this.dbCollRef.valueChanges();
  }
  addCategory(category: string) {
    return this.dbCollRef.doc(category).set({ titel: category });
  }

  async addBook(category: string, data: Buch): Promise<void> {
    const ref = this.dbCollRef.doc(category).collection<Buch>('buecher').doc();
    const meta: MetaData = {
      key: ref.ref.id,
      parent: category,
      time: {
        created: firebase.default.firestore.FieldValue.serverTimestamp(),
      },
    };
    data.meta = meta;

    try {
      await ref.set(data);
      // data.fuer.forEach(async (fuer) => {

      //   await ref.collection<ColoredString>('fuer').doc(fuer).set(fuer);
      // });
      data.tags.forEach(async (tags) => {
        const res = await this.store

          .collection<ColoredString>('tags', (ref) =>
            ref.where('data', '==', tags)
          )
          .valueChanges()
          .pipe(take(1))
          .toPromise();

        if (res.length === 0) {
          const randColor =
            '#' + (((1 << 24) * Math.random()) | 0).toString(16);
          await this.store
            .collection('tags')
            .add({ data: tags, color: randColor });
        } else {
          console.log(false);
        }

        // await ref.collection<ColoredString>('tags').doc(tags).set(tags);
      });
    } catch (err) {
      this.handleError(
        err,
        'Es ist ein unerwarteter Fehler beim Hochladen aufgetreten!'
      );
    }
    return this.success('Hochgeladen!');
  }

  async getrtdbTostore(): Promise<boolean> {
    this.rtdb
      .object<any>('/')
      .valueChanges()
      .subscribe(async (res) => {
        for (const key in res) {
          if (Object.prototype.hasOwnProperty.call(res, key)) {
            const element = res[key];
            const formattedKey = key
              .replace(/\*_S%ë5nN/g, '__slash__')
              .replace(/_P%ë5nN\*/, '__dot__');
            // console.log(element);
            await this.addCategory(formattedKey);
            for (const keys in element) {
              if (Object.prototype.hasOwnProperty.call(element, keys)) {
                const x: {
                  nr: number;
                  fuer: string;
                  sonstiges: string;
                  titel: string;
                  autor: string;
                } = element[keys];
                console.log(key);

                this.addBook(formattedKey, {
                  nr: x.nr,
                  fuer: (
                    x.fuer
                      .replace(/\*_S%ë5nN/g, '/')
                      .replace(/_P%ë5nN\*/g, '.')
                      .trim()
                      .split(',') || [x.fuer]
                  ).filter((c) => c !== ''),
                  tags: (
                    x.sonstiges
                      .replace(/\*_S%ë5nN/g, '/')
                      .replace(/_P%ë5nN\*/g, '.')
                      .trim()
                      .split(',') || [x.sonstiges]
                  ).filter((c) => c !== ''),
                  titel: x.titel
                    .replace(/\*_S%ë5nN/g, '/')
                    .replace(/_P%ë5nN\*/g, '.'),
                  autor: x.autor
                    .replace(/\*_S%ë5nN/g, '/')
                    .replace(/_P%ë5nN\*/g, '.'),
                }).then((x) => {
                  console.log('ok');
                });
              }
            }
          }
        }
      });
    return true;
  }
}
