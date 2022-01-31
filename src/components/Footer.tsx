import * as React from "react";

import { faRetweet, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const style = {
    button: {
        flex: 1,
        textAlign: 'center',
        padding: '10px 15px',
        cursor: 'pointer'
    },
    footer: {
        display: 'flex',
        backgroundColor: '#eee',
        marginLeft: '-15px',
        marginBottom: '-10px',
        width: 'calc(100% + 30px)'
    },
}
interface IFooter {
    like: () => void
    share: () => void
}
export default class Footer extends React.Component<IFooter> {

    public render(): React.ReactNode {

        const { like, share } = this.props;

        return (
            <div style={style.footer}>
                <div onClick={like} style={style.button as React.CSSProperties}>
                    <FontAwesomeIcon icon={faThumbsUp} /> Like</div>
                <div onClick={share} style={style.button as React.CSSProperties}>
                    <FontAwesomeIcon icon={faRetweet} /> Share</div>
            </div>
        );
    }
}
