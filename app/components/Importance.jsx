import React from 'react'

const Importance = ({ item }) => {
  const getColor = (level) => {
    switch (level.toLowerCase()) {
      case "low":
        return "text-green-500 border-green-500 bg-green-100/80 dark:bg-green-900/40";
      case "medium":
        return "text-amber-500 border-amber-500 bg-amber-100/80 dark:bg-amber-800/40";
      case "high":
        return "text-red-500 border-red-500 bg-red-100/80 dark:bg-red-900/40";
    }
  };


  return (
    <div>
      <h1
        className={`text-[10px] pointer-events-none font-semibold uppercase px-2 tracking-wider border w-fit rounded-sm ${getColor(item)}`}
      >
        Priority {item}
      </h1>
    </div>
  )
}

export default Importance