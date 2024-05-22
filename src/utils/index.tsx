import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ERichTextBlocks, IRichTextBlock } from "../customTypes/richText";
import { navigate } from "gatsby";
import { setQueryParams } from "react-use-query-param-string";
import { ELinks } from "../constants";

type RenderNode = Record<ERichTextBlocks, (el: React.ReactNode) => React.ReactNode>;

const defaultRenderNode: RenderNode = {
  [ERichTextBlocks.ROOT]: (children) => <>{children}</>,
  [ERichTextBlocks.PARAGRAPH]: (children) => <p>{children}</p>,
  [ERichTextBlocks.UL_LIST]: (children) => <ul>{children}</ul>,
  [ERichTextBlocks.LIST_ITEM]: (children) => <li>{children}</li>,
  [ERichTextBlocks.SPACE]: () => <br />,
}

export const handleRichText = ({ type, children }: IRichTextBlock, renderNode: Partial<RenderNode>): React.ReactNode => {
  const mergedRenderNode = {
    ...defaultRenderNode,
    ...renderNode
  }

  if (typeof children === 'string') {
    return mergedRenderNode[type](children);
  }
  return mergedRenderNode[type](children.map((el) => handleRichText(el, mergedRenderNode)));
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        e.stopPropagation();
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });
};

export function useRefComputedStyles<T extends HTMLElement>(content: unknown) {
  const targetRef = useRef<T>(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!content) return;
    setIsRendered(true);
  }, [content])

  const targetStyles = useMemo(() => targetRef.current && isRendered && content ? getComputedStyle(targetRef.current) : null, [content, isRendered]);

  return { targetRef, targetStyles };
}

export const useButtonQueryNavigation = (activePage?: ELinks) => {
  const handleNavigation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (activePage !== ELinks.HOME) {
      navigate(`/?block=${e.currentTarget.value}`);
      return;
    }
  
    setQueryParams({ block: e.currentTarget.value })
  }, [activePage])

  return handleNavigation;
};