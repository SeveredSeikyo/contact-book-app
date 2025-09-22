import { MdSearch } from "react-icons/md";

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
        <div className="flex p-2 items-center rounded-full m-0 border-white border-2 border-white w-[90%]">
            <MdSearch className="text-2xl text-white" />
            <input
                type="text"
                name="search"
                id="search"
                placeholder="Contact Name/Email/Phone"
                value={searchText}
                onChange={(e)=>{
                    setSearchText(e.target.value)
                }}
                className="px-5 h-10 w-70 border-none outline-none" 
            />
        </div>
    )
}

export default ContactSearch;