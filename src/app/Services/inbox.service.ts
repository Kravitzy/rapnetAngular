import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Card } from '../models/card';

@Injectable({
    providedIn: 'root'
})

export class InboxService {
    private itemsCollection: AngularFirestoreCollection<Card>;
    private items: Observable<any[]>;
    constructor(private afs: AngularFirestore) { }

    getInbox(): Observable<Card[]> {
        this.itemsCollection = this.afs.collection<Card>('/users', ref => ref.orderBy('order'));
        this.items = this.itemsCollection.valueChanges();
        return this.items;
    }

    addInbox(card: Card): void {
        const id = this.afs.createId();
        card.id = id;
        this.itemsCollection.doc(id).set(card)
    }

    deleteCard(card: Card): void {
        this.itemsCollection.doc(card.id).delete();
    }

    updateCard(card: Card): void {
        this.itemsCollection.doc(card.id).update(card);
    }


}
