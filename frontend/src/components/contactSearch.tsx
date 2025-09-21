import { useState } from "react";

const ContactSearch = (
    { 
        searchText, 
        setSearchText,
    }:
    {
        searchText: string;
        setSearchText: React.Dispatch<React.SetStateAction<string>>;
    }
) => {

    return(
        <div>
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Search using contact name or email or phone"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)} 
            />
        </div>
    )
}

export default ContactSearch;