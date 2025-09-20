import { default as axios } from 'axios';
import type {formData}  from '../types/formData';
import { useEffect, useState } from 'react';


const baseUrl = import.meta.env.VITE_BACKEND_URL;


const ContactList = (
    {
        setContactListUpdated,
        page,
        contactListUpdated
    }: 
    {
        setContactListUpdated: React.Dispatch<React.SetStateAction<boolean>>;
        page: number;
        contactListUpdated: boolean;
    },
) => {
    const [contactsArray, setContactsArray] = useState<formData[]>([]);

    const fetchContacts = async() => {
        try{
          const response = await axios.get(`${baseUrl}/contacts?page=${page}&limit=10`);
          const fetchedContacts = response.data;
          setContactsArray(fetchedContacts);
        }catch(error){
          console.log(error)
        }finally{
          setContactListUpdated(false);
        }
    }

    const deleteContact = async(uuid: string) => {
        try{
            await axios.delete(`${baseUrl}/contact/${uuid}`)
            setContactListUpdated(true);
        }catch(err){
            console.log('Failed to Delete Contact')
        }
    }

    useEffect(()=>{
        fetchContacts();
    },[page,contactListUpdated]);

    return(
        <>
        <ul>
        {
            contactsArray.map((item: formData)=>(
            <div key={item.uuid}>
                <li>{item.name}</li>
                <li>{item.email}</li>
                <li>{item.phone}</li>
                <button onClick={()=>deleteContact(item.uuid)}>Delete</button>
            </div>
            ))
        }
        </ul>
        </>
    )
}

export default ContactList