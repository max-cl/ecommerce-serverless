import type { NextPage } from "next";

const Spinner: NextPage = () => {
    return (
        <div
            className="w-16 h-16 rounded-full animate-spin
    border-4 border-solid border-sky-400 border-t-transparent shadow-md"
        ></div>
    );
};

export default Spinner;
