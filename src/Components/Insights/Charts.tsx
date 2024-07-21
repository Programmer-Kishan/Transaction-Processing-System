import BarChartType from "./BarChartType"
import BarChartCurrency from "./BarChartCurrency";
import BarChartCategory from "./BarChartCategory"

const Charts = () => {

    return (
        <div className="w-full max-h-fit bg-grayish-white dark:bg-dark-gray flex flex-col justify-center items-center overflow-y-scroll">
            <div className="w-full text-center">
                <h1 className="w-full font-montserrat font-bold text-3xl my-5">Types - count of each type</h1>
                <BarChartType />
            </div>
            <div className="w-full text-center">
                <h1 className="w-full font-montserrat font-bold text-3xl my-5">Currency - total amount of each currency</h1>
                <BarChartCurrency />
            </div>
            <div className="w-full text-center">
                <h1 className="w-full font-montserrat font-bold text-3xl my-5">Category - count of each category</h1>
                <BarChartCategory />
            </div>
        </div>
    )
}

export default Charts
