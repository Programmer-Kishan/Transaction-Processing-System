import { FormEvent, forwardRef, useState } from 'react'

interface AddTransactionProps {
    types: string[],
    categorys: string[],
    currencys: string[],
    handlerfn: () => void,
    close: () => void
}

const AddTransactionModal = forwardRef<HTMLDialogElement, AddTransactionProps>(({types, categorys, currencys, handlerfn, close}, ref) => {

    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        
        setError(null);

        const fd = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(fd.entries());

        if (data.category === "Select Category" || data.currency === "Select Currency" || data.type === "Select Type") {
            setError("Form won't submit until you fill the category, currency and type fields");
            return ;
        }

        const transactionData = JSON.parse(localStorage.getItem("Transactions") as string);

        const len = transactionData.length;
        transactionData.push({...data, "_id": len+1})
        localStorage.setItem("Transactions", JSON.stringify(transactionData))
        handlerfn();

        console.log(data);

        close()
    }

  return (
    <dialog ref={ref} className="mini-tab:w-3/5 w-full bg-white rounded-xl px-10 py-5">
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <h3 className='font-roboto text-2xl font-semibold'>Enter Transaction details</h3>
            <div className='w-full font-poppins text-xl'>
                <label htmlFor="date">Enter Date: </label>
                <input type="date" id='date' name='dateTime' required />
            </div>
            <div className='w-full font-poppins text-xl'>
                <label htmlFor="title">Enter Title: </label>
                <input type="text" id='title' name='title' required className='w-full border-2 border-black' />
            </div>
            <div className='w-full font-poppins text-xl grid grid-cols-1 desktop-sm:grid-cols-2 gap-4'>
                <select name="type" id="type" className='border-2 border-black' required>
                    <option>Select Type</option>
                    {types?.map(type => <option key={Math.random()} value={type}>{type}</option>)}
                </select>
                <select name="category" id="category" className='border-2 border-black' required={true}>
                    <option>Select Category</option>
                    {categorys?.map(category => <option key={Math.random()} value={category}>{category}</option>)}
                </select>
            </div>
            <div className='w-full font-poppins text-xl grid grid-cols-1 desktop-sm:grid-cols-2 gap-5'>
                <div>
                    <label htmlFor="amount">Enter Amount: </label>
                    <input type="number" id='amount' name='amount' step={0.01} className='w-full border-2 border-black' required/>
                </div>
                <select name="currency" id="currency" className='border-2 border-black' required>
                    <option>Select Currency</option>
                    {currencys?.map(currency => <option key={Math.random()} value={currency}>{currency}</option>)}
                </select>
            </div>
            <div className='w-full font-poppins text-xl'>
                <label htmlFor="note">Enter Note:</label>
                <textarea required className='w-full border-2 border-black' name="note" id="note"></textarea>
            </div>
            {error && <p className='font-roboto text-lg text-red-600'>{error}</p>}
            <button type="submit" className="bg-whiteish-blue p-3 mb-2 font-poppins font-semibold">Add</button>
        </form>
      <form method="dialog">
        <button className="bg-mat-blue p-3 rounded-md font-bold text-lg hover:bg-mat-blue/85">Close</button>
      </form>
    </dialog>
  )
})

export default AddTransactionModal
