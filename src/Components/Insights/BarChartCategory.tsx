import { useEffect, useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ITransaction } from '../../@types/TransactionData';

interface CurrencyProps {
    category: string,
    count: number,
}

const BarChartType = () => {

    const [barData, setBarData] = useState<CurrencyProps[] | null>(null)

    useEffect(() => {
        const transData = JSON.parse(localStorage.getItem("Transactions") as string);
        let bonusCnt = 0, eduCnt = 0, enterCnt = 0, foodCnt = 0, freeCnt = 0, giftCnt = 0, careCnt = 0, investCnt = 0, rentCnt = 0, salCnt = 0, shopCnt = 0, transCnt = 0, travelCnt = 0, utilCnt = 0;
        transData.map((val: ITransaction) => {
            if (val.category === 'Bonus') bonusCnt++;
            else if (val.category === 'Education') eduCnt++;
            else if (val.category === 'Entertainment') enterCnt++;
            else if (val.category === 'Food') foodCnt++;
            else if (val.category === 'Freelance') freeCnt++;
            else if (val.category === 'Gift') giftCnt++;
            else if (val.category === 'Healthcare') careCnt++;
            else if (val.category === 'Investment') investCnt++;
            else if (val.category === 'Rent') rentCnt++;
            else if (val.category === 'Salary') salCnt++;
            else if (val.category === 'Shopping') shopCnt++;
            else if (val.category === 'Transportation') transCnt++;
            else if (val.category === 'Travel') travelCnt++;
            else if (val.category === 'Utilities') utilCnt++;
        })
        setBarData([
            {category: "Bonus", count: bonusCnt}, {category: "Education", count: eduCnt},
            {category: "Entertainment", count: enterCnt}, {category: "Food", count: foodCnt},
            {category: "Freelance", count: freeCnt}, {category: "Gift", count: giftCnt},
            {category: "HealthCare", count: careCnt}, {category: "Investment", count: investCnt},
            {category: "Rent", count: rentCnt}, {category: "Salary", count: salCnt},
            {category: "Shopping", count: shopCnt}, {category: "Transportation", count: transCnt},
            {category: "Travel", count: travelCnt}, {category: "Utilities", count: utilCnt},
            
        ]);
        
    }, [])

    return barData && (
        <div className='w-fit h-fit mx-auto'>
            <BarChart
                width={1500}
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
                <XAxis dataKey="category" />
                <YAxis />
                <Bar dataKey="count" fill="#109401" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </div>
        )
}

export default BarChartType;
