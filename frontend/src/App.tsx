import { useEffect, useState, type SetStateAction } from 'react';
import {default as axios} from 'axios';
import ContactForm from './components/contactForm'
import ContactList from './components/contactList';
import ContactPagination from './components/contactPagination';
import ContactSearch from './components/contactSearch';


const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("No Contacts to Display");
  const [contactListUpdated, setContactListUpdated] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");


  const fetchContacts = async() => {
    try{
      const response = await axios.get(`${baseUrl}/contacts`);
      setCount(Math.ceil(response.data.length/10));
    }catch(error){
      setMessage("Error Fetching Contacts");
    }finally{
      setIsLoading(false);
      setContactListUpdated(false);
    }
  }

  useEffect(() =>{
    fetchContacts();
  },[page,contactListUpdated])

  useEffect(() => {
    if(page>count && count>0){
      setPage(page-1);
    }
  },[page,count])

  return (
    <div 
      className="
        flex flex-col justify-start items-center w-screen p-5 gap-10
        bg-gray-700 min-h-screen h-full text-white
      "
    >
      <ContactForm 
        setContactListUpdated = {setContactListUpdated}
      />
      {isLoading? 
      <p>Loading...</p>
      :
        count>0?
        <>
          <ContactList 
            setContactListUpdated = {setContactListUpdated}
            page={page}
            contactListUpdated = {contactListUpdated}
          />
          <ContactPagination 
            count = {count}
            page = {page}
            setPage = {setPage} 
          />
        </>
          :
          <p>{message}</p>
      }
    </div>
  )
}

export default App
