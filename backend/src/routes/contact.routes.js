const express = require('express');
const db = require('../config/db');
const uuid = require('uuid');
const contactRouter = express.Router();
const {
    runPostQuery, 
    runGetQuery, 
    runDeleteQuery, 
    runUpdateQuery,
    runFetchQuery,
    runSearchQuery
} = require('../models/contact.model');


// DB Queries
const insertContactQuery = `
    INSERT INTO contacts( uuid, name, email, phone ) VALUES( ?, ?, ?, ?);
`

const selectContactQuery = `
    SELECT uuid, name, email, phone FROM contacts LIMIT ? OFFSET ?
    WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?;
`

const getContactsQuery = `
    SELECT uuid, name, email, phone FROM contacts;
`

const deleteContactQuery = `
    DELETE FROM contacts WHERE uuid = ?;
`

const updateContactQuery = `
    UPDATE contacts SET name = ?, email = ?, phone = ? 
    WHERE uuid = ?; 
`

const searchContactsQuery = `
    SELECT uuid, name, email, phone FROM contacts 
    WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?;
`

const fetchContactQuery = `
    SELECT * FROM contacts WHERE uuid = ?;
`


// Validators
const emailRegexp = /^\S+@\S+\.\S+$/;
const mobileRegexp = /^\d{10}$/;


// API ENDPOINTS

// 1. POST /contacts

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

// 2. GET /contacts

contactRouter.get('/contacts',async (req,res)=>{
    let {limit, page, text} = req.query;
    const queryText = `%${text}%`;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const offset = (pageNum-1)*limitNum;
    if(limit){
        try{
            const contacts = await runGetQuery(
                selectContactQuery, 
                [
                    limitNum, 
                    offset,
                    queryText,
                    queryText,
                    queryText
                ]);
            res.send(contacts);
        }catch(err){
            res.status(400);
            res.send({
                message: err.message
            });
        }
    }else{
        try{
            const contacts = await runSearchQuery(
                searchContactsQuery,
                [ 
                    queryText,
                    queryText,
                    queryText
                ]
            );
            res.send(contacts);
        }catch(err){
            res.status(400);
            res.send({
                message: err.message
            });
        }
    }
});

// 3. DELETE /contacts/:id

contactRouter.delete('/contact/:id',async (req,res)=>{
    const id = req.params.id;
    try{
        await runDeleteQuery(deleteContactQuery, id)
        res.status(201)
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
            }catch(err){
                console.log(err)
            }
        }
        else{
            console.log("Invalid");
        }
        
    });
    res.status(201);
    res.send({
        message: "All Contacts Added"
    })    
});

// 5. PATCH /contacts/:id

contactRouter.patch('/contact/:id',async (req,res)=>{
    const id = req.params.id;
    const { name, email, phone } = req.body;
    try{
        const contact = await runFetchQuery(fetchContactQuery,id);
        
        if(contact){
            await runUpdateQuery(updateContactQuery, [name, email, phone, id]);
            res.status(201);
            res.send({
                message: "Contact Updated Successfully"
            })
        }else{
            res.status(402);
            res.send({
                message: "Contact does not exist"
            });
        }

    }catch(err){
        res.status(400);
        res.send({
            message: err.message
        })
    }
});

// 6. GET /contacts/search

contactRouter.get('/contacts/search', async(req,res)=>{

    const { text } = req.query
    const queryText = `%${text}%`
    
    console.log(queryText);

    try{
        const contacts = await runSearchQuery( 
            searchContactsQuery, 
            [ queryText, queryText, queryText ]
        );
        console.log(contacts);
    }catch(err){
        res.status(400)
        res.send({
            message: err.message
        })
    }

})


module.exports = contactRouter;