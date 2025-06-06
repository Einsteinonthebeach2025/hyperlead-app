import SpanText from 'app/components/SpanText'

const WeeksChart = ({ current, last }) => {

  const getChangeInfo = (base, compareTo) => {
    const diff = base - compareTo;
    const percent = compareTo ? (diff / compareTo) * 100 : 0;
    const isPositive = percent >= 0;
    return {
      percent: Math.abs(percent).toFixed(2),
      isPositive,
      arrow: isPositive ? '↑' : '↓',
    };
  };

  const currentInfo = getChangeInfo(current, last);
  const lastInfo = getChangeInfo(last, current);

  return (
    <div className="grid grid-cols-2 gap-6 mt-2">
      {/* This Week */}
      <div className="flex flex-col gap-1">
        <SpanText >This Week</SpanText>
        <h1 className="text-3xl font-bold dark:text-stone-100">{current}</h1>
        <div
          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium w-fit ${currentInfo.isPositive
            ? 'green-style border'
            : 'red-style border'
            }`}
        >
          {currentInfo.arrow} {currentInfo.percent}%
        </div>
      </div>

      {/* Last Week */}
      <div className="flex flex-col gap-1">
        <SpanText >Last Week</SpanText>
        <h1 className="text-3xl font-bold dark:text-stone-100">{last}</h1>
        <div
          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium w-fit ${lastInfo.isPositive
            ? 'green-style border'
            : 'red-style border'
            }`}
        >
          {lastInfo.arrow} {lastInfo.percent}%
        </div>
      </div>
    </div>
  )
}

export default WeeksChart