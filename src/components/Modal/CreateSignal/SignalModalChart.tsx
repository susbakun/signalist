import { SignalModel } from "@/shared/models"
import { isDarkMode } from "@/utils"
import { IoMdAddCircleOutline } from "react-icons/io"
import { IoRemoveCircle } from "react-icons/io5"
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets"

type SignalModalChartProps = {
  showChart: boolean
  marketSymbol: SignalModel["market"]["name"]
  handleToggleChart: () => void
}

export const SignalModalChart = ({
  marketSymbol,
  showChart,
  handleToggleChart
}: SignalModalChartProps) => {
  return (
    <div>
      {showChart ? (
        <div className="flex flex-col gap-2">
          <div className="flex justify-end">
            <button
              onClick={handleToggleChart}
              className="action-button text-gray-600 dark:text-white"
            >
              <IoRemoveCircle className="w-6 h-6" />
            </button>
          </div>
          <div>
            <AdvancedRealTimeChart
              theme={isDarkMode() ? "dark" : "light"}
              width="100%"
              symbol={marketSymbol + "USD"}
              height={500}
              hotlist={false}
              style="3"
              hide_legend
              allow_symbol_change={false}
              timezone="Asia/Tehran"
              show_popup_button
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleToggleChart}
          className="text-dark-link-button action-button
          flex gap-1 items-center"
        >
          <IoMdAddCircleOutline className="w-6 h-6" />
          Add chart
        </button>
      )}
    </div>
  )
}
