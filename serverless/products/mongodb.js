"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@testingapps.jbcgl.mongodb.net/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;
const MONGODB_DB = process.env.MONGODB_DB;
let dbInstance = null;
module.exports.get = async function () {
    if (dbInstance) {
        return Promise.resolve(dbInstance);
    }
    const db = await MongoClient.connect(MONGODB_URI);
    dbInstance = db.db(MONGODB_DB);
    return dbInstance;
};
