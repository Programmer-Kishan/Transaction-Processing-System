import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ITransaction } from '../../@types/TransactionData';

interface BarChartProps {
    title: string,
    count: number,
}

const BarChartType = () => {

    const [barData, setBarData] = useState<BarChartProps[] | null>(null)

    useEffect(() => {
        const transData = JSON.parse(localStorage.getItem("Transactions") as string);
        let expenseCount = 0, incomeCount = 0;
        transData.map((val: ITransaction) => {
            if (val.type === 'Expense') expenseCount++;
            else if (val.type === 'Income') incomeCount++;
        })
        console.log(expenseCount, incomeCount);
        setBarData([{ title: "Expense", count: expenseCount }, { title: "Income", count: incomeCount }])
    }, [])

    // const data = [
    //     {
    //       name: 'Page A',
    //       uv: 4000,
    //       pv: 2400,
    //       amt: 2400,
    //     },
    //     {
    //       name: 'Page B',
    //       uv: 3000,
    //       pv: 1398,
    //       amt: 2210,
    //     },
    //     {
    //       name: 'Page C',
    //       uv: 2000,
    //       pv: 9800,
    //       amt: 2290,
    //     },
    //     {
    //       name: 'Page D',
    //       uv: 2780,
    //       pv: 3908,
    //       amt: 2000,
    //     },
    //     {
    //       name: 'Page E',
    //       uv: 1890,
    //       pv: 4800,
    //       amt: 2181,
    //     },
    //     {
    //       name: 'Page F',
    //       uv: 2390,
    //       pv: 3800,
    //       amt: 2500,
    //     },
    //     {
    //       name: 'Page G',
    //       uv: 3490,
    //       pv: 4300,
    //       amt: 2100,
    //     },
    //   ];

    return barData && (
        <BarChart
            width={500}
            height={300}
            data={barData as BarChartProps[]}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>)
}

export default BarChartType;
