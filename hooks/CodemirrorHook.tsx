import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';

interface Props {
    initialDoc: string,
    onChange?: (state: EditorState) => void
}

const useCodemirror = <T extends Element>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
    const refContainer = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const { onChange } = props;

    useEffect(() => {
        if (!refContainer.current) return;

        const startState = EditorState.create({
            doc: props.initialDoc,
            extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                oneDark,
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    if (update.changes) {
                        onChange && onChange(update.state)
                    }
                })
            ]
        });
        const view = new EditorView({
            state: startState,
            parent: refContainer.current
        });
        setEditorView(view);
        return () => view.destroy();
    }, [refContainer]);

    return [refContainer, editorView]
};

export default useCodemirror;