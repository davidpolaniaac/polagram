import * as React from "react";

const style = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px 15px',
} as React.CSSProperties

export default class Card extends React.Component {

    public render(): React.ReactNode {

        const { children } = this.props;

        return (
           <div style={style}>
               {children}
           </div>
        );
    }
}
