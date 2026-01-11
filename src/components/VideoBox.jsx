import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import VideoPlayer from "./VideoPlayer";

export default function VideoBox({ name, src }) {
  return (
    <Card className="min-w-96 w-full max-w-screen-xl mx-auto p-4 flex justify-center items-center bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg">
      <CardHeader className="w-auto pb-2 pt-2 px-1 text-center">
        <h4 className="font-bold text-2xl text-white text-center">{name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible pt-4 flex justify-center items-center">
        <VideoPlayer src={src} />
      </CardBody>
    </Card>
  );
}
