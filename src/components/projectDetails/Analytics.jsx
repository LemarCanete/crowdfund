import React from 'react'
import Radial from '@/components/Analytics/Radial'
// import LineGraph from '@/components/Analytics/LineGraph'
import AreaGraph from '@/components/Analytics/AreaGraph'
import PieGraph from '@/components/Analytics/PieGraph'
import BarGraph from '@/components/Analytics/BarGraph'
import AreaGraph2 from '@/components/Analytics/AreaGraph2'


const Analytics = ({projectDetails}) => {
    return (
        <div className='mx-20 grid grid-cols-2 gap-10 my-4'>
            <Radial projectDetails={projectDetails}/>
            {/* <LineGraph projectDetails={projectDetails}/> */}
            <AreaGraph />
            <PieGraph />
            <BarGraph />
            <div className="">
                <AreaGraph2 />
            </div>
        </div>
    )
}

export default Analytics