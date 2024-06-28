import React, { useState, useEffect } from "react";
import { Box, Flex } from "@mantine/core";
import { agricultureData } from "./data/index";
import { ICrops, IAgricultureData } from "./interfaces/crops";
import TableWithPagination from "./components/common/table/TableWithPagination";

let objNew = {};

function App() {
  const [cropProductionData, setCropProductionData] = useState<
    Partial<ICrops[]>
  >([]);
  const [cropDetails, setCropDetails] = useState<
    {
      crop: string;
      yeildOfCrops: string;
      areaofCultivation: string;
    }[]
  >([]);

  const handleGetCropDetails = (agricultureData: IAgricultureData[]) => {
    let maxProdCropName = "";
    let minProdCropName = "";
    let year_value = Number(agricultureData[0]["Year"].split(", ")[1]);
    let minProd = agricultureData[0]["Crop Production (UOM:t(Tonnes))"] || 0;
    let maxProd = agricultureData[0]["Crop Production (UOM:t(Tonnes))"] || 0;
    let avgCropData: any = {};
    const productionData = agricultureData
      ?.map((item, index) => {
        if (avgCropData[item["Crop Name"]]) {
          avgCropData[item["Crop Name"]] = {
            yeildOfCrops:
            avgCropData[item["Crop Name"]]?.yeildOfCrops +
              Number(
                item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0
              ),
            areaofCultivation:
            avgCropData[item["Crop Name"]]?.areaofCultivation +
              Number(item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0),
          };
        } else {
          avgCropData[item["Crop Name"]] = {
            yeildOfCrops: Number(
              item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0
            ),
            areaofCultivation: Number(
              item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0
            ),
          };
        }

        if (year_value >= Number(item.Year.split(", ")[1])) {
          if (item["Crop Production (UOM:t(Tonnes))"]) {
            if (item["Crop Production (UOM:t(Tonnes))"] > maxProd) {
              maxProd = item["Crop Production (UOM:t(Tonnes))"];
              maxProdCropName = item["Crop Name"];
            } else if (item["Crop Production (UOM:t(Tonnes))"] <= minProd) {
              minProd = item["Crop Production (UOM:t(Tonnes))"];
              minProdCropName = item["Crop Name"];
            }
          } else {
            minProd = item["Crop Production (UOM:t(Tonnes))"] || 0;
            minProdCropName = item["Crop Name"];
          }
          objNew = {
            ...objNew,
            year: year_value,
            minProd: minProd,
            maxProd: maxProd,
            minProdCropName: minProdCropName,
            maxProdCropName: maxProdCropName,
          };
          if (
            year_value <
              Number(agricultureData[index + 1]?.Year.split(", ")[1]) ||
            index === agricultureData.length - 1
          ) {
            return objNew;
          }
        } else {
          year_value = Number(item.Year.split(", ")[1]);
          minProd = item["Crop Production (UOM:t(Tonnes))"] || 0;
          maxProd = item["Crop Production (UOM:t(Tonnes))"] || 0;
          maxProdCropName = item["Crop Name"];
          minProdCropName = item["Crop Name"];
        }
      })
      .filter(Boolean);
    return {
      productionData,
      avgCropData,
    };
  };

  useEffect(() => {
    if (agricultureData) {
      const res: any = handleGetCropDetails(agricultureData);
      if (res) {
        console.log(res, 'res');
        const data = Object.keys(res?.avgCropData).map((key) => {
          return {
            crop: key,
            yeildOfCrops: Number(
              res.avgCropData[key].yeildOfCrops.toFixed(3) / res.productionData.length
            ).toFixed(3),
            areaofCultivation: Number(
              res.avgCropData[key].areaofCultivation.toFixed(3) / res.productionData.length
            ).toFixed(3),
          };
        });
        setCropProductionData(res?.productionData);
        setCropDetails(data);
      }
    }
  }, [agricultureData]);

  return (
    <Box w="100%" h="100%" py="100px">
      <Flex w="100%" direction="column" align="center" gap="80px">
        <TableWithPagination
          data={cropProductionData}
          headerData={[
            { key: "year", title: "Year" },
            {
              key: "maxProdCropName",
              title: "Crop with Maximum Production in that Year",
            },
            {
              key: "minProdCropName",
              title: "Crop with Minimum Production in that Year",
            },
          ]}
        />
        <TableWithPagination
          data={cropDetails}
          headerData={[
            {
              key: "crop",
              title: "Crop",
            },
            {
              key: "yeildOfCrops",
              title: "Average Yield of the Crop between 1950-2020",
            },
            {
              key: "areaofCultivation",
              title: "Average Cultivation Area of the Crop between 1950-2020",
            },
          ]}
        />
      </Flex>
    </Box>
  );
}

export default App;
