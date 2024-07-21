import BarChartType from "./BarChartType"
import BarChartCurrency from "./BarChartCurrency";
import BarChartCategory from "./BarChartCategory"

const Charts = () => {

    return (
        <div className="w-full h-screen bg-grayish-white dark:bg-dark-gray grid grid-cols-1 desktop-sm:grid-cols-2">
            <div>
                <h1 className="w-full font-montserrat font-bold text-3xl my-5 ml-10">Types - count of each type</h1>
                <BarChartType />
            </div>
            <div>
                <h1 className="w-full font-montserrat font-bold text-3xl my-5">Currency - total amount of each currency</h1>
                <BarChartCurrency />
            </div>
            <div className="col-span-2">
                <h1 className="w-full font-montserrat font-bold text-3xl my-5">Category - count of each category</h1>
                <BarChartCategory />
            </div>
        </div>
    )
}

export default Charts
