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
