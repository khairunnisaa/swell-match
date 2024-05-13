import AutocompleteElement from "./AutoComplete"
import {getApiData} from "@/function/api";
import { useEffect, useState } from "react";
import axios from "axios";

export default function VisitorDetail({
    handleChange,
    handleCountry,
    validationError,
    validationCountry
}:{
    handleChange:any,
    handleCountry:any,
    validationError:any,
    validationCountry:any
}) {
    const [dataCountries, setDataCountries] = useState<{ value: string | number; label: string; flagSrc: string; }[]>([]);


    useEffect(() => {
        const getData = async () => {
            try {
                let allCountries: any[] = [];
                let page = 1;
                let total = 0;

                // Fetch countries until all pages are retrieved
                do {
                    const { data, success }: { data: any; success: boolean } = await getApiData({ endPoint: `countries?page=${page}` });
                    if (success) {
                        // Concatenate countries from current page to allCountries array
                        allCountries = allCountries.concat(data.data);
                        // Update total count of countries
                        total = data.total;
                        // Move to the next page
                        page++;
                    } else {
                        console.error(`Failed to fetch data. Status: ${status}`);
                        break; // Break the loop if request fails
                    }
                } while (allCountries.length < total);

                // Map the retrieved countries
                const mappedCountries = allCountries.map((item: {
                    id: string | number; name: string; flag_url: string }) => ({
                    value: item.id,
                    label: item.name,
                    flagSrc: item.flag_url
                }));

                // Set the mapped countries data
                setDataCountries(mappedCountries);
            } catch (error) {
                console.error('An error occurred while fetching data:', error);
            }
        };

        getData();
    }, []);

    return (
        <>
            <h1 className='mb-5 text-5xl bodoni-moda'>Book Your Visit</h1>
            <p className='text-sm inter'>1/3: VISITOR DETAILS</p>
            <form className="grid grid-cols-2 mt-12 mb-12 gap-x-10 gap-y-14 inter">
                <div className="">
                    <input onChange={handleChange} name="name" className="py-5 px-4 bg-[#232323] w-full mb-2" type="text" placeholder="Name"/>
                    {validationError?.map((error:any) => (
                        error.path[0] === "name" && (
                            <p key={error.path[0]} className="text-red-500">{error.message}</p>
                        )
                    ))}
                </div>
                <div>
                    <AutocompleteElement data={dataCountries} label={'country'} handleChange={handleChange} handleCountry={handleCountry} hiddenAvatar={false}/>
                    <p className={`text-red-500 mt-2 ${!validationCountry ? `` : `hidden`}`}>Please select your country</p>
                </div>
                <div>
                    <input onChange={handleChange} name="email" className="py-5 px-4 bg-[#232323] w-full mb-2" type="email" placeholder="Email"/>
                    {validationError?.map((error:any) => (
                        error.path[0] === "email" && (
                            <p key={error.path[0]} className="text-red-500">{error.message}</p>
                        )
                    ))}
                </div>
                <div>
                    <input onChange={handleChange} name="whatsapp_number" className="py-5 px-4 bg-[#232323] w-full mb-2" type="text" placeholder="Whatsapp number"/>
                    {validationError?.map((error:any) => (
                        error.path[0] === "whatsapp_number" && (
                            <p key={error.path[0]} className="text-red-500">{error.message}</p>
                        )
                    ))}
                </div>
            </form>
        </>
    )
}
