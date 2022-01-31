import * as React from "react";

import { ILogin, register as registerThunk } from '../../ducks/Users';

import Card from "../../components/Card";
import Container from "../../components/Container";
import { IState } from "../../ducks";
import RegisterForm from '../../components/RegisterForm'
import { ThunkDispatch } from "redux-thunk";
import Title from "../../components/Tittle";
import { connect } from 'react-redux';

interface IRegisterProps {
    register: (a: ILogin) => void
}

class Register extends React.Component<IRegisterProps> {

    public render(): React.ReactNode {
        const {register} = this.props
        return (
            <Container center>
                <Card>
                    <Title>Register</Title>
                    <RegisterForm onSubmit={register}/>
                </Card>
            </Container>
        );
    }
}

const mapStateToProps = (state: IState) => state;
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
    register: (payload: any) => dispatch(registerThunk(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)
