export interface ITransaction {
    _id?: number
    dateTime: string
    amount: number
    type: string
    category: string
    title: string
    currency: string
    note: string
}