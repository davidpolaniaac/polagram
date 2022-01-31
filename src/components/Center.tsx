import * as React from "react";

const style = {
    textAlign: 'center',
    width: '100%'
} as React.CSSProperties

export default class Center extends React.Component {

    public render(): React.ReactNode {
        return (
           <div {...this.props} style={style} />
        );
    }
}
