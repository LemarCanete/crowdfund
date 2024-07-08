/*'use client'
import { Button } from '@/components/ui/button'*/
import React from 'react'
/*import { useRouter } from 'next/navigation'*/
function page(){
    return(
        <main className='container mx-auto p-4'>
        <header className="text-center my-8">
            <h1 className="text-4xl font-bold">Bookmarked Messages</h1>
        </header>
    </main>
    )
}
export default page



/*const page = () => {
    const router = useRouter();

    return (
        <div>
            <Button onClick={()=>router.push('/About')}>Button</Button>
            <img src="/vercel.svg" alt="" />
        </div>
        
    )
}

export default page*/