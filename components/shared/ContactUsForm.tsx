'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon } from 'lucide-react';
const copyToClipboard = () => {
  const element = document.getElementById('link');
  if (element) {
    navigator.clipboard
      .writeText(element.innerText)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  } else {
    console.log('something wrong happened');
  }
};
export function ContactUsForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-sky-600 text-white">Start your free trial</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start your free trial</DialogTitle>
          <DialogDescription>call us to get access</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue="52035592" readOnly />
          </div>
          <Button
            onClick={copyToClipboard}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
