import { default as axios } from 'axios';
import type {formData}  from '../types/formData';


const ContactList = (
    {
        contactsArray, 
        setContactListUpdated
    }: 
    {
        contactsArray: formData[]; 
        setContactListUpdated: React.Dispatch<React.SetStateAction<boolean>>
    },
) => {

    console.log(contactsArray);

    const deleteContact = async(uuid: string) => {
        try{
            await axios.delete(`http://localhost:5000/contact/${uuid}`)
            setContactListUpdated(true);
        }catch(err){
            console.log('Failed to Delete Contact')
        }
    }

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