import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 ml-2" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 ml-2" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        strong: ({ node, ...props }) => <span className="font-bold text-blue-900" {...props} />,
        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 text-blue-800" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 text-blue-800" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-1 text-blue-800" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-300 pl-4 italic my-2 text-gray-600" {...props} />,
        table: ({node, ...props}) => <div className="overflow-x-auto my-2"><table className="min-w-full divide-y divide-gray-200 border" {...props} /></div>,
        th: ({node, ...props}) => <th className="px-3 py-2 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b" {...props} />,
        td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border-b" {...props} />
      }}
      className="text-gray-800 text-sm md:text-base"
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
