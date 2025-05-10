import React from "react";
import {Divider, Link} from "@heroui/react";

export default function ({team, email}) {
  return (
    <div className="w-[80%] sm:w-[400px] flex flex-col items-center mt-20">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">{team}</h4>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
        <div>Email: <Link href={"mailto:" + email}>{email}</Link></div>
      </div>
    </div>
  );
}
