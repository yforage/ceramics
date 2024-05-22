import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { useRefComputedStyles, useWindowDimensions } from "../../utils";

interface IImagesPreviewProps {
  images?: string[];
  className?: string;
}

const ImagesPreview: React.FC<IImagesPreviewProps> = ({
  images,
  className,
}) => {
  const [current, setCurrent] = useState(0);

  const { width } = useWindowDimensions();
  const { targetRef, targetStyles } = useRefComputedStyles<HTMLButtonElement>(images);

  const isMobile = width < 1024;

  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) =>
      setCurrent(Number(e.currentTarget.value)),
    []
  );

  return (
    <div className={classnames(className, `flex flex-col space-y-2 lg:space-y-4 ${images ? '' : 'animate-pulse'}`)}>
      <div className="flex relative overflow-hidden">
        <div className="w-full aspect-square bg-zinc-200 rounded-xl" />
        {images && images.map((src, index) => {
          const translate =
            (index === current && "translateX(0%)") ||
            (index < current && `translateX(-${(current - index) * 100}%)`) ||
            `translateX(${(index - current) * 100}%)`;
          return (
            <img
              key={index}
              src={src}
              alt=""
              style={{
                transform: translate,
              }}
              className={`absolute w-full transition-transform duration-300 ease-linear aspect-square rounded-xl`}
            />
          );
        })}
      </div>
      <div className={`max-lg:relative`}>
        <>
          <div className={`flex space-x-2`}>
            {(images || Array.from({ length: 3 })).map((src, index) => (
              <button
                key={index}
                value={index}
                onClick={handleSelect}
                className={`max-lg:h-1.5 max-lg:bg-zinc-300 max-lg:rounded flex-1 ${src ? '' : 'lg:bg-zinc-200 rounded-xl lg:h-36'}`}
                {...(index === 1 && {
                  ref: targetRef,
                })}
              >
                {!isMobile && src && (
                  <img
                    src={src}
                    alt=""
                    className={`aspect-square rounded-xl`}
                  />
                )}
              </button>
            ))}
          </div>
          {isMobile && <div style={{ transform: `translateX(calc(${current * 100}% + ${current} * ${targetStyles?.marginLeft})`, width: targetStyles?.width }} className={`absolute top-0 left-0 h-1.5 z-10 bg-teal rounded pointer-events-none transition-transform m-0`} />}
        </>
      </div>
    </div>
  );
};

export default ImagesPreview;
