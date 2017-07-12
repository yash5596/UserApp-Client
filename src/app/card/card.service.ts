import { Injectable } from '@angular/core';
import { Http, RequestOptions } from "@angular/http";
import { SharedService } from '../shared/shared.service';
import { user } from '../shared/user';
import { Card } from './card';

@Injectable()
export class CardService {

  user: user
  apiurl: string = "http://localhost:3000/api/card";
  cards: Card[];

  constructor(private _http: Http, private _sharedService: SharedService) {
    this.user = this._sharedService.getUser();
    this.cards = new Array<Card>();
  }

  getCardDetails() {
    let myParams = new URLSearchParams();
    console.log(this.user._id);
    myParams.set('userId', this.user._id);
    let options = new RequestOptions({ search: myParams });
    return this._http.get("http://localhost:3000/api/card?userId=" + this.user._id).map(res => this.cards = res.json());
  }

  updateCardDetails(card: Card) {
    return this._http.put(this.apiurl, { card: card }).map(res => res.json())
  }

  deleteCardDetails(id: string) {
    return this._http.delete(this.apiurl, { body: { cardid: id } }).map(res => res.json())
  }

  addCard(card: Card) {
    card.userId = this.user._id;
    return this._http.post(this.apiurl, card).map(res => res.json())
  }

}
