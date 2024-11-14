import "./button.style.css";

interface DefaultInputProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnType?: "borderless";
}

export function DefaultButton({
  children,
  btnType,
  ...props
}: DefaultInputProps) {
  return (
    <button
      {...props}
      type="button"
      className={`default_button ${
        btnType === "borderless" ? "btn-full" : "btn-border"
      }`}
    >
      {children}
    </button>
  );
}
