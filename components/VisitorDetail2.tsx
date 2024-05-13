import AutocompleteElement from "./AutoComplete"
import SliderElement from "./Slider"
import { useEffect, useState } from "react"

export default function VisitorDetail2({
    value,
    setValue,
    handleChange,
    handleBoard,
    validationError,
    validationBoard
}:{
    value: any,
    setValue: any,
    handleChange: any,
    handleBoard: any,
    validationError:any,
    validationBoard:any
}) {
    const [inputType, setInputType] = useState('text');
    const data = [
        {label: 'Longboard', value: 'longboard'},
        {label: 'Funboard', value: 'funboard'},
        {label: 'Shortboard', value: 'shortboard'},
        {label: 'Fishboard', value: 'fishboard'},
        {label: 'Gunboard', value: 'gunboard'},
    ]
    const handleFocus = () => {
        setInputType('date');
    };

    const handleBlur = () => {
        setInputType('text');
    };

    useEffect(() => {
        console.log(validationError);
    }, [validationError])

    return (
        <>
            <h1 className='mb-5 text-5xl bodoni-moda'>Book Your Visit</h1>
            <p className='text-sm inter'>2/3: SURFING EXPERIENCE</p>
            <form className="grid grid-cols-2 mt-12 mb-12 gap-x-10 gap-y-7 inter">
                <div className="col-span-2">
                    <SliderElement setValue={setValue} value={value}/>
                </div>
                <div>
    <input 
        placeholder="Visit date"
        className="py-5 px-4 bg-[#232323] w-full textbox-n" 
        type={inputType}
                onFocus={handleFocus}
                onBlur={handleBlur}
        id="visit_date" 
        name="visit_date" 
        onChange={handleChange} 
    />
    {validationError && validationError?.map((error:any) => (
        error.path[0] === "visit_date" && (
            <p key={error.path[0]} className="mt-2 text-red-500">{error.message}</p>
        )
    ))}
</div>

                <div>
                    <AutocompleteElement data={data} hiddenAvatar={true} label={'board'} handleBoard={handleBoard}/>
                    <p className={`text-red-500 mt-2 ${!validationBoard ? `` : `hidden`}`}>Please select your board</p>
                </div>
            </form>
        </>
    )
}