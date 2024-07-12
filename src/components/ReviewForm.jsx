import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import { List, ListItem } from '@/components/ui/list';
import {Button} from '@/components/ui/button'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import { formatDistanceToNow } from "date-fns";

//Review functions
const ReviewForm = ({ projectId }) => {
    const { currentUser } = useContext(AuthContext); 
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState('');
    
    useEffect(() => {
        const fetchReviews = async () => {
            const q = query(collection(db, 'reviews'), where('projectId', '==', projectId));
            const querySnapshot = await getDocs(q);
            
            const reviewsList = querySnapshot.docs.map(doc => doc.data());
            setReviews(reviewsList);
            //make the reviewlist to descending order
            reviewsList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
            setReviews(reviewsList);
        };
        fetchReviews();
    }, [projectId]);

    const handleInputChange = (event) => {
        setReview(event.target.value);
       
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (review.trim()) {
            try {
                await addDoc(collection(db, 'reviews'), {
                    projectId,
                    review,
                    createdAt: new Date(),
                    user: {
                        name: currentUser ? currentUser.displayName : 'Anonymous',
                        email: currentUser ? currentUser.email : "Anonymous",
                        photoURL: currentUser.photoURL 
                    }
                    
                });
                setReviews([{ review, user: { name: currentUser.displayName, photoURL: currentUser.photoURL }, createdAt: new Date() }, ...reviews]);
                setReview('');

                // window.location.reload();
            } catch (error) {
               
                alert("Please login to add a review.");
            }
        }
        // window.location.reload();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-4">
                <Label htmlFor="review" className="mb-2 block">Add a review:</Label>
                <Textarea
                    id="review"
                    value={review}
                    onChange={handleInputChange}
                    placeholder="Write your review here..."
                    className="min-w-full"
                />
                <Button  className= "mt-6" type="submit">Submit Review</Button>
            </form>
            <div>
                <h2 className="text-xl font-bold mb-2">Reviews:</h2>
                <List>
                {reviews.map((rev, index) => (
                     <ListItem key={index} className="mb-2 p-2 border-b flex items-center">
                         <Avatar className="mr-4">
                         <AvatarImage src={rev.user.photoURL} alt={rev.user.name} />
                        <AvatarFallback>{rev.user ? rev.user.name[0] : 'A'}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold">{rev.user ? rev.user.name : 'Anonymous'}</p> 
                            <p>{rev.review}</p>
                             
                             <p className="text-gray-500 text-xs">
                                    {rev.createdAt instanceof Date ?
                                        formatDistanceToNow(rev.createdAt, { addSuffix: true }) :
                                        formatDistanceToNow(rev.createdAt.toDate(), { addSuffix: true })}
                                </p>
                        </div> 
                    </ListItem>
    ))}                          
                </List>
            </div>
        </div>
    );
};

export default ReviewForm