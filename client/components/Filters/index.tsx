import { NextPage } from "next";

// Components
import { Button, Select } from "../Common";

interface IProps {
    handleFilterGender: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleFilterBrand: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCleanFilters: () => void;
    genderSelected: number;
    brandSelected: number;
}

const Filters: NextPage<IProps> = ({
    handleFilterGender,
    handleFilterBrand,
    handleCleanFilters,
    genderSelected,
    brandSelected,
}) => {
    const genders = [
        { _id: 0, title: "Gender", selected: true },
        { _id: 1, title: "Male", selected: false },
        { _id: 2, title: "Female", selected: false },
    ];

    const brands = [
        { _id: 0, title: "Brands", selected: true },
        { _id: 1, title: "Lee", selected: false },
        { _id: 2, title: "Magasin", selected: false },
    ];

    return (
        <>
            <Select data={genders} handleOnChange={handleFilterGender} valueSelected={genderSelected} />
            <Select data={brands} handleOnChange={handleFilterBrand} valueSelected={brandSelected} />
            <Button title="Reset" handleOnclick={handleCleanFilters} customCss="py-2" />
        </>
    );
};

export default Filters;
