import { useState, useEffect } from 'react';
import {default as axios} from 'axios';

interface formData{
    name: string;
    email: string;
    phone: string;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL;



const ContactList = () => {
    const [contactsArray, setContactsArray] = useState<formData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    useEffect(()=>{
        axios.get(`${baseUrl}/contacts?page=1&limit=10`)
        .then((response)=>{
            setContactsArray(response.data);
        })

        if(contactsArray.length == 0){
            setIsLoading(false);
            setMessage("No contacts to Display");
        }

        if(contactsArray){
            setIsLoading(false);
        }
    },[])

    return(
        <>
        {isLoading? 
        <p>Loading..</p>
        :
        contactsArray.length>0?
            contactsArray.map(item => {
            <>
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
            </>
        }):
        <p>{message}</p>
        }
        </>
    )
}

export default ContactList