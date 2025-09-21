import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ContactPagination = (
    {
        count,
        page,
        setPage
    }:{
        count: number; 
        page: number;
        setPage: React.Dispatch<React.SetStateAction<number>>;
    }
) => {

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    return(
        <div>
            <Stack spacing={2} >
                <Pagination 
                    count={count} 
                    color='primary' 
                    shape='rounded'
                    page={page}
                    onChange={handlePageChange} 
                    size='large'
                />
            </Stack>
        </div>
    )
}

export default ContactPagination;
