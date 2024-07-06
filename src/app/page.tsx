import { Button } from "@/components/ui/button"

export default function Home() {
    return (
        <main className="container mx-auto p-4">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">CrowdFund Project</h1>
                <p className="mt-4 text-lg">Join us in supporting innovative projects and making dreams come true.</p>
            </header>
            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project1.jpg" alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Typhoon Bopha Relief Fund</h3>
                        <p className="mt-2">Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. 
                            Your contribution will provide essential relief and help rebuild lives.</p>
                        <Button className="mt-4">Support</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project2.jpg" alt="Project 2" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Anti-poverty Program</h3>
                        <p className="mt-2">Our Anti-poverty Program aims to alleviate poverty by providing education, resources, and support to 
                            underprivileged communities. Join us in empowering individuals to build a better future.</p>
                        <Button className="mt-4">Support</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project3.jpg" alt="Project 3" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Malnutrition In The Philippines</h3>
                        <p className="mt-2">Help us combat malnutrition in the Philippines by providing nutritious food and education on healthy eating. 
                            Your support can save lives and promote healthier communities.</p>
                        <Button className="mt-4">Support</Button>
                    </div>
                </div>
            </section>
            <section className="text-center my-8">
                <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Own Campaign?</h2>
                <Button className="px-6 py-2 text-lg">Get Started</Button>
            </section>
        </main>
    );
}