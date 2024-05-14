import { useEffect, useState } from "react"
import { getApiData } from "@/function/api"
import Image from "next/image"

export default function VisitorDetail2({
    dataBooking
}:{
    dataBooking:any
}) {
    return (
        <>
            <h1 className='mb-5 text-5xl bodoni-moda'>Thank you, {dataBooking?.member?.name}</h1>
            <p className='text-base inter'>You,re in!</p>
            <p className='mt-5 text-base inter'>{"Your store visit is booked and you're ready to ride the shopping wave. Here’s your detail:"}</p>
            <div className="grid grid-cols-2 gap-5 mt-5 mb-10 inter">
                <div>
                    <p className="text-base text-gray-400">Name:</p>
                    <p className="text-lg">{dataBooking?.member?.name}</p>
                </div>
                <div>
                    <p className="text-base text-gray-400">Country:</p>
                    <p className="flex items-center gap-2 text-lg">
                        <Image
                            className="w-5 h-5"
                            src={dataBooking?.country?.flag_url}
                            width={10}
                            height={10}
                            alt="flag icon"
                        />
                        {dataBooking?.country?.name}
                    </p>
                </div>
                <div>
                    <p className="text-base text-gray-400">Email:</p>
                    <p className="text-lg">{dataBooking?.member?.email}</p>
                </div>
                <div>
                    <p className="text-base text-gray-400">Visit date:</p>
                    <p className="text-lg">{dataBooking?.visit_date}</p>
                </div>
            </div>
            <p className="mb-20 inter">We look forward to seeing you at the #Swellmatch store! <br></br> Your booking details already sent to your email and whatsapp</p>
        </>
    )
}
