<template>
  <v-app>
    <app-loading></app-loading>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import Loading from './components/Loading.vue';
import { datadogRum } from '@datadog/browser-rum';

@Component({
  components: {
    'app-loading': Loading,
  },
})
export default class App extends Vue {
  env: string = '';
  mounted() {
    this.env = process.env.NODE_ENV;
    datadogRum.init({
      applicationId: 'e6d59e5f-f169-4923-80ba-0f7160f74085',
      clientToken: 'pubb750158ed4c1b8b2c66dac7bce7b0ea3',
      site: 'datadoghq.com',
      service: 'track3',
      env: this.env,
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sampleRate: 100,
      replaySampleRate: 100,
      trackInteractions: true,
      defaultPrivacyLevel: 'allow',
    });

    //validacion para el login todavía no existe el dato en el LocalStore
    if (localStorage.getItem('user') != null) {
      let user = localStorage.getItem('user');
      let id = JSON.parse(user.replace(/'/g, '"')).id;
      let name =
        JSON.parse(user.replace(/'/g, '"')).nombre +
        ' ' +
        JSON.parse(user.replace(/'/g, '"')).apellidoPaterno;
      let email = JSON.parse(user.replace(/'/g, '"')).email;

      datadogRum.setUser({
        id: id,
        name: name,
        email: email,
      });
    }
    datadogRum.startSessionReplayRecording();
  }
}
</script>

<style>
#app {
  font-family: 'Asap', sans-serif !important;
}
.ag-header-cell-text {
  font-family: 'Asap', sans-serif !important;
}
.ag-menu {
  text-align: left;
}

/* Animaciones */
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.fast {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

html {
  overflow: auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

.ag-theme-material .ag-icon-checkbox-checked {
  background-image: url('../src/assets/checked2.svg') !important;
}
.ag-theme-material .ag-icon-checkbox-checked:empty {
  background-image: url('../src/assets/checked2.svg') !important;
}

.ag-theme-material button[ref='btLast'] {
  background-image: url('../src/assets/last.svg') !important;
  background-size: 12px 12px !important;
  opacity: 0.95 !important;
  color: #526da5 !important;
}

.ag-theme-material button[ref='btNext'] {
  background-image: url('../src/assets/next.svg') !important;
  background-size: 12px 12px !important;
  opacity: 0.95 !important;
  color: #526da5 !important;
}

.ag-theme-material button[ref='btPrevious'] {
  background-image: url('../src/assets/previous.svg') !important;
  background-size: 12px 12px !important;
  opacity: 0.95 !important;
  color: #526da5 !important;
}

.ag-theme-material button[ref='btFirst'] {
  background-image: url('../src/assets/first.svg') !important;
  background-size: 12px 12px !important;
  opacity: 0.95 !important;
  color: #526da5 !important;
}

.ag-theme-material:hover button:hover {
  opacity: 0.35 !important;
}

.ag-theme-material button[ref='btPrevious'][disabled] {
  opacity: 0.45 !important;
}

.ag-theme-material button[ref='btLast'][disabled] {
  opacity: 0.45 !important;
}

.ag-theme-material button[ref='btNext'][disabled] {
  opacity: 0.45 !important;
}

.ag-theme-material button[ref='btFirst'][disabled] {
  opacity: 0.45 !important;
}

/* MANTENEDORES  --------------------------------------------------------------*/

.rounded-card {
  border-radius: 3px !important;
}

.rounded-card2 {
  border: 0px !important;
}
.cardnew {
  background-color: #e9ebee;
  min-height: 94vh;
  height: 100% !important;
}
.dividercolor {
  color: #e9ebee !important;
}

.gridcard {
  display: block;
  border-radius: 2px;
  min-width: 0;
  position: relative;
  text-decoration: none;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  -webkit-box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.application {
  font-family: 'asap', sans-serif !important;
}
.importExportBtnTexto {
  color: rgba(0, 0, 0, 0.7) !important;
}
.importExportBtnIcon {
  color: #526da5 !important;
}

.btn-crear {
  background-color: #ffe800 !important;
  color: black !important;
  margin-left: -10px !important;
}
.btn-volver {
  background-color: #526da5 !important;
  max-height: 75% !important;
}
.btn-continuar {
  background-color: #ffe800 !important;
  color: black !important;
  max-height: 75% !important;
}
.btn-grabar {
  background-color: #ff6c00 !important;
  max-height: 75% !important;
}
.btn-asociar-icon {
  color: #27488e !important;
}
.btn-asociar-texto {
  color: rgba(0, 0, 0, 0.7) !important;
}
.btn-barra {
  color: #777777 !important;
}
.btn-importar-exportar {
  color: #27488e !important;
}
.btn-importar-exportar span {
  color: black !important;
}
button[title='Remover'] {
  color: black !important;
}

.v-item-group.v-bottom-nav .v-btn--active {
  opacity: 1;
  border-bottom: 2px solid #ffe800 !important;
  padding-top: 6px;
}
.snotify-rightTop {
  z-index: 20000000 !important;
}

/*DESDE ACA */
.gm-style-iw-d {
  margin-top: -8px !important;
  margin-right: -4px !important;
}

#gridClasificacion {
  height: auto !important;
  margin-bottom: 50px;
}
</style>
