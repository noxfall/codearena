import { useState, useEffect } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import Head from 'next/head';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

const HtmlCssJs: React.FC = () => {
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [js, setJs] = useState('');
    const [doc, setDoc] = useState<string>('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDoc(`
                <html>
                    <body>${htmlCode}</body>
                    <style>${cssCode}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);
        return () => clearTimeout(timeout)
    }, [html, css, js]);

    return (
        <>
            <Head>
                <link rel="icon" href="/logo.svg" />
                <title>HTML|CSS|JS Arena</title>
            </Head>
            <main className="flex flex-col">
                <div className="w-full flex flex-row justify-stretch bg-[#282c34]">
                    <Editor lang={html()} title="HTML" onChange={setHtmlCode} />
                    <Editor lang={css()} title="CSS" onChange={setCssCode} />
                    <Editor lang={javascript()} title="JS" onChange={setJs} />
                </div>
                <Preview doc={doc} />
            </main>
        </>
    );
};

export default HtmlCssJs;