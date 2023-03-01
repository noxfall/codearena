import { useCallback, useEffect } from 'react';
import useCodemirror from '@/hooks/CodemirrorHook';

interface Props {
    onChange: (doc: string) => void
    title: string
    lang: any
}

const Editor: React.FC<Props> = (props) => {
    const { onChange, lang } = props;
    const handleChange = useCallback(
        state => onChange(state.doc.toString()),
        [onChange]
    );
    const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
        onChange: handleChange,
        lang: props.lang
    });
    useEffect(() => {
        if (editorView) {
            // ?
        }
    }, [editorView]);

    return (
        <div className="w-full border-b border-b-slate-500 border-x border-x-slate-500 h-[30vh]">
            <h4 className="editor-title p-[.4rem]">{props.title}</h4>
            <div className="w-full" ref={refContainer}></div>
        </div>
    );
};

export default Editor;