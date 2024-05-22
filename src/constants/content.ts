import { ITextBlockProps } from "../components/shared/TextBlock";
import { ERichTextBlocks } from "../customTypes/richText";

export const AboutBlockContent: ITextBlockProps = {
  title: 'О нас',
  text: {
    type: ERichTextBlocks.ROOT,
    children: [
      {
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Привет, меня зовут Мария и это мой магазин керамики. Я уже 8 лет занимаюсь гончарным ремеслом, лепкой и созданием дизайна для Блюдца.',
      },
      { 
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Здесь вы найдете вазу для цветов, кружку в подарок, тарелку под печеньки и многое другое.'
      },
      {
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Спасибо за Ваш интерес к моему творчеству! Для меня большое удовольствие вносить уют и красоту в дома и сердца людей.'
      },
      {
        type: ERichTextBlocks.SPACE,
        children: '',
      },
      {
        type: ERichTextBlocks.SPACE,
        children: '',
      },
      {
        type: ERichTextBlocks.UL_LIST,
        children: [
          {
            type: ERichTextBlocks.LIST_ITEM,
            children: 'Все изделия уникальны, потому что они сделаны вручную.'
          },
          {
            type: ERichTextBlocks.LIST_ITEM,
            children: 'Все изделия экологичны, я использую натуральные красители и гончарную глину.'
          },
          {
            type: ERichTextBlocks.LIST_ITEM,
            children: 'Все изделия можно мыть в посудомоечной машине и нагревать в микроволновке.'
          }
        ]
      }
    ]
  },
  imagePosition: 'left',
  subtitle: '«Блюдце в пастель» — это уютный онлайн-магазин керамики ручной работы.\nОн о проявлении нежности, любви к природе и своим покупателям.',
  image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/about/woman-craftmaster-at-a-pottery-shop_1303-23733.jpg',
}

export const DeliveryBlockContent: ITextBlockProps = {
  title: 'Доставка',
  text: {
    type: ERichTextBlocks.ROOT,
    children: [
      {
        type: ERichTextBlocks.UL_LIST,
        children: [
          {
            type: ERichTextBlocks.LIST_ITEM,
            children: 'Почтой России (от 300 ₽)',
          },
          {
            type: ERichTextBlocks.LIST_ITEM,
            children: 'Курьескими службами (СДЕК от 300₽)',
          },
        ]
      },
      {
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Международная доставка осуществляется Почтой России или EMS и рассчитывается индивидуально.',
      },
      {
        type: ERichTextBlocks.SPACE,
        children: '',
      },
      {
        type: ERichTextBlocks.SPACE,
        children: '',
      },
      {
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Для оформления заказа добавьте товары в корзину и заполните форму.',
      },
      
      {
        type: ERichTextBlocks.PARAGRAPH,
        children: 'Если возникнут вопросы, Вы всегда можете написать мне на почту и я с радостью отвечу.',
      },
    ]
  },
  imagePosition: 'right',
  subtitle: 'Доставка по всему миру любым удобным для Вас способом.',
  image: 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/delivery/small-business-owner-packing-product-parcel-boxes-delivery%20(1).jpg',
  isSquare: true,
}
