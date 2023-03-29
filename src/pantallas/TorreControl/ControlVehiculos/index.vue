<template>
  <v-container fluid grid-list-md>
    <v-container fluid grid-list-md>
      <v-tabs left color="transparent">
        <!--        <v-tab @click="selectStats">Estado de Vehiculos</v-tab>-->
        <v-tab @click="selectTable">Tabla de Vehículos</v-tab>
      </v-tabs>
      <v-divider />
      <!--      <FlotasMap v-show="tabSelected == 0" />-->
      <Datatables
        v-show="tabSelected == 1"
        :headers="headers"
        :dataTable="dataTable"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Funcionalidades } from '@/config/funcionalidades';
import { PermisoAccion } from '@/views/base/VariablesPermisos';
import { LoadingService } from '@/services/loadingService';
import { ComponenteBase } from '@/views/base/ComponenteBase';
import Datatables from '@/pantallas/TorreControl/Datatables.vue';
import { MSResponse } from '@/interfaces/MS';
import { AxiosResponse } from 'axios';
import { ControlVehiculosInterface } from '@/pantallas/TorreControl/ControlVehiculos/controlVehiculosInterface';
import { headers } from '@/pantallas/TorreControl/ControlVehiculos/controlVehiculosHeaders';
import { VehiculosService } from '@/pantallas/TorreControl/ControlVehiculos/vehiculosService';
import TorreControlInstance from '@/pantallas/TorreControl/comunes/Instances';

@Component({
  name: 'ControlVehiculos',
  components: {
    Datatables,
  },
})
export default class ControlVehiculos extends ComponenteBase {
  accionesTotales: PermisoAccion[];
  loadingService = new LoadingService();
  tabSelected: number = 1;
  clientId: string;
  flotaId: string;
  isLoading: boolean = false;
  dataTable: ControlVehiculosInterface[] = [];
  vehiculosService = new VehiculosService();
  headers = headers;
  readonly funcionalidad: Funcionalidades = Funcionalidades.TorreControl;

  detalleSeleccionado: any = null;

  constructor() {
    super();
    this.getClientId();
  }

  getClientId() {
    this.flotaId = this.$route.params.id;
    this.clientId = localStorage.getItem('clienteDefecto');
  }

  async mounted() {
    if (this.tabSelected == 1) {
      this.getVehiculos();
    }
  }

  selectStats() {
    this.tabSelected = 0;
  }

  selectTable() {
    this.tabSelected = 1;
    this.getVehiculos();
  }

  async getVehiculos() {
    this.isLoading = true;
    this.loadingService.showLoading();
    const axiosResponse: AxiosResponse<
      MSResponse<ControlVehiculosInterface>
    > = await this.vehiculosService.getVehiculos(this.clientId, this.flotaId);
    this.isLoading = false;
    const msRespose: MSResponse<ControlVehiculosInterface> = axiosResponse.data;
    if (msRespose.CODIGO_RESPUESTA === '1') {
      this.dataTable = msRespose.data;
      TorreControlInstance.$emit('dataTable', this.dataTable);
    } else {
      this.dataTable = [];
    }
    this.loadingService.hideLoading();
  }
}
</script>

<style scoped></style>
