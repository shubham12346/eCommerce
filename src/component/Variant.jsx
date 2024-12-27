import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";

const Variant = ({ variant, index, onRemove, productId }) => {
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
      <div className="border-2 border-black/8 px-3 flex rounded-3xl">
        <div className="lg:min-w-[25rem] xl:w-[18rem] flex items-center py-1 ">
          <h3 className="text-sm px-1">{variant?.title}</h3>
        </div>
      </div>
      <CloseIcon
        onClick={() => onRemove(productId, variant?.id)}
        className="m-1 p-1"
      />
    </div>
  );
};

export default Variant;
