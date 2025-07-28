
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewCard = ({
    img,
    name,
    username,
    feedback,
    rating
}: {
    img: string;
    name: string;
    username: string;
    feedback: string;
    rating: number | string
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width={32} height={32} alt={`${name}'s avatar`}  src={img} style={{ width: "auto", height: "auto", objectFit: "contain" }}
                />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-slate-600">@{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{feedback}</blockquote>
            <div className="flex mt-2 text-yellow-500">
                {Array.from({ length: Number(rating) }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
            </div>
        </figure>
    );
};

export default ReviewCard