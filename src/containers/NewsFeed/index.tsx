import * as React from "react";
import * as postsDuck from '../../ducks/Posts';

import Container from "../../components/Container";
import { IState } from "../../ducks";
import Post from "../../components/Post";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

interface INewFeedProps {
    fetchPosts: () => void,
    like: (a: string) => void,
    share: (a: string) => void,
    fetched: boolean,
    loading: boolean,
    data: postsDuck.IDataPost
}

class NewsFeed extends React.Component<INewFeedProps> {

    constructor(props: INewFeedProps) {
        super(props);
        const { fetchPosts, fetched } = props;
        if (fetched) {
            return;
        }
        fetchPosts();
    }

    public render(): React.ReactNode {
        const { data } = this.props;
        return (
            <Container>

                {Object.keys(data).map(x => {
                    const post = data[x];
                    return (
                        <div key={x} style={{
                            margin: '0 auto'
                        }}>
                            <Post
                                like={this.handleLike(x)}
                                share={this.handleShare(x)}
                                image={post.imageURL}
                            />
                        </div>
                    )
                })}

            </Container>
        );
    }

    private handleLike = (id: string) => () => {
        const { like } = this.props;
        like(id);
    }

    private handleShare = (id: string) => () => {
        const { share } = this.props;
        share(id);
    }
}

const mapStateToProps = (state: IState) => {
    const { Posts: { data, fetched, fetching } } = state
    const loading = fetching || !fetched
    return {
        data,
        fetching,
        loading
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => bindActionCreators(postsDuck, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed)
