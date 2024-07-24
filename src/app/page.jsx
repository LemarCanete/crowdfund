'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter();

    return (
        <main className="container mx-auto p-0 m-0">         
            <header className="text-center">
                <img src="/logo transparent.png" alt="CrowdFund Project Logo" className="mx-auto mb-4 w-96 h-auto"/>
                <p className="mt-2 text-lg">Join us in supporting innovative projects and making dreams come true.</p>
                
            </header>
        
            <section className="my-16 text-center">
                <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-gray-100 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-2">Create a Campaign</h3>
                        <p>Share your story and set a goal to start raising funds.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-2">Share with Your Network</h3>
                        <p>Promote your campaign to reach more donors.</p>
                    </div>
                    <div className="p-6 bg-gray-100 rounded shadow-md">
                        <h3 className="text-xl font-bold mb-2">Achieve Your Goals</h3>
                        <p>Receive funds and make a difference in your community.</p>
                    </div>
                </div>
            </section>

            <section className="my-16 text-center">
                <h2 className="text-3xl font-semibold mb-8">What Our Donors Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded shadow-md">
                        <p className="italic">&quot;This platform helped me support a cause close to my heart. The process was smooth and transparent.&quot;</p>
                        <h3 className="mt-4 font-bold">- Jane Doe</h3>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <p className="italic">&quot;I was able to make a real difference thanks to this amazing crowdfunding platform.&quot;</p>
                        <h3 className="mt-4 font-bold">- John Smith</h3>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <p className="italic">&quot;An excellent platform for funding innovative projects. Highly recommended!&quot;</p>
                        <h3 className="mt-4 font-bold">- Sarah Lee</h3>
                    </div>
                </div>
            </section>

                
            <section className="my-16 text-center">
                <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"> 
                    <div className="p-6 bg-white rounded shadow-md">
                        <img src="/member1.jpg" alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Lemar <br />Cañete</h3>
                        <p className="mt-2">Full Stack Developer</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <img src="/member2.jpg" alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Jusiem Lee Pontejon</h3>
                        <p className="mt-2">Frontend & Backend Developer</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <img src="/member3.jpg" alt="Team Member 3" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Avery Yshie Cahilig</h3>
                        <p className="mt-2">Frontend & Backend Developer</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <img src="/member4.jpg" alt="Team Member 4" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Cyrel Joy <br />Sasan</h3>
                        <p className="mt-2">Frontend Developer</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md">
                        <img src="/member5.jpg" alt="Team Member 5" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Danielle Macanda</h3>
                        <p className="mt-2">Frontend & Asst. Backend Developer</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow-md"> 
                        <img src="/member6.jpg" alt="Team Member 6" className="w-32 h-32 mx-auto rounded-full mb-4"/>
                        <h3 className="text-xl font-bold">Jhon Mart Manigos</h3>
                        <p className="mt-2">Frontend Developer</p>
                    </div>
                </div>
                <h3 className="text-2xl font-bold mt-8">Team Bangan</h3>
            </section>

            <section className="text-center my-16 bg-gray-200 py-16 rounded-lg">
                <h2 className="text-3xl font-semibold mb-4">Ready to Start Your Own Campaign?</h2>
                <Button onClick={()=>router.push(`HomePage`)} className="px-6 py-3 text-xl">Get Started</Button>
            </section>
        </main>
    );
}
