import React from 'react'

import DonationLogs from '@/components/Logs/DonationLogs'
import AdminActionsLogs from '@/components/Logs/AdminActionsLogs'

const Logs = ({projectDetails}) => {
    
    return (
        <div className='md:mx-20'>
            <h1 className="font-bold mt-4">Donation Logs</h1>
            <DonationLogs projectDetails={projectDetails}/>

            {/* <h1 className="">Admin Actions Logs</h1> */}
            {/* <AdminActionsLogs /> */}
            {/* <h1 className="">Review Logs</h1>
            <h1 className="">Milestone Logs</h1> */}
        </div>
    )
}

export default Logs