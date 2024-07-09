import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Toggle } from '@/components/ui/toggle';
import { usePathname } from "next/navigation"; 
import { CiBookmark, CiEdit, CiFlag1, CiHeart, CiPen, CiShare2 } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";

const ShareLink = () =>{
    const link = usePathname();
    const base = 'localhost:3000/'

    const copyLink = (e) =>{
        navigator.clipboard.writeText(base + link)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Toggle><CiShare2 className='text-xl'/></Toggle>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Share Link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                    Link
                    </Label>
                    <Input
                    id="link"
                    defaultValue={link}
                    readOnly
                    />
                </div>
                <Button type="submit" size="sm" className="px-3" onClick={copyLink}>
                    <span className="sr-only">Copy</span>
                    <IoCopyOutline className="h-4 w-4" />
                </Button>
                </div>
                <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ShareLink