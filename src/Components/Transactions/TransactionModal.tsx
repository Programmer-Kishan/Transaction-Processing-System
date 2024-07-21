import { FormEvent, forwardRef, useState } from "react"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { ITransaction } from "../../@types/TransactionData"

interface TransactionModalProps {
    data: ITransaction,
    currencys: string[],
    handlerfn: () => void,
    close: () => void,
}

const TransactionModal = forwardRef<HTMLDialogElement, TransactionModalProps>(({data, currencys, handlerfn, close}, ref) => {

  const [isEdit, setIsEdit] = useState<boolean>(false);
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const fd = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(fd.entries());
    // console.log(data.dateTime);
    const [y, m, d] = (formData.dateTime as string).split('-');
    const currentDate = new Date();
    const targetDate = new Date(+y, +m-1, +d, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
    // targetDate = (targetDate as string).replace("/", "-")
    const targetDateString = targetDate.toLocaleString().replace(/\//g, '-').replace(",", "");
    console.log(targetDateString);

    formData['dateTime'] = targetDateString;

    const transactionData = JSON.parse(localStorage.getItem("Transactions") as string);
    transactionData[(data?._id as number) - 1] = {...formData, "_id": data?._id};
    console.log(transactionData[(data?._id as number) - 1]);
    localStorage.setItem("Transactions", JSON.stringify(transactionData));
    handlerfn();

    console.log("Saved Data");
    console.log(data);

    setIsEdit(false);

    close();
  }

  function deletTransaction() {
    const transactionData = JSON.parse(localStorage.getItem("Transactions") as string);
    const newTransactionData = transactionData.filter((transaction: ITransaction) => transaction._id !== +(data._id as number))
    localStorage.setItem("Transactions", JSON.stringify(newTransactionData));
    handlerfn();
    setIsEdit(false);
    close();
  }

  return (
    <dialog ref={ref} className="mini-tab:w-3/5 w-full bg-white rounded-xl px-10 py-5">
        <div className="w-full flex justify-end gap-6">
          <button 
            className="p-2 bg-mat-blue rounded-full cursor-pointer"
            onClick={() => setIsEdit(true)}
          >
            <FaEdit className="text-2xl"/>
          </button>
          <div 
            className="p-2 bg-red-700 rounded-full cursor-pointer"
            onClick={deletTransaction}
          >
            <MdDeleteForever className="text-2xl"/>
          </div>
        </div>
        <form className="w-full flex flex-col gap-6 my-5" onSubmit={handleSubmit}>
            <h3 className="font-poppins text-lg">
              Date create: {!isEdit ? data?.dateTime : <input type="date" name="dateTime" defaultValue={data?.dateTime.slice(0, 10)}/>}
            </h3>
            <h1 className="font-montserrat font-extrabold text-2xl">
              Title: {!isEdit ? data?.title : <input type="text" name="title" defaultValue={data?.title} className="text-gray-400 italic"/>}
            </h1>
            <h2 className="font-poppins text-xl font-semibold">
              Category: {!isEdit ? data?.category : <input type="text" name="category" defaultValue={data?.category} className="text-gray-400 italic" />}
            </h2>
            <h2 className="font-poppins text-xl font-semibold">
              Type: {!isEdit ? data?.type : <input type="text" name="type" defaultValue={data?.type} className="text-gray-400 italic" />}
            </h2>
            <h1 className="font-montserrat font-extrabold text-2xl">
              Amount: {!isEdit ? `${data?.amount} ${data?.currency}` : 
                <>
                  <input type="number" step={0.01} name="amount" defaultValue={data?.amount} className="text-gray-400 italic" />
                  <select name="currency">
                    {currencys.map(currency => <option value={currency}>{currency}</option>)}
                  </select>
                </>
              }
            </h1>
            <p className="font-poppins text-lg">Note: {!isEdit ? data?.note : <textarea name="note" className="w-full text-gray-400 italic" defaultValue={data?.note} />}</p>
            {isEdit && <button type="submit" className="bg-whiteish-blue p-3 font-poppins font-semibold">Save</button>}
        </form>
      <form method="dialog">
        <button className="bg-mat-blue p-3 rounded-md font-bold text-lg hover:bg-mat-blue/85">Close</button>
      </form>
    </dialog>
  )
})

export default TransactionModal
