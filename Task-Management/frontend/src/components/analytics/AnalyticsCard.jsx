function AnalyticsCard({
  title,
  value,
  bgColor,
}) {
  return (
    <div
      className={`${bgColor} text-white p-6 rounded-xl shadow hover:shadow-lg transition`}
    >
      <p className="text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default AnalyticsCard;