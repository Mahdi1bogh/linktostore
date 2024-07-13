'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartProductCard from './CartProductCard';

export interface StoreHeaderCartProps {}

const StoreHeaderCart = (props: StoreHeaderCartProps) => {
  const { cartItems, total } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative h-10">
          <ShoppingBag className="w-4 h-4" />
          {cartItems.length > 0 && ( // Only display the badge if there are items in the cart
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-screen">
        <SheetHeader>
          <SheetTitle>My cart</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {cartItems.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <CartProductCard key={item.name} item={item} />
              ))}
            </>
          )}
        </div>
        <div className="mt-auto text-right">
          <span>Total:</span>&nbsp;
          <span className="text-sm">{total.toFixed(2)} TND</span>
        </div>
        <SheetFooter>
          <SheetClose className="w-full mt-auto" asChild>
            <Button type="submit">Proceed to Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StoreHeaderCart;
