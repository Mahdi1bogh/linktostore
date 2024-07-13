import { useCart } from '@/context/CartContext';
import { FC } from 'react';

export interface CartProductCardProps {}
interface itemProps {
  item: {
    name: string;
    price: number;
    quantity: number;
    img: string;
  };
}
const CartProductCard: React.FC<itemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (delta: number) => {
    updateQuantity(item.name, item.quantity + delta);
  };
  return (
    <div className="flex gap-4">
      <img
        src={`${process.env.NEXT_PUBLIC_STORAGE}/${item.img}`}
        width={200}
        height={200}
        alt="Thumbnail"
        className="w-[60px] h-[60px] rounded-lg border border-secondary"
      />

      <div className="flex flex-col gap-2">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-left font-semibold">
          {(item.price * item.quantity).toFixed(2)} TND
        </p>
      </div>

      <div className="ml-auto flex items-center">
        <div className="flex">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
            className="px-2 py-1 text-sm text-gray-600 border rounded-l focus:outline-none disabled:text-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-200"
          >
            -
          </button>
          <span className="px-2 py-1 text-sm border-t border-b">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 text-sm text-gray-600 border rounded-r focus:outline-none"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
// interface itemProps {
//   item: {
//     name: string;
//     price: number;
//     quantity: number;
//   };
// }
// const CartProductCard: React.FC<itemProps> = ({ item }) => {
//   const { updateQuantity, removeFromCart } = useCart();

//   const handleQuantityChange = (delta: number) => {
//     updateQuantity(item.name, item.quantity + delta);
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center justify-between p-4 border-b">
//       <div className="flex items-center mb-4 md:mb-0">
//         {/* <img
//           src={item.img}
//           alt={item.name}
//           className="h-16 w-16 object-cover rounded"
//         /> */}
//         <div className="ml-4">
//           <p className="text-lg font-semibold">{item.name}</p>
//           <p className="text-sm text-gray-600">Price: {item.price} TND</p>
//         </div>
//       </div>
//       <div className="flex items-center mb-4 md:mb-0">
//         <button
//           onClick={() => handleQuantityChange(-1)}
//           disabled={item.quantity <= 1}
//           className="px-2 py-1 text-sm text-gray-600 border rounded-l focus:outline-none disabled:text-gray-400 disabled:bg-gray-200"
//         >
//           -
//         </button>
//         <span className="px-2 py-1 text-sm border-t border-b">
//           {item.quantity}
//         </span>
//         <button
//           onClick={() => handleQuantityChange(1)}
//           className="px-2 py-1 text-sm text-gray-600 border rounded-r focus:outline-none"
//         >
//           +
//         </button>
//       </div>
//       <p className="text-lg font-semibold mb-4 md:mb-0">
//         {(item.price * item.quantity).toFixed(2)} TND
//       </p>
//       <button
//         onClick={() => removeFromCart(item.name)}
//         className="text-gray-600 hover:text-red-500 focus:outline-none"
//       >
//         Remove
//       </button>
//     </div>
//   );
// };
// export default CartProductCard;
