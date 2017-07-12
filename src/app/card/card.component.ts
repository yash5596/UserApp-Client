import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared/shared.service";
import { Card } from './card';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [CardService]
})
export class CardComponent implements OnInit {

  cards: Card[];
  card: Card;
  error: any;

  constructor(private _sharedService: SharedService, private _cardService: CardService) {
    this._sharedService.checkUser();
    this.cards = new Array<Card>();
    this.card = new Card();
  }

  ngOnInit() {
    this._cardService.getCardDetails().subscribe(res => {
      console.log(res);
      this.cards = res;
    })
  }

  saveCard() {
    if (!this.card._id) {
      this.addNewCard();
    } else {
      this.editCard()
    }
  }

  addNewCard() {
    this._cardService.addCard(this.card).subscribe(res => {
      this.cards.push(res);
      this.card = new Card();
      this._sharedService.openSnackBar("New Card Added Succesfully!", "Holla!");
    }, err => {
      this.error = err.json();
    })
  }

  editCard() {
    this._cardService.updateCardDetails(this.card).subscribe(res => {
      console.log(res);
      this.cards.splice(this.cards.findIndex(card => card._id == this.card._id), 1);
      console.log(this.cards);
      this.cards.push(res);
      this._sharedService.openSnackBar("New Card Updated Succesfully!", "Holla!");
      this.card = new Card();
    }, err => {
      this.error = err.json();
    })
  }

  selectCard(cardId) {
    this.card = Object.assign({}, this.cards.find(card => card._id == cardId));
  }

  Logout() {
    this._sharedService.destroyUser();
  }

}
