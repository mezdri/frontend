import { Vehiculo } from '@/pantallas/Inicio/VehiculosData/fetchVehiculos';
import { RepetirDia } from './../RepetirDiaData/fetchRepetirDia';
import { TipoGeometria } from './../../../config/enums';
import { IZona } from './../../../interfaces/Zonas';
import { AxiosVue } from './../../../AxiosVue';
import RepetirDiaFuncionalidades from '@/pantallas/Inicio/RepetirDiaData/serviciosRepetirDia';

export type Zona = {
  drawingManager: google.maps.drawing.DrawingManager;
  mapType: any;
  zoom: any;
  controllerTipoLugar: string;
  controllerCoordenada: string;
  controllerGpsCoordenada: string;
  capasDeInformacion: any;
  capasSeleccionadas: any;
  lugares: any;
  selectedCapas: any;
  tipoMapa: any;
  selected: any;
  menu: boolean;
  drawingToolBar: boolean;
  showCrearZona: boolean;
  showEditarZona: boolean;
  modalEsEdicion: boolean;
  editedItem: IZona;
  axios: AxiosVue;
  enabledBtnContinue: boolean;
  tipoGeometriaModal: TipoGeometria;
  strCoordsModal: string;
  dialogErrorAsoc: Boolean;
  editedName: String;
  dialogEliminar: Boolean;
  editedIndex: number;
  editedCapaId: number;
  titleEliminarItem: any;
  mensajeConfirmacionIndividual: any;
  mensajeExitoEliminacion: any;
  mensajeErrorEliminacion: any;
  autocompleteText: string;
  marcadorBuscador: any;
  overlay: any;
  overlaybkp: any;
  hidden: any;
  markerZona: google.maps.Marker[];
  circles: google.maps.Circle[];
  polylines: google.maps.Polyline[];
  infoWindowsZonas: google.maps.InfoWindow[];
  mapEventListenerList: google.maps.MapsEventListener[];
  loadMapaTs: boolean;
  windowHeight: any;
  cantidadVehiculosAsociados: number;
  directionsService: google.maps.DirectionsService;
  directionsDisplayContinua: google.maps.DirectionsRenderer;
  walkingLineSymbol: any;
  directionsDisplayDiscontinua: google.maps.DirectionsRenderer;
  directionsDisplayArray: google.maps.DirectionsRenderer[];
  directionsDisplayDiscontinuaArray: google.maps.DirectionsRenderer[];
};

export type RepetirDiaMapa = {
  map: google.maps.Map;
  showRepetirDia: boolean;
  menuDatePickerDesde: boolean;
  menuDatePickerHasta: boolean;
  menuDatePickerDesdeVD: boolean;
  menuDatePickerHastaVD: boolean;
  reproducirRepetirDia: boolean;
  isHoraInicioOpen: boolean;
  isVerDetalleHoraInicioOpen: boolean;
  isHoraTerminoOpen: boolean;
  isVerDetalleHoraTerminoOpen: boolean;
  timeHoraInicio: string;
  timeHoraFin: string;
  horaFinOld: string;
  horaInicioOld: string;
  dateDesde: string;
  dateHasta: string;
  invervaloRepetirDiaSeleccionado: number;
  intervalosRepetirDia: number[];
  btnAtrasEnabled: boolean;
  btnPlayEnabled: boolean;
  btnSiguienteEnabled: boolean;
  actividadesRepetirDia: RepetirDia[];
  vehiculoSeleccionadoRepetirDia: Vehiculo;
  rdFuncionalidades: RepetirDiaFuncionalidades;
  actividadMarkers: google.maps.Marker[];
  rutasResponseSTR: any[];
  indexMarcadorRuta: number;
  btnPlayEvento: boolean;
  markerFlechasShow: boolean;
  nombreComponente: string;
  marcadorPosicion: any;
  actividadesRespuestaSnap: any;
  tramosActividadCoordenadas: any;
  fechaInicioOld: any;
  fechaFinOld: any;
  btnPlayEventoOld: any;
  btnPlayEnabledOld: any;
  btnSiguienteEnabledOld: any;
  btnAtrasEnabledOld: any;
  generaRuta: boolean;
  actividadMarkersDetalle: google.maps.Marker[];
  primeraCarga: any;
  repeticionInterval: any;
  createInfoWindowBtn: any;
  infoWindows: google.maps.InfoWindow[];
  repetirDiaMarkers: google.maps.Marker[];
  polylinesActividad: any;
  snappedCoordinates: any;
  swicthRepetirDia: boolean;
  fechaRules: any[];
  btnDisabled: boolean;
};
