import type { NextPage } from "next";

interface IProps {
    title: string;
}

const TitleFilter: NextPage<IProps> = ({ title = "" }) => {
    return <h1 className="py-4 uppercase">{title}</h1>;
};

export default TitleFilter;
