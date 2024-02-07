import { Injectable } from "@angular/core";
import { Notyf } from "notyf";

@Injectable({
    providedIn: "root"
})
export class NotifyService {

    public notyf = new Notyf()

    public success(message: string) {
        this.notyf.success(message);
    }

    public error(error: any) {
        const message = this.extractMessage(error);
        this.notyf.error(message)
    }

    private extractMessage(error: any): string {
        if (typeof error === "string") return error;
        if (typeof error.response?.data === "string") return error.response.data;
        if (Array.isArray(error.response?.data)) return error.response.data[0];
        if (typeof error.message === "string") return error.message;
        return "Something went wrong...";

    }
}