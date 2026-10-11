import {
  tableFeatures,
  useTable,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";

export const features = tableFeatures({});

type DataTableProps<TData extends RowData> = {
  data: TData[];
  columns: ColumnDef<typeof features, TData>[];
  tableWrapperClassName?: string;
  tableClassName?: string;
};

export default function Table<TData extends RowData>({
  columns,
  data,
  tableWrapperClassName = "overflow-x-auto",
  tableClassName = "",
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    data,
    columns,
  });

  const rows = table.getRowModel().rows;

  return (
    <div className={`w-full rounded-xl custom-scroll ${tableWrapperClassName}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden rounded-xl border border-white/5">
          <table
            dir="rtl"
            className={`w-full min-w-200 text-center text-(--text-primary) ${tableClassName}`}
          >
            <thead className="bg-(--bg-table-header)">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap text-(--text-primary) px-1 md:px-2 py-4 text-xs md:text-sm font-bold"
                    >
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-b-(--border-color) bg-(--bg-table-row) duration-300 hover:bg-(--bg-table-header)/40"
                  >
                    {row.getAllCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="whitespace-normal text-(--text-primary) px-1 md:px-2 py-2 md:py-3  text-xs md:text-sm font-normal"
                      >
                        <table.FlexRender cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllLeafColumns().length}
                    className="px-4 py-8 text-sm"
                  >
                    <div className="bg-amber-50 border border-amber-300 rounded-lg py-4 font-medium">
                      داده‌ای برای نمایش وجود ندارد!
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
