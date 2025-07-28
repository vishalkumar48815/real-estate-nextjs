import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export default function PropertyImageBadge({
  image,
  purpose,
}: {
  image: string;
  purpose: string;
}) {
  return (
    <div className="relative h-48 w-full">
      <Image
        src={image}
        alt="Property"
        fill
        className="object-cover rounded-t-xl"
        priority
      />
      <Badge
        className={cn(
          "absolute top-2 left-2 text-white text-xs px-3 py-1 rounded-full shadow-md",
          purpose === "For Rent" ? "bg-blue-500" : "bg-green-600"
        )}
      >
        {purpose}
      </Badge>
    </div>
  );
}
