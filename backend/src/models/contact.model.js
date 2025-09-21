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

const runUpdateQuery = ( query, params )=>{
    return new Promise((resolve,reject)=>{
        db.run(query,params,(err,row)=>{
            if(err){
                console.log(err.message);
                reject(err);
            }else{
                resolve(row);
            }
        });
    });
}

const runSearchQuery = ( query, params )=>{
    return new Promise((resolve,reject)=>{
        db.all(query,params,(err,rows)=>{
            if(err){
                console.log(err.message);
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

const runFetchQuery = ( query, params )=>{
    return new Promise((resolve,reject)=>{
        db.get(query,params,(err,row)=>{
            if(err){
                console.log(err.message);
                reject(err);
            }else{
                resolve(row);
            }
        });
    });
}



module.exports = {
    runPostQuery, 
    runGetQuery, 
    runDeleteQuery, 
    runUpdateQuery, 
    runSearchQuery,
    runFetchQuery
};