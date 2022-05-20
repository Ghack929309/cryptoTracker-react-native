import { LineChart } from "react-native-wagmi-charts";
import { memo } from "react";

function StandardChart({ SIZE, color }) {
  return (
    <LineChart height={SIZE / 2} width={SIZE}>
      <LineChart.Path color={color}>
        <LineChart.Gradient />
      </LineChart.Path>
      <LineChart.CursorCrosshair color={color} />
    </LineChart>
  );
}

export default memo(StandardChart);
