import React from 'react'
import { useParams } from 'react-router-dom';
import {useUser} from '@clerk/clerk-react'


function Testing() {
  
    const { publicMetadata } = useUser();
    return (
        <>
            <div>Testing</div>
            {publicMetadata.role}
        

        </>
    )
}

export default Testing;