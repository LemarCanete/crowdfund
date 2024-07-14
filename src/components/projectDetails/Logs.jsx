import React from 'react'

import DonationLogs from '@/components/Logs/DonationLogs'
import AdminActionsLogs from '@/components/Logs/AdminActionsLogs'

const Logs = ({projectDetails}) => {
    
    return (
        <div className='mx-20'>
            <h1 className="">Donation Logs</h1>
            <DonationLogs projectDetails={projectDetails}/>

            <h1 className="">Admin Actions Logs</h1>
            <AdminActionsLogs />
            <h1 className="">Update Logs</h1>
            <h1 className="">Comment Logs</h1>
            <h1 className="">Milestone Logs</h1>
        </div>
    )
}

export default Logs