const express = require('express');
const db = require('../config/db');
const uuid = require('uuid');
const contactRouter = express.Router();
const {runPostQuery, runGetQuery, runDeleteQuery} = require('../models/contact.model');

//DB Queries
const insertContactQuery = `
    INSERT INTO contacts( uuid, name, email, phone ) VALUES( ?, ?, ?, ?);
`

const selectContactQuery = `
    SELECT uuid, name, email, phone FROM contacts LIMIT ? OFFSET ?;
`

const getContactsQuery = `
    SELECT uuid, name, email, phone FROM contacts;
`

const deleteContactQuery = `
    DELETE FROM contacts WHERE uuid = ?;
`

//Validators
const emailRegexp = /^\S+@\S+\.\S+$/;
const mobileRegexp = /^\d{10}$/;


//API ENDPOINTS

//1. POST /contacts

contactRouter.post('/contacts',async (req,res)=>{
    const contactFormData = req.body;
    console.log(contactFormData);
    const {name, email, phone} = contactFormData;
    const uniqueId = uuid.v4();

    if(emailRegexp.test(email) && mobileRegexp.test(phone)){
        try{
            await runPostQuery(insertContactQuery,[uniqueId,name,email,phone]);
            
            res.status(201);
            res.send({
                message: "Contact Inserted Successfully"
            });
        }catch(err){
            res.status(400);
            res.send({
                message: err.message
            });
        }
    }
    else{
        res.status(400);
        res.send("Invalid Constraints");
    }
    
})

//2. GET /contacts

contactRouter.get('/contacts',async (req,res)=>{
    let {limit, page} = req.query;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const offset = (pageNum-1)*limitNum;
    if(limit){
        try{
            const contacts = await runGetQuery(selectContactQuery, [limitNum, offset]);
            res.send(contacts);
        }catch(err){
            res.status(400);
            res.send({
                message: err.message
            });
        }
    }else{
        try{
            const contacts = await runGetQuery(getContactsQuery);
            res.send(contacts);
        }catch(err){
            res.status(400);
            res.send({
                message: err.message
            });
        }
    }
});

//3. DELETE /contacts/:id

contactRouter.delete('/contact/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        await runDeleteQuery(deleteContactQuery, id)
        res.send(
            {
                message: "Contact Deleted Successfully",
            }
        );
    }catch(err){
        res.status(400);
        res.send({
            message: err.message,
        });
    }
})

// 4. POST /contacts/list

contactRouter.post('/contacts/list',async (req,res)=>{
    const contactFormData = req.body;
    console.log(contactFormData);

    contactFormData.forEach(async(element) => {

        const {name, email, phone} = element;
        const uniqueId = uuid.v4();

        if(emailRegexp.test(email) && mobileRegexp.test(phone)){
            try{
                await runPostQuery(insertContactQuery,[uniqueId,name,email,phone]);
                
                res.status(201);
                res.send({
                    message: "Contact Inserted Successfully"
                });
            }catch(err){
                res.status(400);
                res.send({
                    message: err.message
                });
            }
        }
        else{
            res.status(400);
            res.send("Invalid Constraints");
        }
        
    });    
})

module.exports = contactRouter;