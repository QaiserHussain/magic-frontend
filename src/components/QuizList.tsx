import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa'
import { Avatar } from '@material-ui/core';
import { useQuizes, useStatsByQuizId, useDeleteQuiz } from "../shared/queries";
import { endpoints } from "../shared/urls";
import { DeleteModal } from "./DeleteModal";
import { errorMessages, successMessages } from "../shared/constants";
import { useSnackbar } from "notistack";
import { IQuiz } from "../shared/interfaces";



function QuizList() {
    const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>();
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const handleDeleteModalOpen = (item: any) => {
        setDeleteModalActive(true)
        setSelectedQuiz(item)

    };
    const handleDeleteModalClose = () => setDeleteModalActive(false);
    // const {mutateAsync} = useMutation();
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();


    const { isLoading, reset, mutateAsync } = useDeleteQuiz(selectedQuiz?._id || "id");

    const onDelete = () => {

        mutateAsync(
            {},
            {
                onSuccess: () => {
                    enqueueSnackbar(successMessages.actionSuccess("Deleted", "Quiz"), {
                        variant: "success",
                    });
                    queryClient.invalidateQueries(["Quizes"]);
                    setSelectedQuiz(null);
                },
                onError: () => {
                    enqueueSnackbar(errorMessages.default, { variant: "error" });
                },
                onSettled: () => {
                    reset();
                    handleDeleteModalClose();
                },
            }
        );
    };
    const { data, isLoading: loading, isFetching, isSuccess, error } = useQuizes(endpoints.quizes, ["Quizes"]);
    if (loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error...</div>
    }
    console.log(data);
    return (
        <div>
            <table className='table'>
                <thead className='bg-slate-100'>
                    <tr>
                        {/* <th>Profile</th>
                <th>Author</th> */}
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Questions</th>
                        <th>Status</th>
                        <th>Class</th>
                        {/* <th>CreatedAt</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.quizes.map((i: any) => (
                        <tr key={i}>
                            {/* <td><Avatar alt="Remy Sharp" src='' style={{width:'24px',height:'24px'}} /></td>
                                <td>{'author'}</td> */}
                            <td>{i.title}</td>
                            <td>{i.description}</td>
                            <td>{i.category}</td>
                            <td>{i.questionsCount}</td>
                            <td>{i.status}</td>
                            <td>{i.class}</td>
                            {/* <td>{i.createdAt}</td> */}
                            <td>
                                <div className='flex justify-around'>
                                    <FaTrash className='icon ' onClick={() => handleDeleteModalOpen(i)} />
                                    <FaEdit className='icon' />
                                    {/* <FaEye className='icon' /> */}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                <td><Avatar alt="Remy Sharp" src='' style={{width:'24px',height:'24px'}} /></td>
                <td>Author</td>
                <td>Title</td>
                <td>Description</td>
                <td>Category</td>
                <td>No of Questions</td>
                <td>Status</td>
                <td>Assign to Class</td>
                <td>CreatedAt</td>
                <td>
                    <div className='flex justify-around'>
                        <FaTrash className='icon' />
                        <FaEye className='icon' />
                    </div>
                </td>
            </tr> */}

                </tbody>
            </table>
            {deleteModalActive && (
                <DeleteModal
                    deleteLoading={isLoading}
                    deleteModalActive={deleteModalActive}
                    handleDeleteModalClose={handleDeleteModalClose}
                    onDelete={onDelete}
                    resource="Quiz"
                />
            )}
        </div>
    )
}

export default QuizList;