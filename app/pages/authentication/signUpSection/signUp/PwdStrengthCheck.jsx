import React, { useEffect, useState } from "react";

const PwdStrengthCheck = ({ password }) => {
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: "",
    color: "bg-gray-200",
  });

  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) {
      score += 1;
    }
    if (/\d/.test(password)) {
      score += 1;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    }
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      score += 1;
    }
    let message = "";
    let color = "";
    switch (score) {
      case 0:
        message = "Very Weak";
        color = "bg-red-500";
        break;
      case 1:
        message = "Weak";
        color = "bg-orange-500";
        break;
      case 2:
        message = "Medium";
        color = "bg-yellow-500";
        break;
      case 3:
        message = "Strong";
        color = "bg-lime-500";
        break;
      case 4:
        message = "Very Strong";
        color = "bg-green-500";
        break;
      default:
        message = "";
        color = "bg-gray-200";
    }
    return { score, message, color };
  };

  useEffect(() => {
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({
        score: 0,
        message: "",
        color: "bg-gray-200",
      });
    }
  }, [password]);

  return (
    <>
      {password && (
        <div className="mt-2 space-y-2">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${passwordStrength.color} transition-all duration-300`}
              style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span
              className={`font-medium ${passwordStrength.color.replace(
                "bg-",
                "text-"
              )}`}
            >
              {passwordStrength.message}
            </span>
            <span className="text-gray-500">
              {passwordStrength.feedback?.join(" • ")}
            </span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 mt-2">
            <li className={password.length >= 8 ? "text-green-600" : ""}>
              • At least 8 characters
            </li>
            <li className={/\d/.test(password) ? "text-green-600" : ""}>
              • Contains a number
            </li>
            <li
              className={
                /[!@#$%^&*(),.?":{}|<>]/.test(password) ? "text-green-600" : ""
              }
            >
              • Contains a special character
            </li>
            <li
              className={
                /[a-z]/.test(password) && /[A-Z]/.test(password)
                  ? "text-green-600"
                  : ""
              }
            >
              • Contains uppercase and lowercase letters
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PwdStrengthCheck;
