import * as React from "react";

const style = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px 15px',
    borderRadius: '4px',
    width: 'calc(100% - 30px)',
    marginBottom: '10px'
}

const spanStyle = {
    fontSize: '10px',
    color: '#777',
    textTransform: 'uppercase',
    fontWeight: 900
} as React.CSSProperties

interface IInputProps {
    placeholder?: string,
    label: string
    input: any
}

export default class Input extends React.Component<IInputProps> {
  
    public render() {
        const { label } = this.props;
        return (
            <div>
                <span style={spanStyle}>{label}</span>
                <input {...this.props.input} style={style} />
            </div>
        );
    }
}
