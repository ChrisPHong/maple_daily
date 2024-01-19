import { useState } from 'react';
import ClassListForm from './ClassListForm';


const ClassList = () => {
    return (
        <div className='flex justify-center items-center mt-10 border flex-col'>
            <tb>
                <tr className='bg-gray-200 text-red-500'>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
                <tr>hello</tr>
            </tb>
            <ClassListForm />
        </div>
    )
}



export default ClassList;
