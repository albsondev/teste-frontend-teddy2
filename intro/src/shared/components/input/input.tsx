import "./input.style.css";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderSize?: "xl" | "lg";
}

export function DefaultInput({
  placeholderSize = "xl",
  ...props
}: DefaultInputProps) {
  return (
    <input
      {...props}
      className={`default_input ${placeholderSize ? placeholderSize : ""}`}
    />
  );
}
