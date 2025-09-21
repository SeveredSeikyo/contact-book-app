import { useState } from 'react';
import {default as axios} from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL

//Validators
const emailRegexp = /^\S+@\S+\.\S+$/;
const mobileRegexp = /^\d{10}$/;

const ContactForm = ({setContactListUpdated}: {setContactListUpdated: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [message, setMessage] = useState<string>("")
    const [statusCode, setStatusCode] = useState<number>(400);

    const addContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const contactData = {
            name,
            email,
            phone
        }

        if(emailRegexp.test(email) && mobileRegexp.test(phone)){

            axios.post(`${baseUrl}/contacts`,contactData)
            .then((response)=>{
                const data = response.data;
                const {message} = data;
                setStatusCode(response.status);
                setMessage(message);
                setName("");
                setEmail("");
                setPhone("");
                setContactListUpdated(true);
            })
            .catch((error)=>{
                if(error.response?.data?.message){
                    setMessage(error.response.data.message);
                }else{
                    setMessage("Something went wrong");
                }
            })
        }else{
            setMessage("Invalid Email or Phone Number");
        }
        setTimeout(()=>{
            setMessage("");
            setStatusCode(400);
        },1000)
    }

    return(
        <div className = "w-[90vw] mx-auto p-6 border-none rounded-xl shadow-lg bg-gray-800">
            <form onSubmit={addContact} className="flex flex-col w-full h-full gap-2 text-white">
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
                        type="number" 
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
                >Add Contact</button>
                <p className={`m-auto ${statusCode==201?'text-green-500':'text-red-500'}`}>{message}</p>
            </form>
        </div>
    )
}

export default ContactForm;