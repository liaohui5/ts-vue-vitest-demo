import { ExtractPropTypes, SetupContext } from "vue";

export const COMPONENT_NAME = "XButton";

const buttonColors = [
  "default",
  "primary",
  "success",
  "info",
  "danger",
  "warning",
];

export const buttonProps = {
  text: {
    type: String,
    default: "button",
  },

  color: {
    type: String,
    values: buttonColors,
    default: "default",
  },

  disabled: Boolean,
} as const;

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

export function useButton(
  props: ButtonPropsType,
  emit: SetupContext<ButtonEmitsType>["emit"],
) {
  function handleClick(e: MouseEvent) {
    if (props.disabled) {
      return;
    }
    /* @ts-ignore */
    emit("click", e);
  }

  return {
    handleClick,
  };
}

// types
export type ButtonPropsType = ExtractPropTypes<typeof buttonProps>;
export type ButtonEmitsType = ExtractPropTypes<typeof buttonProps>;
