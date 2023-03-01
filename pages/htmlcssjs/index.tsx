import { useState, useEffect } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';

const HtmlCssJs: React.FC = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [doc, setDoc] = useState<string>('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
        }, 250);
        return () => clearTimeout(timeout)
    }, [html, css, js]);

    return (
        <main>
            <Editor onChange={setHtml} initialDoc={doc} />
            <Editor onChange={setCss} initialDoc={doc} />
            <Editor onChange={setJs} initialDoc={doc} />
            <Preview doc={doc} />
        </main>
    );
};

export default HtmlCssJs;