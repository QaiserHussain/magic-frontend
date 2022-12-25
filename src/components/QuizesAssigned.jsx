import React from 'react'
import './table.css'
import { FaTrash, FaEye } from 'react-icons/fa'
function QuizesAssigned() {
    return (
        <div>
            <table className='table'>
                <thead className='bg-slate-100'>
                    <tr>
                        <th>Teacher Info</th>
                        <th>Quiz Info</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                        <td>
                        <div className='flex justify-around'> 
                            <FaTrash className='icon' />
                            <FaEye className='icon' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Witchy Woman</td>
                        <td>The Eagles</td>
                        <td>1972</td>
                        <td >
                           <div className='flex justify-around'> 
                            <FaTrash className='icon' />
                            <FaEye className='icon' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                        <td>
                        <div className='flex justify-around'> 
                            <FaTrash className='icon' />
                            <FaEye className='icon' />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Shining Star</td>
                        <td>Earth, Wind, and Fire</td>
                        <td>1975</td>
                        <td>
                        <div className='flex justify-around'> 
                            <FaTrash className='icon'/>
                            <FaEye className='icon'/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default QuizesAssigned