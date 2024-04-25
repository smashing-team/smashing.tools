import type { ReactElement } from "react";

export type BasicFormField<
  ParsedValue extends {} | null,
  ValidatedValue extends ParsedValue = ParsedValue,
  ReaderValue = ValidatedValue
> = {
  kind: "form";
  formKind?: undefined;
  Input(props: FormFieldInputProps<ParsedValue>): ReactElement | null;
  defaultValue(): ParsedValue;
  parse(value: FormFieldStoredValue): ParsedValue;
  /**
   * If undefined is returned, the field will generally not be written,
   * except in array fields where it will be stored as null
   */
  serialize(value: ParsedValue): { value: FormFieldStoredValue };
  validate(value: ParsedValue): ValidatedValue;
  reader: {
    parse(value: FormFieldStoredValue): ReaderValue;
  };
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | readonly JsonValue[]
  | { [key: string]: JsonValue };

type JsonValueWithoutNull = JsonValue & {};

export type FormFieldStoredValue = JsonValueWithoutNull | undefined;

export type FormFieldInputProps<Value> = {
  value: Value;
  onChange(value: Value): void;
  autoFocus: boolean;
  /**
   * This will be true when validate has returned false and the user has attempted to close the form
   * or when the form is open and they attempt to save the item
   */
  forceValidation: boolean;
};

export function basicFormFieldWithSimpleReaderParse<
  ParsedValue extends {} | null,
  ValidatedValue extends ParsedValue
>(config: {
  Input(props: FormFieldInputProps<ParsedValue>): ReactElement | null;
  defaultValue(): ParsedValue;
  parse(value: FormFieldStoredValue): ParsedValue;
  /**
   * If undefined is returned, the field will generally not be written,
   * except in array fields where it will be stored as null
   */
  serialize(value: ParsedValue): { value: FormFieldStoredValue };
  validate(value: ParsedValue): ValidatedValue;
}): BasicFormField<ParsedValue, ValidatedValue, ValidatedValue> {
  return {
    kind: "form",
    Input: config.Input,
    defaultValue: config.defaultValue,
    parse: config.parse,
    serialize: config.serialize,
    validate: config.validate,
    reader: {
      parse(value) {
        return config.validate(config.parse(value));
      },
    },
  };
}

export function createdAt() {
  return basicFormFieldWithSimpleReaderParse({
    Input() {
      return <></>;
    },
    defaultValue() {
      return new Date();
    },
    parse(value) {
      return (value as any) ?? null;
    },
    validate(value) {
      return value;
    },
    serialize(value) {
      return { value };
    },
  });
}
