import { useState, useEffect, useRef, FormEvent } from "react";

import { ITransaction } from "../../@types/TransactionData";
import Transaction from "./Transaction";
import useFetch from "../../hooks/useFetch";
import TransactionFilter from "./TransactionFilter";
import TransactionModal from "./TransactionModal";
import AddTransactionModal from "./AddTransactionModal";


const AllTransactions = () => {

  const [values, setValues] = useState<ITransaction[] | undefined>();
  const titleRef = useRef<HTMLInputElement>(null);

  const [types, setTypes] = useState<string[] | undefined>();
  const [categorys, setCategorys] = useState<string[] | undefined>();
  const [currencys, setCurrencys] = useState<string[] | undefined>();

  const transactionDialog = useRef<HTMLDialogElement>(null);
  const AddTransactionRef = useRef<HTMLDialogElement>(null);
  const [selectedData, setSelectedData] = useState<ITransaction | null>(null);

  const { fetchCSVData } = useFetch();

  const data = JSON.parse(localStorage.getItem("Transactions") as string);

  function showTransactionModal() {
    if (!transactionDialog.current) {
      return;
    }
    transactionDialog?.current.showModal();

  }
  function showAddTransactionModal() {
    if (!AddTransactionRef.current) {
      return;
    }
    AddTransactionRef?.current.showModal();
  }


  function closeModal() {
    if (!transactionDialog.current) {
      return;
    }
    transactionDialog?.current.close();
  }

  function closeAddModal() {
    if (!AddTransactionRef.current) {
      return;
    }
    AddTransactionRef?.current.close();
  }

  function resetValues() {
    setValues(JSON.parse(localStorage.getItem("Transactions") as string))
  }

  useEffect(() => {
    const data = localStorage.getItem("Transactions");
    if (!data) {
      fetchCSVData(process.env.PUBLIC_URL + "Tansactions.csv", (data) => {
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
    } else {
      const transData = JSON.parse(data);
      setValues(transData);
      const uniqueTypes = [...new Set(transData?.map((val: ITransaction) => val.type))];
      const uniqueCategory = [...new Set(transData?.map((val: ITransaction) => val.category))];
      const uniqueCurrency = [...new Set(transData?.map((val: ITransaction) => val.currency))];
      setTypes(uniqueTypes as string[]);
      setCategorys(uniqueCategory as string[]);
      setCurrencys(uniqueCurrency as string[]);
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!titleRef.current) {
      console.log("Some Problem");
      return;
    }
    const title = titleRef?.current.value as string;
    const titleData = data?.filter((val: ITransaction) => val.title === title);
    titleRef.current.value = "";

    setValues(titleData);
  }

  function changeSelectHandler(e: FormEvent, keyword: string) {
    let targetData;
    if (keyword === 'type') {
      targetData = data?.filter((val: ITransaction) => val.type === (e.target as HTMLSelectElement).value);
    } else if (keyword === 'category') {
      targetData = data?.filter((val: ITransaction) => val.category === (e.target as HTMLSelectElement).value);
    } else if (keyword === 'currency') {
      targetData = data?.filter((val: ITransaction) => val.currency === (e.target as HTMLSelectElement).value);
    }
    console.log(targetData);
    setValues(targetData);
  }

  return (
    <>
      <TransactionModal data={selectedData as ITransaction} currencys={currencys as string[]} handlerfn={resetValues} close={closeModal} ref={transactionDialog} />
      <AddTransactionModal types={types as string[]} categorys={categorys as string[]} currencys={currencys as string[]} handlerfn={resetValues} close={closeAddModal} ref={AddTransactionRef} />
      <div className="flex flex-col tablet:flex-row gap-3 bg-grayish-white dark:bg-dark-gray w-full">
        <form
          className="tablet:w-1/4 w-full h-fit tablet:h-screen mt-4 p-4 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
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
            <TransactionFilter handlerfn={changeSelectHandler} field="type" data={types as string[]} />
          </div>
          <div>
            <TransactionFilter handlerfn={changeSelectHandler} field="category" data={categorys as string[]} />
          </div>
          <div>
            <TransactionFilter handlerfn={changeSelectHandler} field="currency" data={currencys as string[]} />
          </div>
          <button
            type="button"
            className="p-3 bg-dark-blue text-white text-lg font-poppins"
            onClick={showAddTransactionModal}
          >
            Add Transaction
          </button>
        </form>
        <div className="w-full p-10 grid grid-cols-1 tablet:grid-cols-2 desktop-sm:grid-cols-3 gap-5">
          {values?.map((val, index) => (
            <Transaction
              key={index}
              no={val._id as number}
              type={val.type}
              category={val.category}
              title={val.title}
              setterfn={setSelectedData}
              show={showTransactionModal}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AllTransactions
