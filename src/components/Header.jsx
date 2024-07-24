import React from 'react'
import { Card, CardContent, CardIte } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {Button} from '@/components/ui/button'
import Link from 'next/link'

const Header = () => {
    return (
        <div className='w-full'>
            {/* Carousel */}
            <Carousel className="w-full">
                <CarouselContent className="w-full">
                    {CardItem.map((item, i) => {
                        return(
                            <CarouselItem className="p-0 w-full relative" key={i}>
                                <div className="p-0 w-full relative">
                                    <Link href={item.link}>
                                        <Button className='absolute z-20 w-96 py-6 tracking-widest text-xl m-auto left-0 right-0 top-96 bottom-0'
                                            variant="outline"
                                        >
                                            {item.item}
                                        </Button>
                                    </Link>
                                    <Card className='rounded-none w-full'>
                                        <CardContent className="p-0 w-full h-[705px]"> 
                                            <img className='object-cover w-full h-full' src={item.img}/>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        )
                    })}
                </CarouselContent>
                <CarouselPrevious />
                
            </Carousel>
            
            
        </div>
    )
}

export default Header
