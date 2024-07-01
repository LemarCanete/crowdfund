'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter();

    return (
        <div>
            <Button onClick={()=>router.push('/About')}>Button</Button>
            <img src="/vercel.svg" alt="" />
        </div>
        
    )
}

export default page