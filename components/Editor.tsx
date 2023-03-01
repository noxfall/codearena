import { useCallback, useEffect } from 'react';
import useCodemirror from '@/hooks/CodemirrorHook';

interface Props {
    initialDoc: string,
    onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
    const { onChange, initialDoc } = props;
    const handleChange = useCallback(
        state => onChange(state.doc.toString()),
        [onChange]
    );
    const [refContainer, editorView] = useCodemirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: handleChange
    });
    useEffect(() => {
        if (editorView) {
            // ?
        }
    }, [editorView]);

    return <div ref={refContainer}></div>
};

export default Editor;