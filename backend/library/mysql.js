const mysql = require('promise-mysql');
const mysqlConfig = require('../config/database');

let mysqlPool;

async function getMysqlPool() {
    if (!mysqlPool) {
        //console.log(mysqlConfig)
        mysqlPool = await mysql.createPool(
            {
                host     : 'localhost',    // 호스트 주소
                user     : 'root',           // mysql user
                password : mysqlConfig,       // mysql password
                database : 'double-slash-8thdb'         // mysql 데이터베이스
            }
        );
        return mysqlPool;
    }
    return mysqlPool;
}

async function query(...args) {
    const queryText = args[0];
    const data = args[1];

    await getMysqlPool();

    const connection = await mysqlPool.getConnection();
    const result = await connection.query(queryText, data) || null;

    connection.release();

    return result;
}

async function transaction(...args) {
    await getMysqlPool();

    const connection = await mysqlPool.getConnection();

    try {
        await connection.beginTransaction();

        await args[0](connection);
        await connection.commit();
    } catch (error) {
        console.log(error);
        await connection.rollback();
    } finally {
        connection.release();
    }
}

module.exports = {
    query,
    transaction,
};