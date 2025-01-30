import React, { useCallback, useEffect, useState } from 'react';
import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableSortLabel } from '@mui/material';
import moment from 'moment';

interface DataProps {
  data: any[];
}

interface TableDataType {
  weekEnding: string;
  retailSales: number;
  retailerMargin: number;
  unitsSold: number;
  wholesaleSales: number;
}

interface sortProps {
  id: string;
  desc: boolean;
}

const DataComponent: React.FC<DataProps> = ({ data }) => {
  
  const [ tableData, setTableData ] = useState<TableDataType[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sorting, setSorting] = useState<sortProps>(
    { id: "weekEnding", desc: true },
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isDesc = sorting?.id === property && sorting?.desc;
    setSorting({id: property, desc: !isDesc});
  };

  const sortedData = [...tableData].sort((a: any, b: any) => {
    const { id, desc } = sorting;
    
    if (id === 'weekEnding') {
      return desc ? b[id].valueOf() - a[id].valueOf() : a[id].valueOf() - b[id].valueOf();
    } else {
      return desc ? b[id] - a[id] : a[id] - b[id];
    }
  });

  useEffect(() => {
    console.log(data)
    if (data != null && data.length > 0) {
      setTableData(data[0].sales)
    } else setTableData([])
  }, [data])

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        User Data Table
      </Typography>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sorting.id === 'weekEnding'}
                  direction={sorting.id === 'weekEnding' ? (sorting.desc ? 'desc' : 'asc') : 'asc'}
                  onClick={() => handleRequestSort('weekEnding')}
                >
                  Week Ending
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sorting.id === 'retailSales'}
                  direction={sorting.id === 'retailSales' ? (sorting.desc ? 'desc' : 'asc') : 'asc'}
                  onClick={() => handleRequestSort('retailSales')}
                >
                  Retail Sales
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sorting.id === 'wholesaleSales'}
                  direction={sorting.id === 'wholesaleSales' ? (sorting.desc ? 'desc' : 'asc') : 'asc'}
                  onClick={() => handleRequestSort('wholesaleSales')}
                >
                Wholesale Sales
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sorting.id === 'unitsSold'}
                  direction={sorting.id === 'unitsSold' ? (sorting.desc ? 'desc' : 'asc') : 'asc'}
                  onClick={() => handleRequestSort('unitsSold')}
                >
                Units Sold
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sorting.id === 'retailerMargin'}
                  direction={sorting.id === 'retailerMargin' ? (sorting.desc ? 'desc' : 'asc') : 'asc'}
                  onClick={() => handleRequestSort('retailerMargin')}
                >
                Retailer Margin
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedData && sortedData?.length > 0 && sortedData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: TableDataType, index: number) => (
              <TableRow key={'sale_' + index}>
                <TableCell>{moment(row.weekEnding).format('MM-DD-YY')}</TableCell>
                <TableCell>{Number(row.retailSales).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</TableCell>
                <TableCell>{Number(row.wholesaleSales).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</TableCell>
                <TableCell>{row.unitsSold}</TableCell>
                <TableCell>{Number(row.retailerMargin).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {tableData && tableData.length > 0 &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }
    </Paper>
    </div>
  );
};

export default DataComponent;
