import { useEffect, useState, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentOnInput } from '@codemirror/language';

interface Props {
    onChange?: (state: EditorState) => void
    lang: any
}

const useCodemirror = <T extends Element>(props: Props): [React.MutableRefObject<T | null>, EditorView?] => {
    const refContainer = useRef<T>(null);
    const [editorView, setEditorView] = useState<EditorView>();
    const { onChange, lang } = props;

    useEffect(() => {
        if (!refContainer.current) return;

        const startState = EditorState.create({
            extensions: [
                keymap.of(defaultKeymap),
                basicSetup,
                EditorState.tabSize.of(4),
                indentOnInput(),
                oneDark,
                props.lang,
                EditorView.lineWrapping,
                EditorView.updateListener.of(update => {
                    if (update.changes) {
                        onChange && onChange(update.state)
                    }
                }),
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