import { Component, Input } from '@angular/core';
import { AccountOperation, Operations } from '../../../models/account_operation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  public operations = Operations;
  @Input() public accountOperation: AccountOperation[];
  @Input() public initSearch: boolean;

  public isLoan(operationType: string): boolean {
    return operationType === Operations.loan;
  }
}
