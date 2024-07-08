import { Button } from "@/components/ui/button"
import React from 'react'
function page(){
    return(
        <main className='container mx-auto p-4'>
            <header className="text-center my-8">
                <h1 className="text-2xl font-bold">Bookmarked Project</h1>
            </header>
            <section className="my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project1.jpg" alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Typhoon Bopha Relief Fund</h3>
                        <p className="mt-2">Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. 
                            Your contribution will provide essential relief and help rebuild lives.</p>
                        <div className="flex space x-16">
                        <Button className="mt-4">Support</Button>
                        <Button className="mt-4 ml-auto">Remove</Button>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project2.jpg" alt="Project 2" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Anti-poverty Program</h3>
                        <p className="mt-2">Our Anti-poverty Program aims to alleviate poverty by providing education, resources, and support to 
                            underprivileged communities. Join us in empowering individuals to build a better future.</p>
                        <div className="flex space x-16">
                        <Button className="mt-4">Support</Button>
                        <Button className="mt-4 ml-auto">Remove</Button>
                        </div>
                    </div>
                </div>
                </section>

                <header className="text-center my-8">
                <h1 className="text-2xl font-bold">More Projects</h1>
            </header>
            <section className="my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project3.jpg" alt="Project 3" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Malnutrition In The Philippines</h3>
                        <p className="mt-2">Help us combat malnutrition in the Philippines by providing nutritious food and education on healthy eating. 
                            Your support can save lives and promote healthier communities.</p>
                        <div className="flex space x-16">
                        <Button className="mt-4">Support</Button>
                        <Button className="mt-4 ml-auto">Bookmark</Button>
                        </div>
                </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project4.jpg" alt="Project 4" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Cultural Heritage Preservation</h3>
                        <p className="mt-2">This Project aims at preserving and promoting the rich cultural heritage of indigenous and 
                            local communities in the Philippines.This can include supporting traditional crafts, music, and festivals.
                            </p>
                        <div className="flex space x-16">
                        <Button className="mt-4">Support</Button>
                        <Button className="mt-4 ml-auto">Bookmark</Button>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                    <img src="Project5.jpg" alt="Project 5" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Education for All: Scholarship Fund</h3>
                        <p className="mt-2">Provide scholarships for underprivileged students in rural areas to access quality education and achieve their academic dreams.
                            Funds will be used for tuition, school supplies, and transportation.</p>
                        <div className="flex space x-16">
                        <Button className="mt-4">Support</Button>
                        <Button className="mt-4 ml-auto">Bookmark</Button>
                        </div>
                    </div>
                </div>
                </section>
        </main>
    
    )
}
export default page



/*const page = () => {
    const router = useRouter();
    <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-4 rounded shadow-md text-center mx-auto w-full md:w-1/2">
            <h1 className='text-2xl font-semibold mb-2'>Bookmarked Projects</h1>
            </div>*/