import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarkdownViewerProps {
    content: string;
    title: string;
    backLink?: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, title, backLink = '/' }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    to={backLink}
                    className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Portfolio
                </Link>

                <article className="glass-card p-6 sm:p-12">
                    <div className="prose prose-slate dark:prose-invert md:prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-teal-600 dark:prose-a:text-teal-400 hover:prose-a:text-teal-700 dark:hover:prose-a:text-teal-300 prose-img:rounded-xl">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default MarkdownViewer;
