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
            setMessage("")
        },1000);
    }

    return(
        <>
            <form onSubmit={addContact}>
                <label htmlFor="name">Contact Name:</label>
                <input 
                    value={name}
                    name="name" 
                    id="name" 
                    placeholder="Enter Contact Name" 
                    type="text" 
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Contact Email:</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder="Enter Contact Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <label htmlFor="phone">Contact Phone:</label>
                <input 
                    type="number" 
                    name="phone" 
                    id="phone" 
                    placeholder="Enter Contact Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button type="submit">Add Contact</button>
            </form>
            <p>{message}</p>
        </>
    )
}

export default ContactForm;