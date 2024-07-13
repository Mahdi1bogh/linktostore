import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import AddProductForm from '../vendor-admin/forms/AddProduct';

export default function AddProductSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-max bg-blue-600 hover:bg-blue-500">
          + Nouveau produit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajouter un produit</SheetTitle>
          <SheetDescription>
            Completer la formulaire pour ajouter un produit{' '}
          </SheetDescription>
        </SheetHeader>
        <AddProductForm />
      </SheetContent>
    </Sheet>
  );
}
