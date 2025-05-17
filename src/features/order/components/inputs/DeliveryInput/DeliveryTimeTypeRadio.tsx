import { tailwindMerge } from "@lib/tsMerge/tsMerge";
import { useFormContext } from "react-hook-form";
import { FaShippingFast } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

interface DeliveryTimeRadioProps {
  id: string;
}

export function DeliveryTimeRadio({ id }: DeliveryTimeRadioProps) {
  const { setValue, watch } = useFormContext();
  const request_earliest_delivery = watch(id);

  const cardBase =
    "cursor-pointer rounded-2xl border p-2 px-3 flex flex-row items-center justify-center gap-4 shadow-sm transition-colors hover:shadow-md hover:bg-blue-50";
  const selectedCard = " ring-2 ring-blue-500 border-blue-500 transition-colors shadow-md bg-blue-50 shadow-sm transition-colors";
  
  return (
    <>
    <div className="grid grid-cols-2 gap-4">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setValue(id, true)}
        className={tailwindMerge(
          `${cardBase} ${request_earliest_delivery ? selectedCard : "border-gray-300"}`
        )}
        onClick={() => setValue(id, true)}
      >
        <FaShippingFast className="text-4xl text-blue-600" />
        <span className="text-sm font-medium">As soon as possible</span>
      </div>

      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setValue(id, false)}
        className={tailwindMerge(
          `${cardBase} ${!request_earliest_delivery ? selectedCard : "border-gray-300"}`
        )}
        onClick={() => setValue(id, false)}
      >
        <MdAccessTime className="text-4xl text-blue-600" />
        <span className="text-sm font-medium">Schedule delivery time</span>
      </div>
      
    </div>
    </>
  );
}