interface Props {
    doc: string
}

const Preview: React.FC<Props> = (props) => {
    return <iframe srcDoc={props.doc} sandbox="allow-scripts" width="100%" height="100%" frameBorder="0" />
};

export default Preview;