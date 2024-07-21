import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ITransaction } from '../../@types/TransactionData';

interface CurrencyProps {
    currency: string,
    amount: number,
}

const BarChartType = () => {

    const [barData, setBarData] = useState<CurrencyProps[] | null>(null)

    useEffect(() => {
        const transData = JSON.parse(localStorage.getItem("Transactions") as string);
        let eurAmt = 0, gbpAmt = 0, inrAmt = 0, jpyAmt = 0, usdAmt = 0;
        transData.map((val: ITransaction) => {
            if (val.currency === 'EUR') eurAmt += +val.amount;
            else if (val.currency === 'GBP') gbpAmt += +val.amount;
            else if (val.currency === 'INR') inrAmt += +val.amount;
            else if (val.currency === 'JPY') jpyAmt += +val.amount;
            else if (val.currency === 'USD') usdAmt += +val.amount;
        })
        setBarData([
            {currency: "EUR", amount: eurAmt}, {currency: "GBP", amount: gbpAmt},
            {currency: "INR", amount: inrAmt}, {currency: "JPY", amount: jpyAmt},
            {currency: "USD", amount: usdAmt}
        ]);
        
    }, [])

    return barData && (
        <BarChart
            width={600}
            height={300}
            data={barData as CurrencyProps[]}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="currency" />
            <YAxis />
            <Bar dataKey="amount" fill="#109401" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>)
}

export default BarChartType;
