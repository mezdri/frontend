import { Funcionalidades } from '@/config/funcionalidades';
import TarifasPeajes from './Tarifas/index.vue';
import Peajes from './Mantencion/index.vue';
import Reportes from './Reportes/index.vue';

const PeajesRoutes = [
  {
    path: 'Tarifa-Peajes',
    component: TarifasPeajes,
    meta: {
      description: 'Tarifas Peajes',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.TarifasPeajes,
    },
  },
  {
    path: 'Admin-Peajes',
    component: Peajes,
    meta: {
      description: 'Admin Peajes',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.TarifasPeajes,
    },
  },
  {
    path: 'Reportes-Peajes',
    component: Reportes,
    meta: {
      description: 'Reportes Peajes',
      requiresAuth: true,
      moduloCodigo: Funcionalidades.TarifasPeajes,
    },
  },
];

export default PeajesRoutes;
