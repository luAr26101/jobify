import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type CreateAndEditJobType } from "@/utils/types";
import { Controller, type Control, type Path } from "react-hook-form";

type FormId = {
  formId: string;
};

type CustomFormFieldProps = FormId & {
  name: Path<CreateAndEditJobType>;
  control: Control<CreateAndEditJobType>;
  placeholder?: string;
};

export function CustomFormField({
  formId,
  name,
  control,
  placeholder = "",
}: CustomFormFieldProps) {
  const customFormFieldId = `${formId}-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={customFormFieldId} className="capitalize">
            {name}
          </FieldLabel>
          <Input
            {...field}
            id={customFormFieldId}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

type CustomFormSelectProps = FormId & {
  name: Path<CreateAndEditJobType>;
  control: Control<CreateAndEditJobType>;
  items: string[];
  labelText?: string;
};
export function CustomFormSelect({
  formId,
  name,
  control,
  items,
  labelText,
}: CustomFormSelectProps) {
  const customFormSelectId = `${formId}-${name}`;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={customFormSelectId} className="capitalize">
            {labelText || name}
          </FieldLabel>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id={customFormSelectId}
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {items.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
