import * as React from "react";

import Footer from "./Footer";

const style = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '10px 15px',
    marginBottom: '10px',
} as React.CSSProperties

interface IPostProps {
    image: string,
    like: () => void,
    share: () => void
}
export default class Post extends React.Component<IPostProps>{

    public render(): React.ReactNode {

        const { image, like, share } = this.props;

        return (
            <div style={style}>
                <img style={{
                    width: '400px'
                }} src={image}></img>
               <Footer like={like} share={share}/>
            </div>
        );
    }
}
