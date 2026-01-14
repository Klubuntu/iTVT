import React from "react";
import {Card, CardHeader, CardBody, Divider, Image} from "@heroui/react";
import Link from "next/link";

export default function (props) {
  return (
    <Link href={props.url}>
      <Card className="max-w-[250px] mx-4 max-lg:w-full max-lg:my-3 bg-gradient-to-b from-zinc-800 to-zinc-950 hover:from-zinc-700 hover:to-zinc-900 cursor-pointer border border-zinc-700/60 hover:border-zinc-600/80 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1">
        <CardHeader className="flex items-center justify-center gap-3">
          <Image
            alt="channel img"
            height={100}
            radius="md"
            src={props.thumbnail}
            width={200}
          />
        </CardHeader>
        <Divider className="bg-zinc-700/30"/>
        <CardBody className="flex items-center">
          <p className="text-center font-semibold text-white">{props.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
