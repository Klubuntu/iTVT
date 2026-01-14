import React from "react";
import {Card, CardBody, Divider, Image, Slider} from "@heroui/react";
import Link from "next/link";

export default function (props) {
  return (
    <Link href={props.url} className="w-full">
      <Card
        isBlurred
        className="max-w-[450px] mx-4 max-lg:w-full max-lg:my-3 bg-gradient-to-br from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 cursor-pointer border border-zinc-700/60 hover:border-zinc-600/80 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
        shadow="md"
      >
        <Divider className="bg-zinc-700/30"/>
        <CardBody className="p-5">
          <div className="grid grid-cols-12 gap-6 md:gap-4 items-center justify-center">
            <div className="relative col-span-6 md:col-span-4">
            <Image
                alt="channel img"
                height={90}
                radius="sm"
                src={props.thumbnail}
                width={200}
            />
            </div>

            <div className="flex flex-col col-span-6 md:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0">
                  <h3 className="font-semibold text-foreground/90">{props.description}</h3>
                  <h1 className="text-large font-medium mt-2">...</h1>
                </div>
              </div>

              <div className="flex flex-col mt-3 gap-1">
                {/* <Slider
                  aria-label="Music progress"
                  classNames={{
                    track: "bg-default-500/30",
                    thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                  }}
                  color="foreground"
                  defaultValue={33}
                  size="sm"
                /> */}
                {/* <div className="flex justify-between">
                  <p className="text-small">0:00</p>
                  <p className="text-small text-foreground/50">0:00</p>
                </div> */}
              </div>

              <div className="flex w-full items-center justify-center">
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
    // <Link href={props.url}>
    //   <Card className="max-w-[250px] mx-4 max-lg:w-full max-lg:my-3 hover:opacity-60 cursor-pointer">
    //     <CardHeader className="flex items-center justify-center gap-3">
    //       <Image
    //         alt="channel img"
    //         height={100}
    //         radius="sm"
    //         src={props.thumbnail}
    //         width={200}
    //       />
    //     </CardHeader>
    //     <Divider/>
    //     <CardBody className="flex items-center">
    //       <p className="text-center">{props.description}</p>
    //     </CardBody>
    //   </Card>
    // </Link>
  );
}
