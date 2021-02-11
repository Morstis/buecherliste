import { USE_EMULATOR as authEmulator } from '@angular/fire/auth';
import { USE_EMULATOR as fireEmulator } from '@angular/fire/firestore';
import { USE_EMULATOR as dbEmulator } from '@angular/fire/database';
import { USE_EMULATOR as funcEmulator } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { Provider } from '@angular/core';

/**
 * Aktiviert die firebase emulatoren, wenn production = false.
 * In Produktion wird nur ein leeres Array zurückgegeben.
 * @returns firebase Emulatoren oder []
 */
export function emulators(): Provider[] {
  if (environment.production) {
    return [];
  } else {
    return _emulators;
  }
}
/**
 * Beinhaltet die Provider Informationen über die Emulatoren
 */
const _emulators: Provider[] = [
  {
    provide: authEmulator,
    useValue: ['localhost', 9099],
  },
  {
    provide: fireEmulator,
    useValue: ['localhost', 8080],
  },
  // {
  //   provide: dbEmulator,
  //   useValue: ['localhost', 9001],
  // },
  {
    provide: funcEmulator,
    useValue: ['localhost', 5001],
  },
];
