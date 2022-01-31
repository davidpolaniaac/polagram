import * as React from "react";

import { ILogin, login as loginThunk } from '../../ducks/Users';

import Card from "../../components/Card";
import Container from "../../components/Container";
import { IState } from "../../ducks";
import LoginForm from "../../components/LoginFom"
import { ThunkDispatch } from "redux-thunk";
import Title from "../../components/Tittle";
import { connect } from 'react-redux';

interface ILoginProps {
    login: (a: ILogin) => void
}
class Login extends React.Component<ILoginProps> {
    public render(): React.ReactNode {
        const { login } = this.props;
        return (
            <Container center>
                <Card>
                    <Title>Login</Title>
                    <LoginForm onSubmit={login}/>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    login: (payload: any) => dispatch(loginThunk(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
