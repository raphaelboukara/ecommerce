import * as React from 'react';
import MarkdownBase, { Components } from 'react-markdown';

const components: Components = {
  h3: ({ children }) => (
    <h3 className="mt-6 mb-1 scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="leading-6 mt-1 [&:not(:first-child)]:mt-6">{children}</p>
  ),
  ul: ({ children }) => <ul className="list-disc ml-4 mt-4">{children}</ul>,
  li: ({ children }) => <li className="mt-1">{children}</li>,
};

const Markdown = ({ children }: { children: string }) => (
  <MarkdownBase components={components}>{children}</MarkdownBase>
);

export { Markdown };
