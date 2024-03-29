import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FormEvent, useState, useEffect} from "react";

export interface User {
    id: number
    firstName: string
    lastName: number
    dob: string 
    gender: string
    email: string
}
const columnsHelper = createColumnHelper<User>()

const columns = [
    columnsHelper.accessor("id", {
        header: () => "ID",
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("firstName", {
        header: () => "FirstName",
        cell: (info) => info.getValue(),
    }),
    columnsHelper.accessor("lastName", {
        header: () => "lastName",
        cell: (info) => info.getValue(),
    }),

    columnsHelper.accessor("dob", {
        header: () => "Dob", 
        cell: (info) => {
            const dob =info.getValue();
            const formatDob = new Date(dob).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            }) 
            return formatDob; 
        },
    }),

    columnsHelper.accessor("gender", {
        header: () => "Gender",
        cell: (info) => info.getValue()
    }),
    columnsHelper.accessor("email", { 
        header: () => "Email",
        cell: (info) => info.getValue()
    })

]

const UsersTable = () => {
    const [searchValue, setSearchValue] = useState("")
    const [inputSearchValue, setInputSearchValue] = useState("")
    const [users, setUsers] = useState([])
    
    const submitSearchForm = (e: FormEvent) => {
        e.preventDefault()
        setSearchValue(inputSearchValue)
    }
    
    const table = useReactTable({
        data: users,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel()
    })

    useEffect(() => { 
        const url = `https://66030b8d2393662c31ce6ffe.mockapi.io/api/v1/react-table?lastName=${searchValue}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => setUsers(data))
    }, [searchValue])

    return (
        <div>
            <form onSubmit={submitSearchForm}>
                <input type="text" placeholder="Search..." value={inputSearchValue} onChange={(e) => setInputSearchValue(e.target.value)} />
            </form>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                                </th>
                            ))}
                        </tr>
                    ))}

                </thead>
                <tbody>
               {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>
                                <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                            </td>
                        ))}
                    </tr>
                )
               )}
                </tbody>
            </table>
        </div>
    )
}
export default UsersTable;

