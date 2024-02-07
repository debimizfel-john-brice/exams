import { Component } from '@angular/core';
import { NotifyService } from '../../../services/notify-service';
import { AccountService } from '../../../services/account_service';
import { CommonModule } from '@angular/common';
import { AccountOperation } from '../../../models/account_operation';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../widgets/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  public account_to_search: string;
  public initSearch = false;
  public accountOperation: AccountOperation[];


  public constructor(
    private accountService: AccountService,
    private notifyService: NotifyService) { }


  public async search(): Promise<void> {
    try {
      this.initSearch = true;
      this.accountOperation = await this.accountService.getOperationsByAccount(this.account_to_search);
    } catch (error) {
      this.notifyService.error("Error while searching events");
    }
  }
}
