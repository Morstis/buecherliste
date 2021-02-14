import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable } from 'rxjs';
export interface Buch {
  nr: number;
  titel: string;
  autor: string;
  fuer: string[];
  tags: string[];
  formattedTags?: Observable<ColoredString>[];
  meta?: MetaData;
}

export interface ColoredString {
  color: string;
  data: string;
}

export interface MetaData {
  key: string;
  parent: string;
  time: {
    created: firebase.default.firestore.FieldValue;
    updated?: firebase.default.firestore.FieldValue;
  };
}
