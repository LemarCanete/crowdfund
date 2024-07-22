'use client'
import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase-config";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [topProjects, setTopProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "projects"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const proj = [];
                querySnapshot.forEach((doc) => {
                    proj.push({ uid: doc.id, ...doc.data() });
                });

                // Sort projects by raisedAmount and get the top 3
                const topProj = [...proj].sort((a, b) => b.raisedAmount - a.raisedAmount).slice(0, 3);
                setTopProjects(topProj);
            });
        }
        fetchData();
    }, []);

    return (
        <main className="container mx-auto p-4">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">CrowdFund Project</h1>
                <p className="mt-4 text-lg">Join us in supporting innovative projects and making dreams come true.</p>
            </header>
            <section className="my-8">
                <h2 className="text-2xl font-semibold mb-4">Featured Campaigns</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {topProjects.map((proj, key) => (
                        <div className="bg-white p-4 rounded shadow-md" key={key}>
                            <img src={proj.coverPhoto} alt="Project" className="w-full h-48 object-cover rounded mb-4"/>
                            <h3 className="text-xl font-bold">{proj.title}</h3>
                            <p className="mt-2">{proj.description}</p>
                            <Progress value={(proj.raisedAmount/proj.targetAmount)*100} className="w-[85%] mt-4" />
                            <div className="flex flex-row">
                                <p className="basis-1/2">{proj.raisedAmount} php</p>
                                <p className="basis-1/2">Goal: {Number(proj.targetAmount).toLocaleString()} php</p>
                            </div>
                            <Button className="mt-4" onClick={() => router.push(`Projects/${proj.uid}`)}>Support</Button>
                        </div>
                    ))}
                </div>
            </section>
           
        </main>
    );
}
