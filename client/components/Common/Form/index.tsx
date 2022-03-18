import { NextPage } from "next";

interface IProps {
    handleOnSubmit: (event: React.SyntheticEvent) => void;
    children: React.ReactNode;
}

const Form: NextPage<IProps> = ({ children, handleOnSubmit }) => {
    return (
        <form className="w-full h-full flex justify-around flex-col items-center" onSubmit={handleOnSubmit}>
            {children}
        </form>
    );
};

export default Form;
