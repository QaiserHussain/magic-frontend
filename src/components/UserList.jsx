import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa'
import { Avatar } from '@material-ui/core';
import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack';

const url = 'http://localhost:3001/api/v1/users';


function UserList() {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const getUsers = () => { return axios.get(url)}
    const delUser = (id) => { axios.delete(`${url}/${id}`)}
    const { mutateAsync } = useMutation(delUser)
    const { data, status } = useQuery('users', getUsers);
    const deleteUser = (id) => {
        mutateAsync(id, {
            onSuccess: () => {
                enqueueSnackbar('Successfully Deleted User', { variant: 'success', autoHideDuration: 2000 });
                queryClient.invalidateQueries('users');
            },
            onError: () => {
                enqueueSnackbar('Error found, user cant deleted', { variant: "error", autoHideDuration: 2000 });
            },
            onSettled: () => {
                queryClient.invalidateQueries('users');
            }
        })
    }


    console.log(data);
    if (status === 'loading') {
        return <div>loading....</div>
    }
    if (status === 'error') {
        return <div>error....</div>
    }
    return (
        <div>
            <table className='table'>
                <thead className='bg-slate-100'>
                    <tr>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data.map(i => (
                        <tr key={i}>
                            <td><Avatar alt="Remy Sharp" src={i.profileImageUrl} style={{ width: '24px', height: '24px' }} /></td>
                            <td>{i.firstName + " " + i.lastName}</td>
                            <td>{i.emailAddresses.map(i => i.emailAddress)}</td>
                            <td>{i.publicMetadata.class}</td>
                            <td>{i.publicMetadata.role}</td>
                            <td>
                                <div className='flex justify-around'>
                                    <FaTrash className='icon' onClick={() => deleteUser(i.id)} />
                                    <FaEdit className='icon' />
                                </div>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default UserList;