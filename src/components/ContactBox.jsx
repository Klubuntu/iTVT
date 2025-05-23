import React from "react";
import { Divider, Link } from "@heroui/react";

export default function ({ team, email, text_email }) {
  return (
    <div className="w-[80%] sm:w-[400px] flex flex-col items-center mt-12">
      <div className="space-y-1">
        <h4 className="text-medium font-medium">{team}</h4>
      </div>
      <Divider className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-small">
          Email:{" "}
          {email ? (
            <Link href={"mailto:" + email}>{email}</Link>
          ) : (
            <p className="text-blue-500 mx-1">{text_email || "No email provided"}</p>
          )}
      </div>
    </div>
  );
}
