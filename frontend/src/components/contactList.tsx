import { default as axios } from 'axios';
import type {formData}  from '../types/formData';
import { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

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
        <div>
            <ul 
                className="flex flex-row flex-wrap gap-5 max-auto px-6 items-start justify-center w-90vh h-full"
            >
            {
                contactsArray.map((item: formData)=>(
                <li 
                    key={item.uuid}
                    className="w-70 px-5 py-5 bg-blue-400 text-white items-center justify-between flex gap-2 rounded"
                >
                    <div>
                        <h1 className='text-2xl'>{item.name}</h1>
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                    </div>
                    <div>
                        <button 
                            onClick={()=>deleteContact(item.uuid)}
                            key={item.uuid}
                            className="rounded border-none h-10 bg-red-500 text-white w-max px-3 mx-auto"
                        >
                            <MdDelete />
                        </button>
                    </div>
                </li>
                ))
            }
            </ul>
        </div>
    )
}

export default ContactList