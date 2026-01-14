import React from "react";
import {Card, CardBody, Image} from "@heroui/react";
import Link from "next/link";

export default function (props) {
  return (
    <Link href={props.url}>
      <Card className="w-full mx-4 max-lg:my-3 bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 cursor-pointer border border-zinc-700/60 hover:border-zinc-600/80 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
        <CardBody className="flex flex-row items-center gap-4 p-4">
          <Image
            alt="channel img"
            height={80}
            radius="md"
            src={props.thumbnail}
            width={140}
            className="flex-shrink-0"
          />
          <div className="flex flex-col gap-1">
            <p className="font-bold text-lg text-white">{props.description}</p>
            {props.category && <p className="text-sm text-zinc-400">{props.category}</p>}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
