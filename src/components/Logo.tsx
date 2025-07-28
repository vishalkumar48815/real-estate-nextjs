import Image from "next/image";

export default function Logo() {
    return <>
        <Image 
            src={"/logo.png"} 
            priority 
            width={180} 
            height={140} 
            alt="logo"
            style={{ objectFit: "contain", width: "auto", height: "auto" }}
        />
    </>
}