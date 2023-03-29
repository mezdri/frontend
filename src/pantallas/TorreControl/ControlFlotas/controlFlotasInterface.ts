export interface ControlFlotasInterface {
  cod_flota: string; // "9763",
  __nom_flota: string; // "Pascual Pizarro",
}

export interface ControlVehiculosInterface {
  cod_vehiculo: string;
  patente_vehiculo: string;
  color: string;
  avl: string;
  activo: string;
  colorIndices: {
    red: number[];
    green: number[];
    yellow: number[];
  };
}

export interface HexagonCellData {
  cod_vehiculo: string;
  patente_vehiculo: string;
  color: string;
  avl: string;
  activo: string;
  colorIndices: {
    red: number[];
    green: number[];
    yellow: number[];
  };
}

export interface HexagonCellObj {
  index: number;
  row: number;
  col: number;
  hexagonClass: string | undefined;
  borderSize: number | undefined;
  borderColor: string | undefined;
  backgroundColor: string | undefined;
  backgroundImage: string | undefined;
  text: string | undefined;
  textStyle: object | undefined;
  data: HexagonCellData;
}
