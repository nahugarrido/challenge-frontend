export interface LoanSaveDTO {
  userID: string;
  amount: number;
  date: Date;
  totalInstallments: number;
  interestRate: number;
}
