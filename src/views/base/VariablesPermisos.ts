import { Accion } from './ComponenteBase';
export enum CodigoAccion {
  Consultar = 1,
  Crear = 2,
  Editar = 3,
  VerDetalle = 4,
  Eliminar = 5,
  Exportar = 6,
  CorteIgnicion = 7,
  Indicadores = 8,
  RepetirDia = 9,
  Desbloquear = 13,
  Cancelar = 48,
  Aceptar = 14,
  Rechazar = 16,
  DejarDeRecibir = 15,
  DejarDeCompartir = 17,
  AsociarRol = 10,
  AsociarUsuario = 11,
  AsociarCliente = 12,
  AgruparConductor = 18,
  AsociarFlota = 24,
  AsociarEtiqueta = 39,
  GenerarAsociarFlotasEtiquetasVehículos = 43,
  GenerarGenerarInforme = 44,
  GenerarInformaciónGeneral = 45,
  Compartir = 47,
  Importar = 50,
  Comunicaciones = 51,
  TrazarRutaInferida = 52,
  Descargar = 72,
  CambiarPassword = 88,
  Enviar = 90,
  detallesDashboard = 92,
  VerPdf = 89,
  VerReferencia = 91,
  EnviarComando = 95,
}

export type AccionesUsuario = {
  clienteId?: number;
  perfilId?: number;
  moduloCodigo?: number;
  moduloNombre?: string;
  accionCodigo?: number;
  nombreAccion?: string;
  subAcciones?: SubAccion;
};

export type SubAccion = {
  CodigoAccionPadre: number;
  nombreAccionPadre: string;
  CodigoSubAccion?: number;
  NombreSubAccion?: string;
};

export type PermisoAccion = {
  accionCodigo: number;
  visible?: boolean;
  moduloCodigo?: number;
};

// Revisar codigo BD Accion
export const codigoAccionesMenuItem = {
  accionEditar: 3,
  accionVerDetalle: 4,
  accionCodigoEliminar: 5,
  accionDesbloquear: 13,
  accionAceptar: 14,
  accionDejarDeRecibir: 15,
  accionRechazar: 16,
  accionDejarDeCompartir: 17,
  accionCancelar: 48,
  accionDescargar: 72,
  accionCambiarPassword: 88,
  accionEnviarComando: 95,
};
