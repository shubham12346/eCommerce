import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Variant = ({ variant, index, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: variant?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="flex my-1 pl-12 justify-center items-center"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div>
        <DragIndicatorIcon {...listeners} />
      </div>
      <div className="mr-2">
        <div className="">{`${index}`}.</div>
      </div>
      <div className="border-2 border-black px-3 flex rounded-3xl">
        <div className="lg:min-w-[21rem] xl:w-[18rem] flex items-center py-1 ">
          <h3 className="text-sm px-1">{variant?.title}</h3>
        </div>
        <div className="cursor-pointer text-sm">Edit</div>
      </div>
      <button onClick={() => onRemove(variant?.id)} className="m-1 p-1">
        x
      </button>
    </div>
  );
};

export default Variant;
