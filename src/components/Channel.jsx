import React from "react";
import {Card, CardHeader, CardBody, Divider, Image} from "@heroui/react";
import Link from "next/link";

export default function (props) {
  return (
    <Link href={props.url}>
      <Card className="max-w-[250px] mx-4 max-lg:w-full max-lg:my-3 hover:opacity-60 cursor-pointer">
        <CardHeader className="flex items-center justify-center gap-3">
          <Image
            alt="channel img"
            height={100}
            radius="sm"
            src={props.thumbnail}
            width={200}
          />
        </CardHeader>
        <Divider/>
        <CardBody className="flex items-center">
          <p className="text-center">{props.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
