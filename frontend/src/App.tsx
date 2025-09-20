import { useEffect, useState } from 'react';
import {default as axios} from 'axios';
import ContactForm from './components/contactForm'
import ContactList from './components/contactList';
import type { formData } from './types/formData';


const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [contactsArray, setContactsArray] = useState<formData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("No Contacts to Display");
  const [contactListUpdated, setContactListUpdated] = useState<boolean>(false);

  const fetchContacts = async() => {
    try{
      const response = await axios.get(`${baseUrl}/contacts?page=1&limit=15`);
      const fetchedContacts = response.data;
      setContactsArray(fetchedContacts);
    }catch(error){
      setMessage("Error Fetching Contacts");
    }finally{
      setIsLoading(false);
      setContactListUpdated(false);
    }
  }

  useEffect(() =>{
    fetchContacts();
  },[contactListUpdated])

  return (
    <div>
      <ContactForm 
        setContactListUpdated = {setContactListUpdated}
      />
      {isLoading? 
      <p>Loading...</p>
      :
        contactsArray.length>0?
          <ContactList 
            contactsArray = {contactsArray}
            setContactListUpdated = {setContactListUpdated}
          />
          :
          <p>{message}</p>
      }
    </div>
  )
}

export default App
