import { AxiosPromise } from 'axios';
import { AxiosVue } from '@/AxiosVue';
import { ServicioProxy } from '@/config/enums';

type CrearInformeoHttpResponseBody = unknown;
type DataInformeNuevo = {
  report_type: string;
  date_created: string;
  user: string;
  client?: string;
  starting_date: string;
  starting_hour: string;
  ending_date?: string;
  ending_hour: string;
  vehicles: number;
  hidden_columns?: any;
  trustworthy: boolean;
  activities_types_list: any;
  summary: boolean;
  day_grouping: boolean;
  zones: any;
  all_events: boolean;
  minimum_detention_time: number;
  maintenance_plans: any;
  speed_limit: number;
};

const axios = new AxiosVue(ServicioProxy.Metabase);

const makeHttpRequest = (
  dataInforme: any,
  extension: string
): AxiosPromise<CrearInformeoHttpResponseBody> => {
  const params: DataInformeNuevo = {
    ...dataInforme,
  };
  switch (params.report_type) {
    case 'actividades': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'alertas': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'sitios': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'detalle_viaje': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'consolidado_mensual': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'velocidad_sitios': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'kilometraje': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'detencion': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'exceso_velocidad': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'ultima_actividad': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'consolidado_pelambres': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'estado_mantenimiento': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'horometro': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    case 'odometro': {
      return axios.http.post(
        `Metabase/PostgenericB/reports/get_limit/` + extension + '/1',
        params
      );
    }
    // case 'kilometraje': {
    //   return axios.http.post(`Metabase/PostgenericB/reports/get_limit/` + extension +"/1", params);
    // }
    default: {
      return axios.http.post('metabase/ReporteTime/' + extension, params);
    }
  }
};

export const postReporteTime = (dataInforme: any, extension: string) =>
  makeHttpRequest(dataInforme, extension).then();
