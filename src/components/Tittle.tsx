import * as React from "react";

const style = {
    color: '#555'
} as React.CSSProperties

export default class Title extends React.Component {

    public render(): React.ReactNode {

        return (
           <h2 {...this.props} style={style}/>
        );
    }
}
