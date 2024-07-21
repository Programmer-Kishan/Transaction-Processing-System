import { ITransaction } from "../../@types/TransactionData";

interface TransactionProps {
    no: number
    type: string,
    category: string,
    title: string,
    setterfn: (data: ITransaction) => void,
    show: () => void
}

const Transaction = ({no, type, category, title, setterfn, show} : TransactionProps) => {

  function handleClick() {
    const data = JSON.parse(localStorage.getItem("Transactions") as string);
    setterfn(data[+no-1]);
    show();
  }

  return (
    <div className="p-5 border-2 border-black rounded-xl flex flex-col gap-7">
      <h3 className="font-montserrat text-xl text-dark-blue font-medium">Transaction Number: {no}</h3>
      <h1 className="font-montserrat text-3xl font-bold">{title} - {category}</h1>
      <p className="font-poppins text-2xl font-normal">Type of Transaction: {type}</p>
      <button 
        className="mt-auto text-right text-mat-blue font-roboto font-semibold hover:tracking-wide transition-all"
        onClick={handleClick}
      >
        View details
      </button>
    </div>
  )
}

export default Transaction
