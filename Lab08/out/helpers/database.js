"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run_delete = exports.run_update = exports.run_insert = exports.run_query = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
const run_query = (query, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.config.user}:${config_1.config.password}@${config_1.config.host}:${config_1.config.port}/${config_1.config.database}`);
        yield sequelize.authenticate();
        let data = yield sequelize.query(query, {
            replacements: values,
            type: sequelize_1.QueryTypes.SELECT
        });
        yield sequelize.close();
        return data;
    }
    catch (err) {
        console.error(err, query, values);
        throw 'Database query error';
    }
});
exports.run_query = run_query;
const run_insert = (sql, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.config.user}:${config_1.config.password}@${config_1.config.host}:${config_1.config.port}/${config_1.config.database}`);
        yield sequelize.authenticate();
        let data = yield sequelize.query(sql, {
            replacements: values,
            type: sequelize_1.QueryTypes.INSERT
        });
        yield sequelize.close();
        return data;
    }
    catch (err) {
        console.error(err, sql, values);
        throw 'Database insert error';
    }
});
exports.run_insert = run_insert;
const run_update = (sql, values) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Executing SQL:", sql);
        console.log("With Values:", values);
        const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.config.user}:${config_1.config.password}@${config_1.config.host}:${config_1.config.port}/${config_1.config.database}`);
        yield sequelize.authenticate();
        let data = yield sequelize.query(sql, {
            replacements: values,
            type: sequelize_1.QueryTypes.UPDATE
        });
        yield sequelize.close();
        return data;
    }
    catch (err) {
        console.error("Database update error:", err);
        console.error("SQL Query:", sql, "Values:", values);
        throw 'Database update error';
    }
});
exports.run_update = run_update;
const run_delete = (table, key, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sequelize = new sequelize_1.Sequelize(`postgres://${config_1.config.user}:${config_1.config.password}@${config_1.config.host}:${config_1.config.port}/${config_1.config.database}`);
        yield sequelize.authenticate();
        const sql = `Delete from ${table} where ${key} = ${value}`;
        let data = yield sequelize.query(sql, { type: sequelize_1.QueryTypes.DELETE });
        yield sequelize.close();
        return data;
    }
    catch (err) {
        console.error(err);
        throw 'Database delete error';
    }
});
exports.run_delete = run_delete;
