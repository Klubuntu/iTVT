import React from "react";
import { Divider, Link } from "@heroui/react";

export default function ({ team, email, text_email }) {
  return (
    <div className="w-[80%] sm:w-[400px] flex flex-col items-center mt-12 bg-zinc-950/70 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/60 shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 hover:border-zinc-700/80 transition-all duration-500">
      <div className="space-y-1">
        <h4 className="text-xl font-bold text-white">{team}</h4>
      </div>
      <Divider className="my-4 bg-zinc-800/40" />
      <div className="flex h-5 items-center space-x-4 text-small">
          <span className="font-semibold text-white">Email:</span>&nbsp;
          {email ? (
            <Link href={"mailto:" + email} className="text-blue-300 hover:text-blue-200 transition-colors">{email}</Link>
          ) : (
            <p className="text-blue-300 mx-1">{text_email || "No email provided"}</p>
          )}
      </div>
    </div>
  );
}
