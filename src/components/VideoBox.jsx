import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import VideoPlayer from "./VideoPlayer";

export default function VideoBox({ name, src }) {
  return (
    <Card className="min-w-96 w-full max-w-screen-xl mx-auto p-6 flex justify-center items-center bg-gradient-to-b from-zinc-900 to-black border-2 border-zinc-800/60 rounded-2xl shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-500 hover:border-zinc-700/80">
      <CardHeader className="w-auto pb-3 pt-3 px-2 text-center">
        <h4 className="font-bold text-3xl text-white drop-shadow-lg">{name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible pt-6 flex justify-center items-center">
        <VideoPlayer src={src} />
      </CardBody>
    </Card>
  );
}
