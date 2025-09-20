import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ContactPagination = (
    {count}:{count: number}
) => {
    return(
        <Stack spacing={2} >
            <Pagination count={count} variant='outlined' color='primary' />
        </Stack>
    )
}

export default ContactPagination;
