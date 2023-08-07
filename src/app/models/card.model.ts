export interface Card {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cardType: 'DEBIT' | 'CREDIT';
  cvv: string;
}
