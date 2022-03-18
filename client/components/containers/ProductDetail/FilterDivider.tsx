import type { NextPage } from "next";

interface IProps {}

const FilterDivider: NextPage<IProps> = () => {
    return <hr className="w-10/12 m-auto" />;
};

export default FilterDivider;
