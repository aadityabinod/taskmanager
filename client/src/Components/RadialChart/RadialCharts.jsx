import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
};

function RadialChart({ tasks = [], completedTasks = [], activeTasks = [] }) {
  const tasksTotal = tasks.length;

  const chartData = [
    {
      pending: activeTasks.length,
      completed: completedTasks.length,
    },
  ];

  return (
    <div className="flex flex-col border border-gray-300 shadow-lg bg-white rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-1">Completed vs Pending Tasks</h2>
        <p className="text-gray-500">Task completion status.</p>
      </div>

      <div className="mx-auto aspect-square w-full max-w-[250px]">
        <RadialBarChart
          data={chartData}
          width={250}
          height={250}
          endAngle={180}
          innerRadius={80}
          outerRadius={130}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, tasksTotal]}
            angleAxisId={0}
            tick={false}
            axisLine={false}
          />
          <RadialBar
            dataKey="completed"
            stackId="a"
            cornerRadius={5}
            fill={chartConfig.desktop.color}
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="pending"
            fill={chartConfig.mobile.color}
            stackId="a"
            cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </div>

      <div className="mt-6 flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium text-gray-700">
          Task completion improved by 12% this month{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="text-gray-500">
          Analysis based on tasks completed in the last 30 days.
        </div>
      </div>
    </div>
  );
}

export default RadialChart;