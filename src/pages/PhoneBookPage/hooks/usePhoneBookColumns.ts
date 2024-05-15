import {useMemo} from "react";
import {MRT_ColumnDef} from "mantine-react-table";
import {Contact} from "../types/phoneBookTypes.ts";

export function usePhoneBookColumns() {
    const columns = useMemo<MRT_ColumnDef<Contact>[]>(
        () => [
            {
                accessorKey: 'surname',
                header: 'Фамилия',
                enableColumnActions: false,
                enableSorting: false,
            },
            {
                accessorKey: 'address',
                header: 'Адрес',
                enableColumnActions: false,
                enableSorting: false,
            },
            {
                accessorKey: 'phone',
                header: 'Телефон',
                enableColumnActions: false,
                enableSorting: false,
            },
            {
                accessorKey: 'details',
                header: 'Детали',
                enableColumnActions: false,
                enableSorting: false,
            },
        ],
        [],
    );
    return {columns};
}