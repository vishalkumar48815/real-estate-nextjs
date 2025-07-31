import Image from "next/image";

export default function Logo({width=140, height= 110}) {
    return <>
        <Image 
            src={"/logo.png"} 
            priority 
            width={width} 
            height={height} 
            alt="logo"
            style={{ objectFit: "contain", width: "", height: "auto" }}
        />
    </>
}