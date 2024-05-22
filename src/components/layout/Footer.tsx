import React from "react";
import { Link } from "gatsby";
import { ELinks } from "../../constants";
import { ScrollUpButton } from "../shared/ScrollUpButton";
import Content from "./Content";
import SocialLinks from "../shared/SocialLinks";
import { useButtonQueryNavigation } from "../../utils";

interface IFooterProps {
  activePage?: ELinks;
}

const Footer: React.FC<IFooterProps> = ({ activePage }) => {
  const handleNavigation = useButtonQueryNavigation(activePage);

  return (
    <footer className={`bg-beige`}>
      <Content className={`py-8 flex flex-col items-center justify-between lg:flex-row max-lg:space-y-4`}>
        <div className={`flex flex-col items-center flex-1 lg:order-2 space-y-2 `}>
          <div className={`space-x-6`}>
            <Link to={ELinks.CATALOG}>Каталог</Link>
            <button
              value={ELinks.ABOUT}
              onClick={handleNavigation}
            >
              О нас
            </button>
            <button
              value={ELinks.DELIVERY}
              onClick={handleNavigation}
            >
              Доставка
            </button>
          </div>
          <Link to={ELinks.POLICY}>Политика конфиденциальности</Link>
          <Link to={ELinks.OFERTA}>Публичная оферта</Link>
        </div>
        <div className={`flex flex-col items-center flex-1 space-y-2 max-lg:w-full lg:px-2.5 lg:py-10 lg:order-3 lg:items-end`}>
          <SocialLinks />
          <ScrollUpButton />
        </div>
        <div className={`flex-1 lwhitespace-pre-wrap flex flex-col max-lg:text-center lg:order-1`}>
          <p className={`lg:order-2`}>
            Буду рада сотрудничеству, просто напишите мне:{' '}
            <br className={`hidden lg:block`} />
            <span>template@email.com</span>
          </p>
          <p className={`max-lg:mt-4 lg:mb-4 lg:order-1`}>© 2015-2023. «Блюдце в пастель»</p>
        </div>
      </Content>
    </footer>
  )
}

export default Footer;
