import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class SingletonDocumentService {

  async setDocument(doc: string) {
    await Preferences.set({
      key: 'number_document_active',
      value: doc
    })
  }

  async getDocument(): Promise<GetResult> {
    return await Preferences.get({ key: 'number_document_active' })
  };

  async removeName() {
    await Preferences.remove({ key: 'number_document_active' });
  };

  //private document: string = ""

  /*setDocument(doc: string): void {
    this.document = doc;
  }

  getDocument(): string {
    return this.document
  }*/
}
