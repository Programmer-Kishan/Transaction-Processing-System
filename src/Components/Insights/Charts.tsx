import BarChartType from "./BarChartType"

const Charts = () => {

    return (
        <div className="w-full h-screen bg-grayish-white dark:bg-dark-gray grid grid-cols-2">
            <BarChartType />
            <BarChartType />
        </div>
    )
}

export default Charts
