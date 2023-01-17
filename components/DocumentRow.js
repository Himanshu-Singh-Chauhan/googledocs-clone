import { Button } from "@material-tailwind/react";

import { IconButton } from "@material-tailwind/react";
import { useRouter } from "next/router";

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex items-center rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer"
    >
      <IconButton variant="text">
        <i className="material-icons">article</i>
      </IconButton>
      <p className="flex-grow pl-5 w-10 pr-10 truncate">{fileName}</p>
      <p className="pr-5 text-sm">{date?.toDate().toLocaleDateString()}</p>
      <IconButton variant="text">
        <i className="material-icons">more_vert</i>
      </IconButton>
    </div>
  );
}

export default DocumentRow;
