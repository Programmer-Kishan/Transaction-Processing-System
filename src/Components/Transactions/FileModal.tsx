import { FormEvent, forwardRef } from 'react'
import Papa from 'papaparse';
import { ITransaction } from '../../@types/TransactionData';

interface FileModalProps {
    close: () => void,
    resetValues: () => void,
    typeHandler: (data: string[]) => void,
    categoryHandler: (data: string[]) => void,
    currencyHandler: (data: string[]) => void,
}

const FileModal = forwardRef<HTMLDialogElement, FileModalProps>(({ close, resetValues,typeHandler,categoryHandler,currencyHandler }, ref) => {

    function handleFileUpload(e: FormEvent) {
        console.log((e.target as HTMLFormElement).files[0]);
        Papa.parse((e.target as HTMLFormElement).files[0], {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
                const temp = results.data.map((val, ind) => ({ ...(val as ITransaction), "_id": ind + 1 }))
                localStorage.setItem("Transactions", JSON.stringify(temp));
                const uniqueTypes = [...new Set(temp?.map((val: ITransaction) => val.type))];
                const uniqueCategory = [...new Set(temp?.map((val: ITransaction) => val.category))];
                const uniqueCurrency = [...new Set(temp?.map((val: ITransaction) => val.currency))];
                typeHandler(uniqueTypes as string[]);
                categoryHandler(uniqueCategory as string[]);
                currencyHandler(uniqueCurrency as string[]);
                resetValues();
                close();
            },
        });
    }

    return (
        <dialog ref={ref} className="mini-tab:w-3/5 w-full bg-white rounded-xl px-10 py-5">
            <div className="flex items-center justify-center w-full">
                <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileUpload}
                />
                <label
                    htmlFor="fileInput"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-mat-blue hover:bg-mat-blue/80 rounded-md"
                >
                    Choose a file
                </label>
            </div>    </dialog>
    )
})

export default FileModal
