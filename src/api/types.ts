interface IDataApi {
  slides: React.ComponentProps<typeof Gallery>['slides'];
  quote: React.ComponentProps<typeof Quote>;
  popularItems: React.ComponentProps<any>['items'];
  mainPageItem: IProductApi[];
  aboutBlock: ITextBlockData;
  deliveryBlock: ITextBlockData;
  cart: ICartApi;
}