import React from "react";
import { FaUsers } from "react-icons/fa";

const EmployeesCount = ({ item }) => {
  return (
    <div className="flex justify-between items-center pr-2">
      <FaUsers className="text-blue-500" />
      <span className="text-sm font-semilight">{item.employees}</span>
    </div>
  );
};

export default EmployeesCount;
