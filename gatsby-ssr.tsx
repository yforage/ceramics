import { GatsbySSR } from "gatsby";
import * as React from "react";

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="preload"
      href="/fonts/virilica.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="virilicaFont"
    />,
    <link
      rel="preload"
      href="/fonts/Lato-Regular.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="latoFont"
    />,
  ])
}