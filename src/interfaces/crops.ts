export interface ICrops {
  year: number;
  minProd: number;
  maxProd: number;
  minProdCropName: string;
  maxProdCropName: string;
}

export interface IAgricultureData {
  ["Country"]: string;
  ["Year"]: string;
  ["Crop Name"]: string;
  ["Crop Production (UOM:t(Tonnes))"]: any;
  ["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]: any;
  ["Area Under Cultivation (UOM:Ha(Hectares))"]: any;
}
