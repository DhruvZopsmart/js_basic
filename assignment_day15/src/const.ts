// enums
export enum statuses {
    incomplete = 'INCOMPLETE',
    inprogress = 'INPORGRESS',
    completed = 'COMPLETED'
}

export interface ITodo {
    title: string,
    id: string,
    status: statuses,
    createdDate: Date,
    updatedAt: Date
}
export enum requestMethods{
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}