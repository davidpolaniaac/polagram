import * as React from "react";

import { Field, InjectedFormProps, WrappedFieldInputProps, WrappedFieldProps, reduxForm } from "redux-form";

const style = {
    img: {
        borderRadius: '100%',
        width: '100px',
        height: '100px'
    },
    file: {
        display: 'none'
    }
}

interface ProfileImgProps {
    submitProfileImg: () => void,
    profileImage: string
}

const handleChange = (submitProfileImg: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { onChange } = input;
    const { files } = e.target;
    if (files) {
        await onChange(files[0])
        submitProfileImg()
    }
}

const RenderField: React.StatelessComponent<WrappedFieldProps & ProfileImgProps> = ({ input, submitProfileImg, profileImage }) =>
    <div>
        <input onChange={handleChange(submitProfileImg, input)} style={style.file} type="file" id="profileImage" />
        <label htmlFor="profileImage">
            <img style={style.img} src={profileImage} />
        </label>
    </div>

class ProfileImg extends React.Component<InjectedFormProps<{file:File},ProfileImgProps> & ProfileImgProps> {

    public render(): React.ReactNode {

        const { handleSubmit, submitProfileImg, profileImage } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <Field 
                profileImage={profileImage} 
                name="profileImg" 
                component={RenderField} 
                submitProfileImg={submitProfileImg} 
                />
            </form>
        );
    }
}

export default reduxForm<{file:File}, ProfileImgProps>({
    form: 'profileImg'
})(ProfileImg)