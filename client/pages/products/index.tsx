import type { NextPage } from "next";
import { useState } from "react";

// Components
import ProductsContainer from "../../components/containers/Products";
import NavBar from "../../components/Navbar";
import { Spinner } from "../../components/Common";

// Hooks
import { useGetAllQuery } from "../../services/products";

const Products: NextPage = () => {
    // Local States
    const [genderSelected, setGenderSelected] = useState<number>(0);
    const [brandSelected, setBrandSelected] = useState<number>(0);
    // RTK Query
    const { data, isError, isLoading } = useGetAllQuery(undefined, {
        selectFromResult: ({ data, isError, isLoading }) => ({
            data:
                genderSelected === 0 && brandSelected === 0
                    ? data
                    : data?.filter(
                          (d) =>
                              (brandSelected > 0 ? d.productBrand._id === brandSelected : d) &&
                              (genderSelected > 0 ? d.productGender._id === genderSelected : d)
                      ),
            isError,
            isLoading,
        }),
    });

    const handleFilterGender = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setGenderSelected(parseInt(event.target.value));

    const handleFilterBrand = (event: React.ChangeEvent<HTMLSelectElement>) =>
        setBrandSelected(parseInt(event.target.value));

    const handleCleanFilters = () => {
        setGenderSelected(0);
        setBrandSelected(0);
    };

    if (isError) return <div className="w-screen h-screen flex justify-center items-center">Something went wrong</div>;

    if (isLoading)
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );

    if (!data) return <div className="w-screen h-screen flex justify-center items-center">Missing products!</div>;

    return (
        <>
            <NavBar />
            <ProductsContainer
                data={data}
                handleFilterGender={handleFilterGender}
                handleFilterBrand={handleFilterBrand}
                handleCleanFilters={handleCleanFilters}
                genderSelected={genderSelected}
                brandSelected={brandSelected}
            />
        </>
    );
};

export default Products;
