type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="
        w-full px-4 py-2 border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
      "
    />
  );
}