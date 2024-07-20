import { useState, useEffect, useRef, FormEvent } from "react";

import { ITransaction } from "../../@types/TransactionData";
import Transaction from "./Transaction";
import useFetch from "../../hooks/useFetch";
import TransactionFilter from "./TransactionFilter";


const AllTransactions = () => {

  const [values, setValues] = useState<ITransaction[] | undefined>();
  const titleRef = useRef<HTMLInputElement>(null);

  const [types, setTypes] = useState<string[] | undefined>();
  const [categorys, setCategorys] = useState<string[] | undefined>();
  const [currencys, setCurrencys] = useState<string[] | undefined>();

  const { fetchCSVData } = useFetch();

  const data = JSON.parse(localStorage.getItem("Transactions") as string);

  useEffect(() => {
    fetchCSVData("/data/Transactions.csv", (data) => {
      const temp = data?.map((val: ITransaction, ind: number) => ({ ...val, "_id": ind + 1 }))
      setValues(temp);
      const uniqueTypes = [...new Set(temp?.map((val: ITransaction) => val.type))];
      const uniqueCategory = [...new Set(temp?.map((val: ITransaction) => val.category))];
      const uniqueCurrency = [...new Set(temp?.map((val: ITransaction) => val.currency))];
      setTypes(uniqueTypes as string[]);
      setCategorys(uniqueCategory as string[]);
      setCurrencys(uniqueCurrency as string[]);
      localStorage.setItem("Transactions", JSON.stringify(temp))
    })
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const title = titleRef?.current.value;
    const titleData = data?.filter(val => val.title === title);

    setValues(titleData);
  }

  function changeSelectHandler(e: FormEvent, keyword: string) {
    let targetData
    if (keyword === 'type') {
      targetData = data?.filter((val: ITransaction) => val.type === e.target.value);
    } else if (keyword === 'category') {
      targetData = data?.filter((val: ITransaction) => val.category === e.target.value);
    } else if (keyword === 'currency') {
      targetData = data?.filter((val: ITransaction) => val.currency === e.target.value);
    }
    console.log(targetData);
    setValues(targetData);
  }

  return (
    <>
      <div className="flex gap-3 bg-grayish-white w-full">
        <form className="w-1/4 h-screen mt-4 p-4 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>  
            <input
              type="text"
              className="w-full p-2 rounded-sm font-poppins" placeholder="Enter Transaction Title"
              ref={titleRef}
            />
            <button type="submit" className="mt-3 bg-dark-blue text-white text-lg font-poppins p-2">
              Search
            </button>
          </div>
          <div>
              <TransactionFilter handlerfn={changeSelectHandler} field="type" data={types as string[]}/>
          </div>
          <div>
              <TransactionFilter handlerfn={changeSelectHandler} field="category" data={categorys as string[]}/>
          </div>
          <div>
              <TransactionFilter handlerfn={changeSelectHandler} field="currency" data={currencys as string[]}/>
          </div>
        </form>
        <div className="w-full p-10 grid grid-cols-3 gap-5">
          {values?.map((val, index) => (
            <Transaction key={index} no={val._id as number} type={val.type} category={val.category} title={val.title} />
          ))}
        </div>
      </div>
    </>
  )
}

export default AllTransactions
