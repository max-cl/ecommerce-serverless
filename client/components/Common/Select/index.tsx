import { NextPage } from "next";

interface IProps {
    data: { _id: number; title: string; selected: boolean }[];
    handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    valueSelected: number;
    fullWidth?: boolean;
}

const Select: NextPage<IProps> = ({ data, handleOnChange, valueSelected, fullWidth = false }) => {
    return (
        <select
            className={`w-56 appearance-none block px-8 py-4 text-base font-normal text-gray-700
                        bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${
                            fullWidth ? "!w-full" : ""
                        }`}
            onChange={handleOnChange}
            value={valueSelected}
        >
            {data.map((d) => (
                <option key={d._id} value={d._id}>
                    {d.title}
                </option>
            ))}
        </select>
    );
};

export default Select;
