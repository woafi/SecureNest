import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const PasswordInput = ({ ...rest }: PasswordInputProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleShownPassword = () => setIsShown((prev) => !prev);

  return (
    <div>
      <input
        type={isShown ? "text" : "password"}
        {...rest}
      />
      {isShown ? (
        <Eye className="w-5 h-5 transition-colors duration-700 text-gray-700 dark:text-gray-300" onClick={handleShownPassword} />
      ) : (
        <EyeOff className="w-5 h-5 transition-colors duration-700 text-gray-700 dark:text-gray-300" onClick={handleShownPassword} />
      )}
    </div>
  );
};

export default PasswordInput;