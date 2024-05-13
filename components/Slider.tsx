import React from "react";
import { Slider } from "@nextui-org/react";

export default function SliderElement({
  value,
  setValue
}: {
  value: any;
  setValue: any;
}) {
  return (
    <div className="relative">
      <div className="mb-14">Your Surfing Experience</div>
      <Slider
        step={1}
        // hideThumb={true}
        maxValue={10}
        minValue={0}
        defaultValue={value}
        showTooltip={true}
        showOutline={false}
        disableThumbScale={false}
        onChangeEnd={setValue}
        classNames={{
          base: "w-full",
          filler: "bg-gradient-to-r from-white to-teal-400",
          labelWrapper: "mb-2",
          label: "font-medium text-white text-medium mb-7",
          value: "font-medium text-default-500 text-small",
          thumb: [
            "transition-size",
            "bg-gradient-to-r from-teal-400 to-white",
            "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
            "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-7 data-[dragging=true]:after:w-7", "custom-thumb"
          ],
          step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50"
        }}
        tooltipProps={{
          offset: 10,
          placement: "top",
          classNames: {
            base: [
              // arrow color
              "before:bg-gradient-to-r before:from-white before:to-teal-400",
            ],
            content: [
              "py-2 shadow-xl",
              "text-white bg-[#05B3BE]",
            ],
          },
        }}
      />
      <div className="absolute flex justify-between w-full" style={{ top: '45px' }}>
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10+</span>
      </div>
    </div>
  );
}
