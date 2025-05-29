import React from "react";
import { FaUsers } from "react-icons/fa";

const EmployeesCount = ({ item }) => {
  return (
    <div className="flex justify-between items-center pr-2 text-blue-500">
      <FaUsers />
      <span className="text-sm font-semilight">{item.employees}</span>
    </div>
  );
};

export default EmployeesCount;
