import React, { useContext, useMemo } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import CartItem from "../components/cart/CartItem";
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/shared/Button";
import RadioInput from "../components/shared/RadioInput";
import { ELinks } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { fetchCartContent } from "../api/requests";
import CartItemSkeleton from "../components/cart/CartItemSkeleton";
import { CartContext } from "../context/CartContext";
import { useWindowDimensions } from "../utils";

const CheckoutSchema = Yup.object().shape({
  address: Yup.string().required('Адрес не введен'),
  delivery: Yup.string().required('Способ доставки не выбран'),
  payment: Yup.string().required('Способ оплаты не выбран'),
  name: Yup.string().min(2, 'Слишком короткое').max(50, 'Слишком длинное').required('Требуется ваше ФИО'),
  email: Yup.string().email('Некорректный email').required('Email не введен'),
  post: Yup.number().required('Почтовый индекс не введен').min(1),
  personal_data_agreement: Yup.boolean().required('Соглашение не принято').isTrue('Соглашение не принято'),
})

const CheckoutPage: React.FC = () => {
  const { cartContent, isLoading } = useContext(CartContext);

  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const sum = useMemo(() => cartContent.reduce((acc, { product, count }) => acc += Number(product.price) * count, 0), [cartContent]);

  const handleSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <>
      <Header activePage={ELinks.CHECKOUT} />
      <Content className={`py-8 lg:py-10`}>
        <div className={`flex flex-col items-center text-center`}>
          <h1 className={`font-virilica text-3xl lg:text-4xl mb-10`}>Корзина</h1>
          <div className={`space-y-4 w-full ${cartContent ? '' : 'animate-pulse'}`}>
            {cartContent.map(({ product, count }) => (
              <CartItem {...product} count={count} key={product.id} type="default" />
            ))}
            {isLoading && Array.from({ length: 2 }).map(() => <CartItemSkeleton />)}
          </div>
          <div className={`relative flex justify-between w-full lg:w-3/5 px-6 mt-6 max-lg:pb-4`}>
            <span>Общая стоимость заказа</span>
            {isLoading && <div className={`w-12 h-6 mb-1 bg-zinc-200 animate-pulse rounded-md`} />}
            {cartContent && <span>{sum} $</span>}
            <div className={`h-0.5 bg-pink absolute bottom-0 w-[calc(100%+4rem)] lg:w-full max-lg:-translate-x-8 left-0`} />
          </div>
          <div className={`w-full flex mt-10 lg:mt-14 lg:space-x-14`}>
            <div className={`flex-1`}>
              <Formik
                initialValues={{
                  address: '',
                  delivery: '',
                  payment: '',
                  name: '',
                  email: '',
                  post: '',
                  personal_data_agreement: false,
                }}
                onSubmit={handleSubmit}
                validationSchema={CheckoutSchema}
              >
                {({ errors, touched }) => (
                  <Form className={`flex flex-col space-y-4 text-sm text-start`} id="checkout">
                    <div className={`flex flex-col items-start space-y-2`}>
                      <p className={`text-lg lg:text-base`}>
                        Введите адрес доставки:
                      </p>
                      <ErrorMessage name="address" component="p" className="text-xs text-red-500" />
                      <Field type="text" name="address" className={`w-full bg-beige rounded-md px-3.5 py-3 lg:py-2 ${errors.address && touched.address ? 'border border-red-500' : ''}`} />
                    </div>
                    <p>По вашему адресу доступны следующие варианты доставки:</p>
                    <ErrorMessage name="delivery" component="p" className="text-xs text-red-500" />
                    <div className={`flex justify-between`}>
                      <label className={`flex items-center`}>
                        <Field type="radio" name="delivery" value="cdek" component={RadioInput} />
                        <span className={`ml-2`}>Курьерская служба СДЭК</span>
                      </label>
                      <span>5 $</span>
                    </div>
                    <div className={`flex justify-between`}>
                      <label className={`flex items-center`}>
                        <Field type="radio" name="delivery" value="pochta" component={RadioInput} />
                        <span className={`ml-2`}>Почта России</span>
                      </label>
                      <span>3.5 $</span>
                    </div>
                    <p className={`text-lg lg:text-base`}>
                      Выберите способ оплаты:
                    </p>
                    <ErrorMessage name="payment" component="p" className="text-xs text-red-500" />
                    <div role="group" className={`flex flex-col space-y-4 lg:space-y-2`}>
                      <label className={`flex items-center`}>
                        <Field type="radio" name="payment" value="card" component={RadioInput} />
                        <span className={`ml-2`}>Банковская карта</span>
                      </label>
                      <label className={`flex items-center`}>
                        <Field type="radio" name="payment" value="spb" component={RadioInput} />
                        <span className={`ml-2`}>Система быстрых платежей</span>
                      </label>
                      <label className={`flex items-center`}>
                        <Field type="radio" name="payment" value="emoney" component={RadioInput} />
                        <span className={`ml-2`}>Электронные деньги</span>
                      </label>
                    </div>
                    <p className={`text-lg lg:text-base`}>
                      Заполните ваши данные:
                    </p>
                    <div>
                      <ErrorMessage name="name" component="p" className="text-xs text-red-500 mb-2" />
                      <Field type="text" name="name" className={`w-full bg-beige rounded-md px-3.5 py-3 lg:py-2 ${errors.name && touched.name ? 'border border-red-500' : ''}`} placeholder="ФИО" />
                    </div>
                    <div>
                      <ErrorMessage name="email" component="p" className="text-xs text-red-500 mb-2" />
                      <Field type="text" name="email" className={`w-full bg-beige rounded-md px-3.5 py-3 lg:py-2 ${errors.email && touched.email ? 'border border-red-500' : ''}`} placeholder="Телефон/Email" />
                    </div>
                    <div>
                      <ErrorMessage name="post" component="p" className="text-xs text-red-500 mb-2" />
                      <Field type="number" name="post" className={`w-full bg-beige rounded-md px-3.5 py-3 lg:py-2 ${errors.post && touched.post ? 'border border-red-500' : ''}`} placeholder="Почтовый индекс" />
                    </div>
                    <label>
                      <ErrorMessage name="personal_data_agreement" component="p" className="text-xs text-red-500 mb-2" />
                      <Field type="checkbox" name="personal_data_agreement" />
                      <span className={`ml-2`}>Я даю разрешение на обработку моих персональных данных</span>
                    </label>
                  </Form>
                )}
              </Formik>
            </div>
            {!isMobile && (
              <div className={`flex-1 flex items-center justify-center`}>
                <div className={`w-4/6 rounded-2xl overflow-hidden	`}>
                  {/* <img src={data.img} /> */}
                </div>
              </div>
            )}
          </div>
          <Button size="large" form="checkout" type="submit" className={`w-full max-lg:h-16 lg:self-start mt-4 lg:w-[calc(50%-1.75rem)]`}>
            Оформить покупку
          </Button>
        </div>
      </Content>
      <Footer activePage={ELinks.CHECKOUT} />
    </>
  )
}

export default CheckoutPage;
