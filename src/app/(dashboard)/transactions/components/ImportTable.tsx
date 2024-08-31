import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import TableHeadSelect from "./TableHeadSelect"

type Props = {
   headers: string[]
   body: string[][]
   selectedColumns: Record<string, string | null>
   onTableHeaderSelectChange: (
      columnIndex: number,
      value: string | null
   ) => void
}

const ImportTable = ({
   body,
   headers,
   onTableHeaderSelectChange,
   selectedColumns,
}: Props) => {
   return (
      <div className="rounded-md border overflow-hidden">
         <Table>
            <TableHeader className="bg-muted">
               <TableRow>
                  {headers.map((_item, index) => (
                     <TableHead key={index}>
                        <TableHeadSelect
                           columnIndex={index}
                           selectedColumns={selectedColumns}
                           onChange={onTableHeaderSelectChange}
                        />
                     </TableHead>
                  ))}
               </TableRow>
            </TableHeader>
            <TableBody>
               {body.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                     {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default ImportTable
