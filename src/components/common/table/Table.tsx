import React from "react";
import { Table, Box } from "@mantine/core";

interface IProps {
  data: any;
  headerData: {
    title: string;
    key: string;
  }[];
}

const CommonTable: React.FC<IProps> = ({ data, headerData }) => {
  return (
    <Box>
      <Table border={1} borderColor="gray" withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {headerData.map((item, index) => (
              <Table.Th key={`${index}-${item.key}`}>{item.title}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item: any, index: number) => (
            <Table.Tr key={index}>
              {headerData.map((headerItem, headerIndex) => (
                <Table.Td key={`${headerIndex}-${headerItem.key}`} align="center">
                  {item[headerItem.key]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default CommonTable;
