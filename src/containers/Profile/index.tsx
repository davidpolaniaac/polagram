import * as React from "react";
import * as postsDuck from '../../ducks/Posts';
import * as usersDuck from '../../ducks/Users';

import Button from "../../components/Button";
import Card from "../../components/Card";
import { IState } from "../../ducks";
import ProfileImg from "../../components/ProfileImg";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { chunk } from 'lodash';
import { connect } from "react-redux";
import service from '../../services';
import { submit } from "redux-form";

const { auth } = service;

const style = {
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
        marginBottom: '10px'
    },
    container: {
        padding: '15px'
    },
    img: {
        width: '100px'
    }
}

interface IProfileProps {
    fetchPosts: () => void,
    handleProfileImageSubmit: (a: { file: File}) => void
    fetched: boolean,
    loading: boolean,
    data: postsDuck.IPost[][],
    submitProfileImg: () => void,
    profileImage: string
}

class Profile extends React.Component<IProfileProps> {

    constructor(props: IProfileProps) {
        super(props);
        const { fetchPosts, fetched } = props;
        if (fetched) {
            return;
        }
        fetchPosts();
    }

    public render(): React.ReactNode {
        const { data , submitProfileImg, handleProfileImageSubmit, profileImage} = this.props;
        return (
            <div style={style.container as React.CSSProperties}>
                <div style={style.row as React.CSSProperties}>
                    <ProfileImg 
                    onSubmit={handleProfileImageSubmit} 
                    submitProfileImg={submitProfileImg}
                    profileImage={profileImage}
                    />
                    <Button>Post</Button>

                </div>
                {
                    data.map((x, i) =>
                        <div key={i} style={style.row as React.CSSProperties}>
                            {
                                x.map(y =>
                                    <Card key={y.imageURL} >
                                        <img style={style.img} src={y.imageURL} />
                                    </Card>
                                )
                            }
                        </div>

                    )
                }
            </div>

        );
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { data, fetched, fetching } } = state
    const { Users: { profileImage: tempPI } } = state
    const loading = fetching || !fetched
    const profileImage = tempPI || "https://placekitten.com/100/100"
    const filtered = Object.keys(data).reduce((acc: any, el) => {
        if (data[el].userId !== (auth.currentUser && auth.currentUser?.uid)) {
            return acc;
        }
        return acc.concat(data[el])
    }, [] as postsDuck.IPost[])
    return {
        data: chunk(filtered, 3) as postsDuck.IPost[][],
        fetching,
        loading,
        profileImage
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => 
    bindActionCreators(
        {
            ...postsDuck, 
            ...usersDuck,
            submitProfileImg: () => submit('profileImg')
        }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

