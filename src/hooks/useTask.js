import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";

function useTask () {

    const [ tasks, setTasks ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ reports, setReports ] = useState( [] )
    const [ reportLoading, setReportLoading ] = useState( true );

    const fetchTasks = async ( page = 1, limit = 5, filters = {} ) => {
        setLoading( true );
        try {
            const response = await axios.get(
                import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + `/api/tasks?page=${ page }&limit=${ limit }`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem( "token" ),
                    },
                    params: filters
                }
            );
            setTasks( response.data.tasks );
            return { pagination: response.data.pagination }
        } catch ( error ) {
            setTasks( [] );
            return { pagination: { page: 1, totalPages: 1, limit: 5 } }
        } finally {
            setLoading( false );
        }

    };

    const addTask = async ( values ) => {
        try {
            await axios.post(
                `${ import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL }/api/tasks`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
                    },
                }
            );
            return { success: true }

        } catch ( error ) {
            return { success: false, error }
        }
    }

    const deleteTask = async ( id ) => {
        const isAgree = confirm( "Are you sure you want to delete this task" );
        if ( isAgree ) {
            try {
                const response = await axios.delete( import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + `/api/tasks/${ id }`, {
                    headers: {
                        Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
                    },
                } );
                if ( response.data.success ) {
                    fetchTasks();
                    toast.success( "Task deleted successfully" )
                    console.log( "Task deleted successfully:", response.data.message );
                } else {
                    toast.error( response.data.error )
                    console.error( "Error:", response.data.error );
                }
            } catch ( error ) {
                toast.error( error.response.data.message )
                console.error( "Error deleting task:", error );
            }
        }
    }

    const updateTask = async ( id, values ) => {
        try {
            const response = await axios.put( import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + `/api/tasks/${ id }`, values, {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
                },
            } );

            if ( response.data.success ) {
                return {
                    success: true,
                    task: response.data.updatedTask,
                };
            } else {
                return {
                    success: false,
                    message: response.data.error || "Failed to update task",
                };
            }
        } catch ( error ) {
            return {
                success: false,
                message: error.response?.data?.message || "An error occurred while updating the task",
            };
        }
    };

    const getTaskById = async ( id ) => {
        try {
            const response = await axios.get( import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + `/api/tasks/${ id }`, {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
                },
            } );

            if ( response.data.success ) {
                return {
                    success: true,
                    task: response.data.task,
                };
            } else {
                return {
                    success: false,
                    error: response.data.message || "Failed to fetch task",
                };
            }
        } catch ( error ) {
            console.log( error )
            return {
                success: false,
                error: error.response?.data?.message || "An error occurred while fetching the task",
            };
        }
    }


    const fetchReport = async ( filters = {} ) => {
        try {
            setReportLoading( true )

            const response = await axios.get( import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL + "/api/report", {
                headers: {
                    Authorization: `Bearer ${ localStorage.getItem( "token" ) }`,
                },
                params: filters
            } );

            if ( response.data.success ) {
                setReports( response.data.tasks )
            } else {
                setReports( [] )
                toast.error( error.data.message )
            }

        } catch ( error ) {
            setReports( [] )
            toast.error( error?.response?.data?.message || error.message )
            console.error( "Error fetching task report:", error );
        } finally {
            setReportLoading( false )
        }
    }
    return {
        fetchTasks,
        addTask,
        deleteTask,
        getTaskById,
        updateTask,
        loading,
        tasks,
        reports,
        reportLoading,
        fetchReport
    }

}

export default useTask;