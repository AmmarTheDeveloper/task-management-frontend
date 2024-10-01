import React, { useState } from 'react'

const usePagination = ( fetchTasks ) => {

    const [ pagination, setPagination ] = useState( { page: 1, limit: 5, totalPages: 1 } );

    const handleNextPage = async () => {
        if ( pagination.page < pagination.totalPages ) {
            await fetchTasks( pagination.page + 1, pagination.limit );
            setPagination( ( prev ) => ( { ...prev, page: prev.page + 1 } ) )

        }
    };

    const handlePreviousPage = async () => {
        if ( pagination.page > 1 ) {
            await fetchTasks( pagination.page - 1, pagination.limit );
            setPagination( ( prev ) => ( { ...prev, page: prev.page - 1 } ) );
        }
    };

    return {
        pagination, setPagination, handleNextPage, handlePreviousPage
    }
}

export default usePagination
