"use client";
import Topbar from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store";
import getNameInitials from "@/utils/getNameInitials";
import { Mic2Icon, MicIcon, SquareIcon, StopCircleIcon } from "lucide-react";
import { ComponentProps, useState } from "react";

export default function Page() {
  const user = useAuthStore((s) => s.user);
  const [isRecording, setIsRecording] = useState(false);
  return (
    <>
      <Topbar hasSearchBox={false} title="Recording" />
      <div className="p-4 h-full w-full min-h-[80vh] lg:min-h-[60vh]">
        <div className="w-full h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col items-center justify-center gap-y-5">
              <div className="flex flex-col items-center justify-center bg-secondary-foreground rounded-full h-64 w-64 my-10">
                <span className="text-5xl font-bold text-secondary">
                  {user !== null && getNameInitials(user?.fullname)}
                </span>
              </div>

              <RecordButton
                isRecording={isRecording}
                onClick={
                  isRecording
                    ? () => {
                        setIsRecording(false);
                        prompt(
                          "Stopped Recording!, How Do you want to Save the file",
                          "unnamed 1"
                        );
                      }
                    : () => setIsRecording(true)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const RecordButton = (
  props: ComponentProps<"button"> & { isRecording: boolean }
) => {
  return (
    <Button
      onClick={props.onClick}
      className="rounded-full border border-gray-800 hover:opacity-95 active:opacity-80 h-16 w-16 animate-in spin-in-2 outline-2 outline-background"
      size={"icon"}
      variant={props.isRecording ? "default" : "outline"}
    >
      {props.isRecording ? (
        <SquareIcon className="fill-primary-foreground" />
      ) : (
        <MicIcon strokeWidth={1} />
      )}
    </Button>
  );
};
