import React, { useMemo, useRef, useState } from "react"
import FloatedBlock from "./FloatedBlock";
import { ELinks } from "../../constants";
import { useRefComputedStyles, useWindowDimensions } from "../../utils";

interface IGalleryProps {}

const Slides = [
  {
    id: 0,
    title: 'Добро пожаловать!',
    description: 'Привет, я Марта - хозяйка онлайн-магазина изделий из керамики ручной работы.\nЗдесь Вы точно найдете что-то по душе.',
    image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/gallery/vladimir-gladkov-d1hKXgFJUKw-unsplash%20(1).jpg?t=2024-01-23T07%3A26%3A30.917Z',
  },
  {
    id: 1,
    title: 'Ручной труд',
    description: 'Всё, что Вы увидите в магазине я сделала сама. В каждое изделие вложено много сил и любви.',
    image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/gallery/professional-artisan-job-at-the-workshop%20(1).jpg',
  },
  {
    id: 2,
    title: 'Эко материалы',
    description: 'Все изделия экологичны, я использую натуральные красители и гончарную глину.',
    image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/gallery/close-up-arrangement-of-modern-vases%20(1)%20(1).jpg',
  },
  {
    id: 3,
    title: 'Уникальность',
    description: 'Все идеи для воплощения я беру из головы, поэтому каждое блюдце особенное.',
    image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/gallery/arrangement-with-clay-pots%20(1)%20(1).jpg',
  },
];

const Gallery: React.FC<IGalleryProps> = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { targetRef, targetStyles } = useRefComputedStyles<HTMLButtonElement>(Slides);

  const selectSlide = (e: React.MouseEvent<HTMLButtonElement>) => setCurrentSlide(Number(e.currentTarget.value));

  const { description, image, title } = Slides[currentSlide];

  return (
    <div className={`flex flex-col relative h-[calc(100vh-6rem)] lg:h-auto`}>
      <div className={`max-lg:basis-3/5 max-lg:shrink-0 flex flex-col`}>
        <img className={`w-full grow aspect-video object-cover rounded-2xl lg:rounded`} src={image} alt="background" />
        <div className={`relative mt-3 lg:mt-1`}>
          <div className={`flex space-x-2 lg:space-x-4`}>
            {Slides.map(({ id }, index) => (
              <button
                key={id}
                value={index}
                onClick={selectSlide}
                className={`flex-1 h-1.5 lg:h-2 rounded bg-zinc-300`}
                {...(index === 1 && {
                  ref: targetRef,
                })}
              />
            ))}
          </div>
          <div style={{ transform: `translateX(calc(${currentSlide * 100}% + ${currentSlide} * ${targetStyles?.marginLeft})`, width: targetStyles?.width }} className={`absolute top-0 left-0 h-1.5 lg:h-2 z-10 bg-teal rounded pointer-events-none transition-transform m-0`} />
        </div>
      </div>
      <FloatedBlock
        className="max-lg:grow lg:absolute lg:w-6/12 lg:-translate-y-1/2 lg:top-1/2 lg:right-8"
        title={title}
        description={description}
        button="Перейти в каталог"
        link={ELinks.CATALOG}
      />
    </div>
  )
}

export default Gallery;