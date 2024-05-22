import React, { useCallback, useContext, useState } from "react"
import { Link } from "gatsby"
import { ShoppingBagIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ELinks } from "../../../constants";
import Content from "../Content";
import CartModal from "../../cart/CartModal";
import { useButtonQueryNavigation, useWindowDimensions } from "../../../utils";
import SocialLinks from "../../shared/SocialLinks";
import CatalogLinks from "./CatalogLinks";
import { useQuery } from "@tanstack/react-query";
import { fetchCartContent, fetchCategoriesLinks } from "../../../api/requests";
import { SessionContext } from "../../../context/SessionContext";

const DRAWER_IMAGE = 'https://gzecusjtpqjdzxbhubby.supabase.co/storage/v1/object/public/images/header/view-ceramic-pottery-items%20(1)%20(1).jpg';

interface IHeaderProps {
  activePage?: ELinks;
}

const Header: React.FC<IHeaderProps> = ({ activePage }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const loggedUser = useContext(SessionContext);

  const cartQuery = useQuery({
    queryKey: ['cart', loggedUser?.id],
    queryFn: ({ queryKey }) => fetchCartContent(queryKey[1]),
    enabled: !!loggedUser,
  })

  const { data } = useQuery({
    queryKey: ['catalogLinks'],
    queryFn: fetchCategoriesLinks,
    enabled: isMobile,
  })

  const handleNavigation = useButtonQueryNavigation(activePage);

  const toggleDrawerOpen = useCallback(() => setIsDrawerOpen((prev) => !prev), []);
  const toggleCartOpen = useCallback(() => setIsCartOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const handleNavigationFromDrawer = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    toggleDrawerOpen();
    handleNavigation(e);
  }, [handleNavigation, toggleDrawerOpen])

  return (
    <header className={`sticky top-0 h-20 z-30 bg-white border-y-2 border-teal`}>
      <Content className={`relative h-full flex items-center justify-between lg:justify-center lg:space-x-16`}>
        {isMobile && (
          <button onClick={toggleDrawerOpen} className={`w-5`}>
            {isDrawerOpen && <XMarkIcon />}
            {!isDrawerOpen && <Bars3Icon />}
          </button>
        )}
        {!isMobile && (
          <>
            <Link
              to={ELinks.CATALOG}
              className={`${activePage === ELinks.CATALOG ? 'text-green' : ''}`}
            >
              Каталог
            </Link>
            <button
              onClick={handleNavigation}
              value={ELinks.ABOUT}
              className={`${activePage === ELinks.ABOUT ? 'text-green' : ''}`}
            >
              О нас
            </button>
          </>
        )}

        <Link
          to={ELinks.HOME}
          className={`font-virilica font-bold text-pink text-2xl text-center`}
        >
          Блюдце<br/>в пастель
        </Link>
        {!isMobile && (
          <button
            onClick={handleNavigation}
            value={ELinks.DELIVERY}
            className={`${activePage === ELinks.DELIVERY ? 'text-green' : ''}`}
          >
            Доставка
          </button>
        )}
        <button className={`relative`} onClick={toggleCartOpen}>
          <ShoppingBagIcon className={`w-5`} />
          {cartQuery.data && cartQuery.data.length > 0 && <div className={`absolute bottom-0 right-0 rounded-full bg-teal w-2 h-2 animate-single-ping`} />}
        </button>
        {isCartOpen && <CartModal onClose={closeCart} isLoading={cartQuery.isPending} content={cartQuery.data} />}
      </Content>
      {isMobile && isDrawerOpen && (
        <Content className={`absolute top-full w-full min-h-[calc(100vh-5rem)] bg-white border-t-2 border-teal flex flex-col py-8 space-y-8`}>
          <p className={`font-virilica text-3xl`}>Меню</p>
          <div className={`flex grow`}>
            <div className={`flex flex-1 flex-col text-xl space-y-6 items-start`}>
              <CatalogLinks categories={data?.categories} />
              <button
                onClick={handleNavigationFromDrawer}
                value={ELinks.ABOUT}
                className={`${activePage === ELinks.ABOUT ? 'text-green' : ''}`}
              >
                О нас
              </button>
              <button
                onClick={handleNavigationFromDrawer}
                value={ELinks.DELIVERY}
                className={`${activePage === ELinks.DELIVERY ? 'text-green' : ''}`}
              >
                Доставка
              </button>
            </div>
            <div className={`flex-1`}>
              <img className={`rounded-xl h-[90%] cover object-cover`} src={DRAWER_IMAGE} alt="pottery" />
            </div>
          </div>
          <SocialLinks />
          <p>
            Если возникнут вопросы, Вы всегда можете написать мне на почту<br /><u>template@email.com</u> и я с радостью отвечу.
          </p>
        </Content>
      )}
    </header>
  )
}

export default Header;
