import mysql from "mysql";
import appConfig from "./app_config";

const connection = mysql.createPool({
    host: appConfig.mysql_host,
    database: appConfig.mysql_database,
    user: appConfig.mysql_user,
    password: appConfig.mysql_password
});

function execute(sql: string, ...values: any): Promise<any> {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
    });
}

export default { execute }




