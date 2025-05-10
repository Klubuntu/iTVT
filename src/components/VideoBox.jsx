import React from "react";
import {Card, CardHeader, CardBody, Image} from "@heroui/react";
import VideoPlayer from "./VideoPlayer";

export default function (props) {
  return (
    <Card className="py-4 rounded-lg mx-[20vw] max-md:mx-[10vw] max-lg:mx-[5vw] bigger:max-w-[1500px] bigger:mx-auto bigger:block">
      <CardHeader className="pb-2 pt-2 px-1 flex-col items-center ">
        <h4 className="font-bold text-xl">{props.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 items-center">
        <VideoPlayer src={props.src} width="51.5vw"/>
      </CardBody>
    </Card>
  );
}
