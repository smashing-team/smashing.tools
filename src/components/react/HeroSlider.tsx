import { motion, MotionConfig, useMotionValue } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

const AUTO_DELAY = 1000 * 5;
const DRAG_BUFFER = 10;

const Images = ({
  images,
  imgIndex,
}: {
  images: string[];
  imgIndex: number;
}) => {
  return (
    <>
      {images.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            animate={{
              scale: imgIndex === idx ? 1 : 0.75,
            }}
            className="aspect-[16/10] w-full shrink-0 rounded-3xl bg-neutral-800 object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({
  images,
  imgIndex,
  setImgIndex,
}: {
  images: string[];
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {images.map((_, idx) => {
        return (
          <button
            aria-label="Change image"
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex
                ? 'bg-neutral-200 dark:bg-neutral-50'
                : 'bg-neutral-500 dark:bg-neutral-500'
            }`}
          />
        );
      })}
    </div>
  );
};

export const HeroSlider = ({ images = [] }: { images: string[] }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === images.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  if (images.length === 0) {
    return null;
  }

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="relative mt-4 overflow-hidden rounded-3xl bg-white dark:bg-neutral-950">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${imgIndex * 100}%`,
          }}
          onDragEnd={onDragEnd}
          className="flex cursor-grab items-center active:cursor-grabbing"
        >
          <Images images={images} imgIndex={imgIndex} />
        </motion.div>

        {/* <GradientEdges /> */}
      </div>
      <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </MotionConfig>
  );
};
