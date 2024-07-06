import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"


export default function Projects() {
    return (
        <main className="container mx-auto p-4">
            <header className="flex flex-col items-center mt-4">
            <h1 className="text-4xl font-bold">CrowdFund Projects</h1>
            <Input type="text" 
            className="box-content p-2 border size-2/6 mt-4"
            placeholder="Search Projects"/>
            <Button className="mt-4"> Add Your Project
                </Button>
            </header>
            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project1.jpg" alt="Project 1" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Typhoon Bopha Relief Fund</h3>
                        <p className="mt-2">Typhoon Bopha devastated communities in the Philippines, leaving many without homes and basic necessities. 
                            Your contribution will provide essential relief and help rebuild lives.</p>
                            <Progress value={35} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                            <p className="basis-1/2">Raised:70,000 php</p>
                            <p className="basis-1/2">Goal:200,000 php</p>
                            <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                            </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="/Project2.jpg" alt="Project 2" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Anti-poverty Program</h3>
                        <p className="mt-2">Our Anti-poverty Program aims to alleviate poverty by providing education, resources, and support to 
                            underprivileged communities. Join us in empowering individuals to build a better future.</p>
                            <Progress value={40} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                            <p className="basis-1/2">Raised:140,000 php</p>
                            <p className="basis-1/2">Goal:350,000 php</p>
                            <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                            </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project3.jpg" alt="Project 3" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Malnutrition In The Philippines</h3>
                        <p className="mt-2">Help us combat malnutrition in the Philippines by providing nutritious food and education on healthy eating. 
                            Your support can save lives and promote healthier communities.</p>
                            <Progress value={85} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                            <p className="basis-1/2">Raised:255,000 php</p>
                            <p className="basis-1/2">Goal:300,000 php</p>
                            <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                            </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project4.jpg" alt="Project 4" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Cultural Heritage Preservation</h3>
                        <p className="mt-2">This Project aims at preserving and promoting the rich cultural heritage of indigenous and 
                            local communities in the Philippines.This can include supporting traditional crafts, music, and festivals.
                            </p>
                            <Progress value={50} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                        <p className="basis-1/2">Raised:75,000 php</p>
                        <p className="basis-1/2">Goal:150,000 php</p>
                        <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                        </div>
                        <Button className="mt-4">More Details</Button>

                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project5.jpg" alt="Project 5" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Education for All: Scholarship Fund</h3>
                        <p className="mt-2">Provide scholarships for underprivileged students in rural areas to access quality education and achieve their academic dreams.
                            Funds will be used for tuition, school supplies, and transportation.</p>
                            <Progress value={80} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                        <p className="basis-1/2">Raised:200,000 php</p>
                        <p className="basis-1/2">Goal:250,000 php</p>
                        <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                        </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                    <div className="bg-white p-4 rounded shadow-md">
                        <img src="Project6.jpg" alt="Project 6" className="w-full h-48 object-cover rounded mb-4"/>
                        <h3 className="text-xl font-bold">Reforestation and Environmental Conservation</h3>
                        <p className="mt-2">Plant trees and restore degraded forest areas to combat deforestation and promote biodiversity. Funds will support tree planting activities,
                            community education, and conservation efforts.
                        </p>
                        <Progress value={70} className="w-[85%] mt-4" />
                        <div className="flex flex-row">
                        <p className="basis-1/2">Raised:70,000 php</p>
                        <p className="basis-1/2">Goal:100,000 php</p>
                        <Button variant="outline" className="gap-1.5">
                            <BookmarkIcon className="h-4 w-4" />
                        </Button>
                        </div>
                        <Button className="mt-4">More Details</Button>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </main>
    )
}
function BookmarkIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}