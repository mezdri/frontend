import { Funcionalidades } from '@/config/funcionalidades';
import FlotaVehiculo from './FlotaVehiculo/index.vue';
import EditarVehiculoPantalla from './EditarVehiculos/EditarVehiculosPantalla.vue';
import ActivarIntegracion from './ActivarIntegracion/index.vue';
import ClasificacionPatentes from './ClasificacionPatentes/index.vue';
import ConfiguracionCamaras from './ClasificacionPatentes/IndexConfiguracionCamara.vue';
import MantenedorServipagPantalla from './MantenedorServipag/MantenedorServipagPantalla.vue';
import GrillaReportesConecta from './ReportesConecta/index.vue';

const ConectaRoutes = [
  {
    path: 'Flota-Vehiculo',
    component: FlotaVehiculo,
    meta: {
      description: 'Flota Vehiculo',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.FlotaVehiculo,
    },
  },
  {
    path: 'MantenedorServipag',
    component: MantenedorServipagPantalla,
    meta: {
      description: 'MantenedorServipag',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.MantenedorServipag,
    },
  },

  {
    path: 'editar-vehiculos',
    component: EditarVehiculoPantalla,
    meta: {
      description: 'Editar Vehiculo',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.EditarVehiculos,
    },
  },
  {
    path: 'Activar-Integracion',
    component: ActivarIntegracion,
    meta: {
      description: 'Activar Integración',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.IntegracionVehiculo,
    },
  },
  {
    path: 'Clasificacion-Patentes-Camaras',
    component: ClasificacionPatentes,
    meta: {
      description: 'Clasificacion Patentes Camaras',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.ClasificacionPatentes,
    },
  },
  {
    path: 'configuracion-camaras',
    component: ConfiguracionCamaras,
    meta: {
      description: 'Configuración Cámaras',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.ConfiguracionCamaras,
    },
  },
  {
    path: 'conecta-reportes',
    component: GrillaReportesConecta,
    meta: {
      description: 'Reportes',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.GrillaReportesConecta,
    },
  },
];

export default ConectaRoutes;
