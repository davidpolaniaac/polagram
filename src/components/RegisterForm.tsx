import * as React from "react";

import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import Button from "./Button";
import Center from "./Center";
import Input from "./Input";
import { Link } from "react-router-dom";

class RegisterForm extends React.Component<InjectedFormProps> {
    public render(): React.ReactNode {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Field placeholder="Email" label="email" name="email" type="email" component={Input}/>
                <Field placeholder="Password" label="password" name="password" type="password" component={Input}/>
                <Button block>register</Button>
                <Center>
                    <Link to="/">login</Link>
                </Center>
            </form>
        );
    }
}

export default reduxForm<any, any>({
    form: 'register'
})(RegisterForm);
