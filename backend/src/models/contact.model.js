const db = require('../config/db');

const runPostQuery = ( query, params )=>{
    return new Promise((resolve,reject)=>{
        db.run(query,params,function(err){
            if(err){
                console.error(err.message);
                reject(err);
            }else{
                resolve(this);
            }
        });
    });
}

const runGetQuery = ( query, params = [] )=>{
    return new Promise((resolve,reject)=>{
        db.all(query,params,(err,rows)=>{
            if(err){
                console.error(err.message);
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

const runDeleteQuery = ( query, params )=>{
    return new Promise((resolve,reject)=>{
        db.run(query,params,function(err){
            if(err){
                console.error(err.message);
                reject(err);
            }else{
                resolve(this);
            }
        });
    });
}

module.exports = {runPostQuery, runGetQuery, runDeleteQuery};