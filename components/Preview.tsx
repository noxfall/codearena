interface Props {
    doc: string
}

const Preview: React.FC<Props> = (props) => {
    return <iframe srcDoc={props.doc} frameBorder="0" />
};

export default Preview;