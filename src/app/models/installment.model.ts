export interface Installment {
  id: number;
  number: string;
  totalAmount: number;
  amount: number;
  date: string;
  interestRate: number;
  status: 'PAID' | 'UNPAID';
}
