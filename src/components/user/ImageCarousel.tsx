import React, { ReactNode } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Props = {
  children: ReactNode;
};
export default function ImageCarousel({ children }: Props) {
  return (
    <Carousel
      containerClass='flex-1 rounded-lg border-[1px]'
      infinite
      responsive={{
        desktop: {
          breakpoint: {
            max: 4000,
            min: 576,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 576,
            min: 0,
          },
          items: 1,
        },
      }}
    >
      {children}
    </Carousel>
  );
}
