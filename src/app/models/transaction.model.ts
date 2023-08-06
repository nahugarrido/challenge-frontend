export interface Transaction {
  header: string;
  transactionType: 'TRANSFER' | 'PAYMENT' | 'DEPOSIT' | 'WITHDRAW';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'CANCELED' | 'PENDING';
  movementType: 'INCOME' | 'EXPENSE';
}
