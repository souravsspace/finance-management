import {
   Tooltip,
   XAxis,
   ResponsiveContainer,
   CartesianGrid,
   LineChart,
   Line,
} from "recharts"
import { format } from "date-fns"
import CustomTooltip from "./CustomTooltip"

type Props = {
   data: {
      date: string
      income: number
      expenses: number
   }[]
}

const LineVariant = ({ data }: Props) => {
   return (
      <ResponsiveContainer width={"100%"} height={350}>
         <LineChart data={data}>
            <CartesianGrid strokeDasharray={"3 3"} />
            <XAxis
               axisLine={false}
               tickLine={false}
               dataKey={"date"}
               tickFormatter={(value) => format(value, "dd MMM")}
               style={{ fontSize: 12 }}
               tickMargin={16}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
               dot={false}
               dataKey={"income"}
               stroke="#3d82f6"
               strokeWidth={2}
               className="drop-shadow-sm"
            />
            <Line
               dot={false}
               dataKey={"expenses"}
               stroke="#f43f6e"
               strokeWidth={2}
               className="drop-shadow-sm"
            />
         </LineChart>
      </ResponsiveContainer>
   )
}

export default LineVariant
