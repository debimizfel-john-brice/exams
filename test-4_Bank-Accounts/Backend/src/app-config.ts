class AppConfig {
    public port = 4000;
    public mongoDBConnectionString = "mongodb://127.0.0.1:27017/bankAccounts";
}
const appConfig = new AppConfig();
export default appConfig;