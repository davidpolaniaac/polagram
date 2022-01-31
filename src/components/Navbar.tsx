import * as React from "react";

import { faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";

const style = {
    link: {
        color: '#555',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    navbar: {
        borderBottom: 'solid 1px #aaa',
        padding: '10px 15px'
    },
} 

export default class Navbar extends React.Component {

    public render(): React.ReactNode {


        return (
           <div style={style.navbar as React.CSSProperties}>
               <Link style={style.link as React.CSSProperties} to="/app/newsfeed"><FontAwesomeIcon icon={faNewspaper} />  Polagram</Link>
                <div style={{
                    float: 'right'
                }}>
                    <Link style={style.link as React.CSSProperties} to="/app/profile"><FontAwesomeIcon icon={faUser} />  Profile</Link>
                </div>
           </div>
        );
    }
}
