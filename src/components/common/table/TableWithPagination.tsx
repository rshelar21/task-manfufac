import React, { useEffect, useState } from "react";
import { Pagination, Text, Box, Flex } from "@mantine/core";
import Table from "./Table";

interface IProps {
  data: any;
  headerData: {
    title: string;
    key: string;
  }[];
}

let chunkedData: any;
const TableWithPagination: React.FC<IProps> = ({ data, headerData }) => {
  const [activePage, setPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [totalTableLength, setTotalTableLength] = useState(0);

  function chunk(array: any, size: number): any {
    if (!array.length) {
      return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
  }

  useEffect(() => {
    if (data.length) {
      chunkedData = chunk(data, 10);
      setTableData(chunkedData[activePage - 1]);
      setTotalTableLength(chunkedData?.length);
    }
  }, [data, activePage]);
  return (
    <Flex w="100%" maw={750} direction="column" align="center">
      <Table data={tableData} headerData={headerData} />
      <Pagination
        total={totalTableLength}
        value={activePage}
        onChange={setPage}
        mt="lg"
      />
    </Flex>
  );
};

export default TableWithPagination;
