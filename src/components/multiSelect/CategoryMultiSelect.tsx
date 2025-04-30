import { useGetCategoryQuery } from "@features/home/hook/useGetCategoryQuery/useGetCategoryQuery";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { Form } from "react-bootstrap";
import classNames from "classnames";

interface CategoryMultiSelectProps {
  id: string;
  label: string;
}

export function CategoryMultiSelect({ id, label }: CategoryMultiSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[id]?.message as string | undefined;

  const {
    data: categories,
    isLoading,
    isSuccess,
  } = useGetCategoryQuery();

  if (isLoading || !isSuccess) return null;

  const formattedCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="form-floating">
      <Controller
        control={control}
        name={id}
        render={({ field }) => (
          <Select
            {...field}
            inputId={id}
            options={formattedCategories}
            isMulti
            isSearchable
            className={classNames("react-select", { "is-invalid": errorMessage })}
            classNamePrefix="react-select"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: errorMessage
                  ? "#dc3545"
                  : state.isFocused
                  ? "#86b7fe"
                  : "#ced4da",
                boxShadow: state.isFocused
                  ? "0 0 0 0.25rem rgba(13, 110, 253, 0.25)"
                  : undefined,
                minHeight: "3.5rem", // importante per l'altezza flottante
                paddingTop: "1.5rem", // spazio per il label
              }),
            //   valueContainer: (base) => ({
            //     ...base,
            //     paddingTop: "0rem",
            //   }),
              menu:(base)=>({
                ...base,
                zIndex:'20'
              })
            }}
          />
        )}
      />
      <label htmlFor={id} className="py-2 text-[13px] font-normal ">{label}</label>
      {errorMessage && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </div>
  );
}
