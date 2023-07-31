/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Podcast } from "@/types";
import { Skeleton } from "./ui/skeleton";
import truncateString from "@/utils/truncateString";
import { baseURL } from "@/config/constants";

interface PodcastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  podcast: Podcast;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

function PodcastCard({
  podcast,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PodcastCardProps) {
/*   console.log(`${baseURL}/${podcast.audio.file_path}`);
  const audio = new Audio();
  audio.src = `${baseURL}/${podcast.audio.file_path}`;

  const playAudio = () => {
    if (!audio.paused) {
      audio.play();
    }
    audio.pause()
  }; */

  return (
    <div  className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <img
          src={podcast.image}
          // src={album.cover}
          alt={podcast.title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
          // quality={100}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{podcast.title}</h3>
        <p className="text-xs text-muted-foreground">
          {truncateString(podcast.description, 40)}
        </p>
      </div>
    </div>
  );
}

PodcastCard.Skelecton = function PodcastCardSkelecton({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div>
      <Skeleton className={className} />
      <div className="my-2 space-y-1 text-sm">
        <Skeleton className="w-4/6 h-4" />
        <Skeleton className="w-3/6 h-3" />
      </div>
    </div>
  );
};

export default PodcastCard;
