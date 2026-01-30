type Props = {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
  };
  
  export default function SelectInput({
    label,
    value,
    onChange,
    options,
  }: Props) {
    return (
      <div>
        {label && <label className="block mb-1 text-sm">{label}</label>}
        <select
          className="w-full border rounded p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- เลือก --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }