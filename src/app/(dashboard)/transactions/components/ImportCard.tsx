import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import ImportTable from "./ImportTable"
import { convertAmountToMilliunits } from "@/lib/utils"
import { format, parse } from "date-fns"

const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputDateFormat = "yyyy-MM-dd"

const requiredOpts = ["Date", "Amount", "payee"]

interface SelectedColumnState {
   [key: string]: string | null
}

type Props = {
   data: string[][]
   onCancel: () => void
   onSubmit: (data: any) => void
}

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
   const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
      {}
   )

   const headers = data[0]
   const body = data.slice(1)

   const onTableHeaderSelectChange = (
      columnIndex: number,
      value: string | null
   ) => {
      setSelectedColumns((prev) => {
         const newSelectedColumns = { ...prev }

         for (const key in newSelectedColumns) {
            if (newSelectedColumns[key] === value) {
               newSelectedColumns[key] = null
            }
         }

         if (value === "skip") {
            value = null
         }

         newSelectedColumns[`column_${columnIndex}`] = value
         return newSelectedColumns
      })
   }

   const progress = Object.values(selectedColumns).filter(Boolean).length

   const handleContinue = () => {
      const getColumnIndex = (column: string) => {
         return column.split("_")[1]
      }

      const mappedData = {
         headers: headers.map((_header, index) => {
            const columnIndex = getColumnIndex(`column_${index}`)
            return selectedColumns[`column_${columnIndex}`] || null
         }),
         body: body
            .map((row) => {
               const transformedRow = row.map((cell, index) => {
                  const columnIndex = getColumnIndex(`column_${index}`)
                  return selectedColumns[`column_${columnIndex}`] ? cell : null
               })

               return transformedRow.every((item) => item === null)
                  ? []
                  : transformedRow
            })
            .filter((row) => row.length > 0),
      }

      const arrayOfData = mappedData.body.map((row) => {
         return row.reduce((acc: any, cell, index) => {
            const headers = mappedData.headers[index]
            if (headers !== null) {
               acc[headers] = cell
            }
            return acc
         }, {})
      })

      const formattedData = arrayOfData.map((item) => ({
         ...item,
         amount: convertAmountToMilliunits(parseFloat(item.amount)),
         date: format(
            parse(item.date, dateFormat, new Date()),
            outputDateFormat
         ),
      }))

      onSubmit(formattedData)
   }

   return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
         <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
               <CardTitle className="text-xl line-clamp-1">
                  Import Transactions
               </CardTitle>
               <div className="flex flex-col lg:flex-row lg:items-end lg:justify-end items-center gap-2">
                  <Button
                     size={"sm"}
                     variant={"secondary"}
                     onClick={onCancel}
                     className="w-full lg:w-auto"
                  >
                     Cancel
                  </Button>
                  <Button
                     size={"sm"}
                     onClick={handleContinue}
                     className="w-full lg:w-auto"
                     disabled={progress < requiredOpts.length}
                  >
                     Continue ({progress}/{requiredOpts.length})
                  </Button>
               </div>
            </CardHeader>
            <CardContent>
               <ImportTable
                  headers={headers}
                  body={body}
                  selectedColumns={selectedColumns}
                  onTableHeaderSelectChange={onTableHeaderSelectChange}
               />
            </CardContent>
         </Card>
      </div>
   )
}

export default ImportCard
