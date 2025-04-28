import { Checkbox } from "@/components/ui/checkbox";

export interface FilterChecboxProps {
  text: string;
  value?: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
  className?: string;
}
const FilterCheckbox = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  className,
  checked,
  name,
}: FilterChecboxProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Checkbox
        id={`checkbox-${String(name)}-${String(value)}`}
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className={`h-6 w-6 rounded-[8px] ${className}`}
      />
      <label
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
        className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </label>
      {endAdornment}{" "}
      {/* сюда можем дополнительно прописать текс, иконку или jsx элемент */}
    </div>
  );
};

export default FilterCheckbox;
