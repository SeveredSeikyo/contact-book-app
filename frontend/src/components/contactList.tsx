import { default as axios } from 'axios';
import type {formData}  from '../types/formData';
import { useEffect, useState } from 'react';
import { MdDelete, MdOutlineEmail } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";


const baseUrl = import.meta.env.VITE_BACKEND_URL;


const ContactList = (
    {
        setContactListUpdated,
        page,
        contactListUpdated,
        searchText,
    }: 
    {
        setContactListUpdated: React.Dispatch<React.SetStateAction<boolean>>;
        page: number;
        contactListUpdated: boolean;
        searchText: string;
    },
) => {
    const [contactsArray, setContactsArray] = useState<formData[]>([]);
    // const [contactId, setContactId] = useState<string>("");
    // const [name, setName] = useState<string>("")
    // const [email, setEmail] = useState<string>("")
    // const [phone, setPhone] = useState<string>("")
    // const [message, setMessage] = useState<string>("")
    // const [statusCode, setStatusCode] = useState<number>(400)

    // const handleEditContact = async(uuid: string) => {
    //     setContactId(uuid);
    //     const contact = await axios.get(`${baseUrl}/contact/${uuid}`);
    //     const { name, email, phone } = contact.data;
    //     setName(name);
    //     setEmail(email);
    //     setPhone(phone);
    // }

    const fetchContacts = async() => {
        try{
          const response = await axios.get(`${baseUrl}/contacts?page=${page}&limit=10&text=${searchText}`);
          const fetchedContacts = response.data;
          setContactsArray(fetchedContacts);
        }catch(error){
          console.log(error)
        }finally{
          setContactListUpdated(false);
        }
    }

    // const addContact = async(contactId: string) => {
    //     const editedContact = {
    //         name,
    //         email,
    //         phone
    //     }

    //     try{
    //         const response = axios.patch(`${baseUrl}/contact/${contactId}`, editedContact);
    //         console.log(response);
    //     }catch(err){
    //         console.log(err.message);
    //     }
    // }

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
    },[page,contactListUpdated,searchText]);

    return(
        <div className='w-[90vw] flex flex-col gap-3 items-center'>
            <ul 
                className="flex flex-row flex-wrap gap-5 max-auto px-6 justify-center items-start w-full h-full"
            >
            {
                contactsArray.map((item: formData)=>(
                <li 
                    key={item.uuid}
                    className="w-80 px-2 py-3 bg-blue-400 text-white items-center flex justify-between gap-2 rounded"
                >
                    <div className='w-max'>
                        <div className="flex items-center gap-1">
                            <CgProfile />
                            <h1 className='text-xl'>{item.name}</h1>
                        </div>
                        <div className="flex items-center gap-1">
                            <MdOutlineEmail />
                            <p>{item.email}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiPhone />
                            <p>{item.phone}</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button 
                            onClick={()=>deleteContact(item.uuid)}
                            className="rounded border-none h-10 bg-red-500 text-white w-max px-3 mx-auto"
                        >
                            <MdDelete />
                        </button>
                        {/* <button 
                            onClick={()=>handleEditContact(item.uuid)}
                            data-modal-target="edit-contact-modal"
                            className="rounded border-none h-10 bg-blue-500 text-white w-max px-3 mx-auto"
                        >
                            <FaRegEdit />
                        </button> */}
                    </div>
                </li>
                ))
            }
            </ul>
            {/* <div id='edit-contact-modal'>
                <button data-modal-hide="edit-contact-modal" >close</button>
                <form onSubmit={()=>addContact(contactId)} className="flex flex-col w-full h-full gap-2 text-white">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Contact Name:</label>
                        <input 
                            value={name}
                            name="name" 
                            id="name"
                            placeholder="Enter Contact Name" 
                            type="text" 
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none border-1 w-full rounded-md h-10 px-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Contact Email:</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Enter Contact Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="outline-none border-1 w-full rounded h-10 px-3"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone">Contact Phone:</label>
                        <input 
                            type="tel" 
                            name="phone" 
                            id="phone" 
                            placeholder="Enter Contact Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="outline-none border-1 w-full rounded h-10 px-3"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="rounded border-none h-10 bg-blue-500 text-white w-max px-5 mx-auto"
                    >Edit Contact</button>
                    <p className={`m-auto ${statusCode==201?'text-green-500':'text-red-500'}`}>{message}</p>
                </form>
            </div> */}
        </div>
    )
}

export default ContactList