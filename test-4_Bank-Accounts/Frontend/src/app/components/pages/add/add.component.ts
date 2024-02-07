import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../../services/notify-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccountOperation } from '../../../models/account_operation';
import { AccountService } from '../../../services/account_service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent  {
  public accounOperation = new AccountOperation();

  public constructor(
    private accountService: AccountService,
    private notifyService: NotifyService,
    private router: Router
  ) { }


  public changeOperation(select: EventTarget) {
    this.accounOperation._id = (select as HTMLSelectElement).value;
  }


  public async saveOperation() {
    try {
      await this.accountService.addOperation(this.accounOperation);
      this.notifyService.success("Event added successfully");
      this.router.navigate(['/list']);
    } catch (error) {
      this.notifyService.error(error);
    }
  }

}
