import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#FACC15",
  "#22C55E",
  "#EF4444",
  "#6B7280",
];

function StatusPieChart({ data }) {

  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        No data available
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item._id,
    value: item.count,
  }));

  return (
    <div className="w-full h-80">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >

            {chartData.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default StatusPieChart;