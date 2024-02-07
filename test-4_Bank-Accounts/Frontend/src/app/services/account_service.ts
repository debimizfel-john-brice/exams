import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountOperation } from "../models/account_operation";
import { appConfig } from "../config";
import { firstValueFrom } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class AccountService {

    public constructor(private httpClient: HttpClient) { }

    public async getOperationsByAccount(account_number: string): Promise<AccountOperation[]> {
        const observable = this.httpClient.get<AccountOperation[]>(appConfig.account_url + account_number);
        return await firstValueFrom(observable);
    }

    public async addOperation(operation: AccountOperation): Promise<AccountOperation> {
        const observable = this.httpClient.post<AccountOperation>(appConfig.account_url, operation);
        return await firstValueFrom(observable);
    }
}