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
      .valueChanges()
      .pipe(
        map((books) => {
          return books.map((book) => {
            if (book.tags.length > 0) {
              book.tags.forEach((tag) => {
                // I love ts
                book = {
                  ...book,
                  formattedTags: [
                    ...(book.formattedTags || []),
                    this.getTagColor(tag),
                  ],
                };
              });
            }
            if (book.fuer.length > 0) {
              book.fuer.forEach((fuer) => {
                console.log(fuer);
                // I love ts
                book = {
                  ...book,
                  formattedFuer: [
                    ...(book.formattedFuer || []),
                    this.getFuerColor(fuer),
                  ],
                };
              });
            }
            return book;
          });
        })
      );
  }
  getBook(route: string): Observable<Buch> {
    const routeArr = route.split('/');
    return this.dbCollRef
      .doc(routeArr[0])
      .collection<Buch>('buecher')
      .doc(routeArr[1])
      .valueChanges()
      .pipe(
        map((book) => {
          if (book === undefined) {
            const err = new Error(
              'Unter der Route' + route + 'ist kein Buch zu finden'
            );
            this.handleError(err, 'Kein Buch gefunden!');
            throw err;
          }
          let buch: Buch = book;
          if (buch.tags.length > 0) {
            buch.tags.forEach((tag) => {
              // I love ts
              buch = {
                ...buch,
                formattedTags: [
                  ...(buch.formattedTags || []),
                  this.getTagColor(tag),
                ],
              };
            });
          }
          if (buch.fuer.length > 0) {
            buch.fuer.forEach((fuer) => {
              // I love ts
              buch = {
                ...buch,
                formattedFuer: [
                  ...(buch.formattedFuer || []),
                  this.getFuerColor(fuer),
                ],
              };
            });
          }
          return buch;
        })
      );
  }

  getTagColor(tag: string): Observable<ColoredString> {
    return this.store
      .collection<ColoredString>('tags', (ref) => ref.where('data', '==', tag))
      .valueChanges()
      .pipe(map((all) => all[0]));
  }
  getFuerColor(fuer: string): Observable<ColoredString> {
    return this.store
      .collection<ColoredString>('fuer', (ref) => ref.where('data', '==', fuer))
      .valueChanges()
      .pipe(map((all) => all[0]));
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
          const randColor = this.generateFancyColor();
          await this.store
            .collection('tags')
            .add({ data: tags, color: randColor });
        } else {
          console.log(false);
        }
      });
      data.fuer.forEach(async (fuer) => {
        const res = await this.store

          .collection<ColoredString>('fuer', (ref) =>
            ref.where('data', '==', fuer)
          )
          .valueChanges()
          .pipe(take(1))
          .toPromise();

        if (res.length === 0) {
          const randColor = this.generateFancyColor();

          await this.store
            .collection('fuer')
            .add({ data: fuer, color: randColor });
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
    await this.rtdb
      .object<any>('/')
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(async (res) => {
        console.log(res);

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
                      .split(',')
                      .map((x) => x.trim()) || [x.fuer]
                  ).filter((c) => c !== ''),
                  tags: (
                    x.sonstiges
                      .replace(/\*_S%ë5nN/g, '/')
                      .replace(/_P%ë5nN\*/g, '.')
                      .trim()
                      .split(',')
                      .map((x) => x.trim()) || [x.sonstiges]
                  ).filter((c) => c !== ''),
                  titel: x.titel
                    .replace(/\*_S%ë5nN/g, '/')
                    .replace(/_P%ë5nN\*/g, '.'),
                  autor: x.autor
                    .replace(/\*_S%ë5nN/g, '/')
                    .replace(/_P%ë5nN\*/g, '.'),
                }).then(() => {
                  console.log('ok');
                });
              }
            }
          }
        }
      });
    return true;
  }

  removeDoppleTags(tagType: string) {
    let ids: string[] = [];
    this.store
      .collection<ColoredString>(tagType)
      .valueChanges()
      .pipe(take(1))
      .toPromise()
      .then(async (fuers) => {
        fuers.forEach(async (fuer, i) => {
          await this.store
            .collection<ColoredString>(tagType, (ref) =>
              ref.where('data', '==', fuer.data)
            )
            .snapshotChanges()
            .pipe(take(1))
            .toPromise()
            .then((dopples) => {
              console.log(dopples, dopples.length);
              if (dopples.length > 1) {
                dopples.forEach(async (dopp, i) => {
                  if (i !== 0) {
                    const id = dopp.payload.doc.id;
                    console.log(id);
                    if (!ids.includes(id)) {
                      ids = [...ids, id];
                    }
                  }
                });
              }
            });
          console.log(i, fuers.length - 3);
          if (i === fuers.length - 3) {
            console.log('IDS', ids);
            ids.forEach(async (id) => {
              try {
                await this.store.collection(tagType).doc(id).delete();
                console.log('del:' + id);
              } catch (error) {
                throw error;
              }
            });
          }
        });
      });
  }

  private generateFancyColor(): string {
    function randomInt(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const h = randomInt(0, 360);
    const s = randomInt(42, 98);
    const l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  }
}
