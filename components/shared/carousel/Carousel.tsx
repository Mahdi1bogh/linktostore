// 'use client';
// import React, { useState } from 'react';

// const Carousel = ({ images }: any) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const goToSlide = (index: number) => {
//     setActiveIndex(index);
//   };

//   const goToPrevSlide = () => {
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   const goToNextSlide = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   return (
//     <div
//       id="default-carousel"
//       className="relative w-full h-full"
//       data-carousel="slide"
//     >
//       <div className="relative h-full w-full overflow-hidden rounded-lg">
//         {images.map((src: string, index: number) => (
//           <div
//             key={index}
//             className={`h-full w-full relative ${
//               index === activeIndex ? 'block' : 'hidden'
//             }`}
//             data-carousel-item
//           >
//             <img
//               src={`${process.env.NEXT_PUBLIC_STORAGE}/${src}`}
//               className="absolute h-full w-full rounded-lg object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//               alt={`Slide ${index + 1}`}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
//         {images.map((_: any, index: number) => (
//           <button
//             key={index}
//             type="button"
//             className={`w-3 h-3 rounded-full ${
//               index === activeIndex ? 'bg-white' : 'bg-gray-300'
//             }`}
//             aria-current={index === activeIndex ? 'true' : 'false'}
//             aria-label={`Slide ${index + 1}`}
//             onClick={() => goToSlide(index)}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
'use client';
import React, { useState } from 'react';

const Carousel = ({ images }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-ful flex h-[80%] overflow-hidden">
      <div
        className="whitespace-nowrap transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((src: string, index: number) => (
          <div
            key={index}
            className="inline-block w-full h-full"
            data-carousel-item
          >
            <img
              src={`${process.env.NEXT_PUBLIC_STORAGE}/${src}`}
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
        {images.map((_: any, index: number) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-gray-300'
            }`}
            aria-current={index === activeIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
