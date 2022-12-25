import React, { useState } from 'react'
import { FaUserGraduate, FaUserAlt, FaChalkboardTeacher, FaCopy } from 'react-icons/fa'
import QuizesAssigned from '../QuizesAssigned'
import StudentForm from './StudentForm'
import { useStats } from "../../shared/queries";
import UserList from '../UserList';
import QuizList from '../QuizList';

function AdminContent() {
    const { data, isError } = useStats();

    return (
        <div className="flex-1">
            <div className='grid gap-4 grid-cols-4'>
                <div className="border rounded p-5 flex justify-between items-center">
                    <div>
                        <h2 className='text-4xl text-center'>{data?.users}</h2>
                        <p>Users</p>
                    </div>
                    <div className='text-4xl'>
                        <FaUserAlt />
                    </div>
                </div>
                <div className="border rounded p-5 flex justify-between items-center">
                    <div>
                        <h2 className='text-4xl text-center'>{data?.teacher}</h2>
                        <p>Teachers</p>
                    </div>
                    <div className='text-4xl'>
                        <FaChalkboardTeacher />
                    </div>
                </div>
                <div className="border rounded p-5 flex justify-between items-center">
                    <div>
                        <h2 className='text-4xl text-center'>{data?.student}</h2>
                        <p>Students</p>
                    </div>
                    <div className='text-4xl'>
                        <FaUserGraduate />
                    </div>
                </div>
                <div className="border rounded p-5 flex justify-between items-center">
                    <div>
                        <h2 className='text-4xl text-center'>{data?.quizes}</h2>
                        <p>Quizes</p>
                    </div>
                    <div className='text-4xl'>
                        <FaCopy />
                    </div>
                </div>
            </div>
            <div className='flex mt-5 gap-6'>
                <div className='flex-1 mt-5 h-96' style={{overflow:'auto'}}>
                    <UserList />
                </div>
                <div className='flex w-80 mt-5'>
                    <StudentForm />
                </div>
            </div>
            <div className='flex-1 mt-10'>
                <QuizList />
            </div>


        </div>
    )
}

export default AdminContent