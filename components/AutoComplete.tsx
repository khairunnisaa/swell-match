import React, { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Avatar } from "@nextui-org/avatar";

export default function AutocompleteElement({
  data,
  hiddenAvatar,
  label,
  handleChange,
  handleCountry,
  handleBoard,
}: {
  data: any;
  hiddenAvatar?: any;
  label: any;
  handleChange?: (selectedData: any) => void;
  handleCountry?: (selectedData: any) => void;
  handleBoard?: (selectedData: any) => void;
}) {
  const handleAutocompleteChange = (selectedItem: any) => {
    if(label === 'country' && handleCountry){
      handleCountry(selectedItem)
    }else if(label === 'board' && handleBoard){
      handleBoard(selectedItem)
    }
  };

  return (
    <>
      <div className="flex flex-wrap w-full gap-4 md:flex-nowrap dark">
        <Autocomplete
          defaultItems={data}
          label={"Select " + label}
          className="w-full h-full inter"
          radius="none"
          color="default"
          onSelectionChange={handleAutocompleteChange}
        >
          {(data?: { value: any; label: string; flagSrc: string }) => (
            <AutocompleteItem
              className="inter"
              key={data?.value}
              startContent={
                <Avatar
                  alt={data?.label}
                  className={`${hiddenAvatar ? `hidden` : ``} w-5 h-5`}
                  src={data?.flagSrc}
                />
              }
              value={data?.value}
            >
              {data?.label}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </>
  );
}
