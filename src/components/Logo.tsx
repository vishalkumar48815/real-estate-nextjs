import Image from "next/image";

export default function Logo() {
    return <>
        <Image src={"/logo.png"} objectFit="fit" width={180} height={140} alt="logo" />
    </>
}