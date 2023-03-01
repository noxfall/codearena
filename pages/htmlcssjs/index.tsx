import { useState, useCallback, useEffect } from 'react';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';

const HtmlCssJs: React.FC = () => {
    const [html, setHtml] = useState('');
    const [doc, setDoc] = useState<string>('<h1>Hello, world!</h1>');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDoc(`
                <html>
                    <body>${html}</body>
                </html>
            `);
        }, 250);
        return () => clearTimeout(timeout)
    }, [html]);

    return (
        <main>
            <Editor onChange={setHtml} initialDoc={doc} />
            <Preview doc={doc} />
        </main>
    );
};

export default HtmlCssJs;