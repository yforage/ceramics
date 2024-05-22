import React from "react"

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => (
  <main className={`relative font-lato text-gray min-h-screen grid grid-rows-[min-content_1fr_min-content]`}>
    {children}
  </main>
)

export default Layout;