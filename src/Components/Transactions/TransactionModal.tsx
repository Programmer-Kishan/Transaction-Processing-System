import { forwardRef } from "react"
import { ITransaction } from "../../@types/TransactionData"

interface TransactionModalProps {
    data: ITransaction
}

const TransactionModal = forwardRef<HTMLDialogElement, TransactionModalProps>(({data}, ref) => {
  return (
    <dialog ref={ref}>
      Date create: {data?.dateTime}
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  )
})

export default TransactionModal
