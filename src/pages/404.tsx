import React from "react"
import { Link, HeadFC } from "gatsby"
import Content from "../components/layout/Content";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Button from "../components/shared/Button";
import { ELinks } from "../constants";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <Content>
        <div className={`flex items-center justify-center h-full relative max-lg:min-h-[80vh]`}>
          <div className={`absolute z-20 flex flex-col items-center bg-beige w-full py-4 translate-y-[80%] max-lg:px-2 max-lg:text-center`}>
            <h1 className={`font-virilica text-3xl lg:text-4xl mb-6`}>Упс...такой страницы нет</h1>
            <Link to={ELinks.HOME}>
              <Button size="large">
                Главная страница
              </Button>
            </Link>
          </div>
          <img className="w-full h-full object-cover" alt="not found" src="https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/not-found/ceramic-pottery-tools-still-life__2_%20(1).jpg" />
        </div>
      </Content>
      <Footer />
    </>
  )
}

export default NotFoundPage;

export const Head: HeadFC = () => <title>Страница не найдена</title>
