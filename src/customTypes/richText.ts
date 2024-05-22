export interface IRichTextBlock {
  type: ERichTextBlocks;
  children: string | IRichTextBlock[];
}

export enum ERichTextBlocks {
  PARAGRAPH = 'p',
  UL_LIST = 'ul',
  LIST_ITEM = 'li',
  ROOT = 'div',
  SPACE = 'space',
}
