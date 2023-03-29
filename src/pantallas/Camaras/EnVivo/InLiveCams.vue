<template>
  <div id="camContainerLive">
    <div
      id="ancientCameras"
      v-show="tipoLiveExperimental == 2"
      style="height: 100%; width: 100%;"
    >
      <div
        style="background-color: rgb(245 245 245); height: 28px; width: 100%; display:flex; align-items: center"
      >
        <div style="margin-left: 10px">
          Canales: ({{ listCam.length }} / {{ limitAncientCams }})
        </div>
      </div>
      <div id="cmsv6flash" style="background-color: white; height: 96%"></div>
    </div>
    <div id="gridCams" v-show="tipoLiveExperimental == 1" class="grid">
      <div
        v-for="cam in listCamFill"
        :id="'player' + cam.id"
        :key="cam.id"
        class="player"
      >
        <div
          v-if="!cam.background"
          id="containerds"
          style="width: 100%; height: 100%; margin: 0 auto; background-color: #020202"
        >
          <video
            width="100%"
            style="height: calc(100% - 20px)"
            controls
            autoplay
            muted
            :id="'playerVideo' + cam.id"
          ></video>
          <div class="footerCam">
            <div
              class="btnFooter"
              style="display:flex; align-items:center; width: 100%"
            >
              <div style="color: white; margin-left: 15px">
                {{ cam.patent }}-CH{{ cam.name }}-{{ cam.id_camara }}
              </div>
            </div>
          </div>
        </div>
        <img v-else class="backgroundfill" src="@/assets/tv_default.jpg" />
      </div>
    </div>
    <div
      v-show="tipoLiveExperimental == 3"
      id="div_video"
      style="width:100%;height:100%;background:#003;position:relative;"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { fetchCamaraModulo } from '@/pantallas/Camaras/fetchCamaraModulos';
import { LoadingService } from '@/services/loadingService';
import CamaraEventBus from '@/pantallas/Camaras/CamaraEventBus';

@Component({
  components: {},
})
export default class InLiveCams extends Vue {
  @Prop({ default: {} }) current_patent: any;
  @Prop({ default: (): [] => [] }) listCam!: any[];
  @Prop() emptyPatent: boolean;
  sockets: WebSocket[] = [];
  listCamCms6: any[] = [];
  listCamMounted: any[] = [];
  listCamFill: any[] = [];
  isInitFinished: boolean = false;
  limitAncientCams: number = 5;
  loadingService = new LoadingService();
  isMounted: boolean = false;
  ttxVideoAll: any;
  streamParentElement = document.body;
  swfobject: any;
  listStreamaxMounted: any[] = [];
  $snotify: any;
  intervalLavaPlayer: any = null;
  mounted() {
    var self = this;
    setTimeout(() => {
      self.valideJSScript(0);
    }, 3000);
  }
  valideJSScript(count: number) {
    var self = this;
    if (document.getElementById('camContainerLive')) {
      if (count == 0) {
        this.loadingService.showLoading('Por favor espere...', 'inliveCam');
      }
      // @ts-ignore
      if (!window.lavaPlayer || !window.liveplay) {
        console.log(
          '[Error] Los scripts de Lavaplayer no cargaron correctamente; se recargarán'
        );
        this.loadJSScript();
        setTimeout(() => {
          self.valideJSScript(count + 1);
        }, 3000);
        if (count == 5) {
          this.loadingService.hideLoading('inliveCam');
          this.$snotify.error(
            'Hubo un error al cargar el visualizador Ceiba, inténtelo de nuevo más tarde...'
          );
        }
      } else {
        console.log('[OK] Lavaplayer');
        this.initStreamaxVideo();
        this.loadingService.hideLoading('inliveCam');
      }
    }
  }
  loadJSScript() {
    var head = document.getElementsByTagName('head')[0];

    // Se borra el script 1
    document.getElementById('lava-player-1').remove();
    var lavaplayer1: HTMLLinkElement = document.createElement('link');
    lavaplayer1.id = 'lava-player-1';
    lavaplayer1.rel = 'stylesheet';
    lavaplayer1.href =
      'https://live.gpschile.com/ms/js_css/player/style/lava-player.css';
    // Se recarga el script 1
    head.appendChild(lavaplayer1);

    // Se borra el script 2
    document.getElementById('lava-player-2').remove();
    var lavaplayer2: HTMLScriptElement = document.createElement('script');
    lavaplayer2.id = 'lava-player-2';
    lavaplayer2.type = 'text/javascript';
    lavaplayer2.src =
      'https://live.gpschile.com/ms/js_css/player/js/jquery.lava-videolayout.js';
    // Se recarga el script 2
    head.appendChild(lavaplayer2);

    // Se borra el script 3
    document.getElementById('lava-player-3').remove();
    var lavaplayer3: HTMLScriptElement = document.createElement('script');
    lavaplayer3.id = 'lava-player-3';
    lavaplayer3.type = 'text/javascript';
    lavaplayer3.src =
      'https://live.gpschile.com/ms/js_css/player/js/flv20170504.min.js';
    // Se recarga el script 3
    head.appendChild(lavaplayer3);

    // Se borra el script 4
    document.getElementById('lava-player-4').remove();
    var lavaplayer4: HTMLScriptElement = document.createElement('script');
    lavaplayer4.id = 'lava-player-4';
    lavaplayer4.type = 'text/javascript';
    lavaplayer4.src = 'https://live.gpschile.com/ms/js_css/player/js/lang.js';
    // Se recarga el script 4
    head.appendChild(lavaplayer4);

    // Se borra el script 5
    document.getElementById('lava-player-5').remove();
    var lavaplayer5: HTMLScriptElement = document.createElement('script');
    lavaplayer5.id = 'lava-player-5';
    lavaplayer5.type = 'text/javascript';
    lavaplayer5.src =
      'https://live.gpschile.com/ms/js_css/player/js/lava-player.js';
    // Se recarga el script 5
    head.appendChild(lavaplayer5);
  }

  @Watch('listCam', { immediate: true })
  onListCamChanged() {
    // var self = this;
    // setTimeout(() => {
    //   self.proccessList();
    // }, 200);
  }

  created() {
    var self = this;
    window.addEventListener('resize', () => {
      setTimeout(() => {
        self.resize();
      }, 500);
    });
    CamaraEventBus.$on('refreshCam', () => {
      setTimeout(() => {
        self.resize();
      }, 500);
    });
    CamaraEventBus.$on('handleCams', (cams: any, action: string) => {
      console.log('Action -> [' + action + ']');
      if (action == 'insert') {
        for (let key in cams) {
          let index = this.searchCam(cams[key]);
          if (index == -1) {
            this.insertCam(cams[key]);
          }
        }
        if (this.tipoLiveExperimental == 2) {
          setTimeout(() => {
            this.cms6Cam();
          }, 500);
        }
      } else if (action == 'remove') {
        for (var key in cams) {
          let index = this.searchCam(cams[key]);
          if (index != -1) {
            this.removeCam(this.listCamMounted[index], index);
          }
        }
        if (this.tipoLiveExperimental == 0 || this.tipoLive == 0) {
          this.listCamFill = [];
        }
        this.closeConnect();
        if (this.listCamMounted.length == 0) {
          clearInterval(this.intervalLavaPlayer);
        }
        if (this.tipoLiveExperimental == 2 || this.tipoLive == 2) {
          setTimeout(() => {
            this.cms6Cam();
          }, 500);
        }
      } else if (action == 'clear') {
        for (var index in this.sockets) {
          this.sockets[index].onclose = function() {};
          this.sockets[index].close();
        }
        this.sockets = [];
        this.listCamMounted = [];
        this.listStreamaxMounted = [];
        this.listCamFill = [];
        this.listCamCms6 = [];
        clearInterval(this.intervalLavaPlayer);
        try {
          // @ts-ignore
          $('#div_video').lavaPlayer('clearAll');
        } catch (e) {
          console.log('No existe método clearAll');
        }
        this.closeConnect();
      }
    });
  }

  beforeDestroy() {
    setTimeout(() => {
      CamaraEventBus.$off('refreshCam');
      CamaraEventBus.$off('resize');
      CamaraEventBus.$off('handleCams');
    }, 1000);
  }

  @Watch('emptyPatent')
  onStatePatentChanged() {}

  stopCam(idCam: any) {
    for (var i = 0; i < this.listCamMounted.length; i++) {
      if (this.listCamMounted[i].id == idCam) {
        this.listCamMounted[i].loading = 2;
        var stream = document.getElementById(
          'imgCam' + idCam
        ) as HTMLImageElement;
        stream.src = '';
        stream.onload = null;
        stream.onerror = null;
        break;
      }
    }
  }

  playStreamaxVideo(chl: any) {
    // @ts-ignore

    let index: number = this.getEmptyVideo();
    // @ts-ignore
    var video = $('video')[index];
    var url = chl.url_live;
    //'https://live.gpschile.com/stm/live.flv?devid=009902C75A&st=1&audio=1&chl='+chl.name;
    // @ts-ignore
    liveplay(video, url);
    this.listStreamaxMounted.push({
      id: chl.patent + '-' + chl.name + '-' + chl.id,
      index: index,
    });
    // @ts-ignore
    $('#div_video').lavaPlayer('addVideo', {
      url: url,
      title: chl.patent + '-' + chl.id_camara + '-' + chl.name,
    });
  }

  closeStreamaxVideo(index: any) {
    try {
      //@ts-ignore
      $('#div_video').lavaPlayer('clearVideo', $('video')[index]);
    } catch (e) {
      console.log('No existe método clearVideo');
    }
  }

  searchStreamaxCam(chl: any): { indexFrom: number; indexTo: number } {
    for (let i = 0; i < this.listStreamaxMounted.length; i++) {
      if (
        this.listStreamaxMounted[i].id ==
        chl.patent + '-' + chl.name + '-' + chl.id
      ) {
        return { indexFrom: i, indexTo: this.listStreamaxMounted[i].index };
      }
    }
    return { indexFrom: -1, indexTo: -1 };
  }

  getEmptyVideo(): number {
    let index: number;
    // @ts-ignore
    for (let i = 0; i < $('video').length; i++) {
      // @ts-ignore

      if (Object.keys($('video')[i]).length == 0) {
        return i;
      } else {
        // @ts-ignore
        for (var video of Object.keys($('video')[i])) {
          // @ts-ignore
          if (video.toLowerCase().includes('jquery')) {
            // @ts-ignore
            if ($('video')[i][video] == undefined) {
              return i;
            }
          }
        }
      }
    }
    return -1;
  }

  initStreamaxVideo() {
    console.log('[InitGridVideoPlayer]');
    // @ts-ignore
    $('#div_video').lavaPlayer({
      playType: 'html5',
      layoutNum: 4,
      streamToggle: true,
      onReady: function() {},
    });
  }

  parse(data: any) {
    var input = new Uint8Array(data),
      dv = new DataView(input.buffer),
      duration,
      audioLength,
      audio,
      video;

    duration = dv.getUint16(0, true);
    //audioLength = dv.getUint16(2, true);
    //audio = input.subarray(4, (audioLength + 4));
    // @ts-ignore
    video = input.subarray(audioLength + 4);
    //alert(duration);
    return {
      //audio: audio,
      video: video,
      duration: duration,
    };
  }

  searchCam(chl: any): number {
    var index: number;
    index = this.listCamMounted.findIndex(
      (channel: any) => channel.id == chl.id
    );
    return index;
  }

  removeCam(chl: any, index: any) {
    if (this.tipoLiveExperimental == 1 || this.tipoLive == 1) {
      this.sockets[chl.positionArray].onclose = function() {};
      this.sockets[chl.positionArray].close();
      this.listCamMounted.splice(index, 1);
      this.proccessList();
    } else if (this.tipoLiveExperimental == 2 || this.tipoLive == 2) {
      this.listCamMounted.splice(index, 1);
      this.listCamCms6 = JSON.parse(JSON.stringify(this.listCamMounted));
    } else if (this.tipoLiveExperimental == 3 || this.tipoLive == 3) {
      let indexS: {
        indexFrom: number;
        indexTo: number;
      } = this.searchStreamaxCam(chl);
      this.closeStreamaxVideo(indexS.indexTo);
      this.listCamMounted.splice(index, 1);
      this.listStreamaxMounted.splice(indexS.indexFrom, 1);
    }
  }

  insertCam(chl: any) {
    this.listCamMounted.push(chl);
    var self = this;
    if (this.tipoLiveExperimental == 1) {
      this.proccessList();
      setTimeout(() => {
        self.loadWsCams(chl);
      }, 200);
    } else if (this.tipoLiveExperimental == 3) {
      clearInterval(this.intervalLavaPlayer);
      this.intervalLavaPlayer = setInterval(() => {
        console.log('[Se reinicia timeout player]');
        // @ts-ignore
        $('#div_video').lavaPlayer('setTimeout');
      }, 50000);
      setTimeout(() => {
        self.resizeLayoutLavaPlaver(this.listCamMounted.length);
        self.playStreamaxVideo(chl);
      }, 500);
    }
  }

  resizeLayoutLavaPlaver(sizeCams: number) {
    if (sizeCams <= 4) {
    } else if (sizeCams <= 6) {
      // @ts-ignore
      $('#div_video').lavaPlayer('setLayout', 6);
    } else if (sizeCams <= 9) {
      // @ts-ignore
      $('#div_video').lavaPlayer('setLayout', 9);
    } else if (sizeCams <= 12) {
      // @ts-ignore
      $('#div_video').lavaPlayer('setLayout', 12);
    }
  }

  cms6Cam() {
    var self = this;
    this.closeConnect();
    if (this.listCamCms6.length == 0) {
      this.initCms6Grid();
    }
    setTimeout(() => {
      self.initFlash();
    }, 200);
    //this.initFlash(chl);
  }

  removeCms6Cam(chl: any, index: number) {
    // @ts-ignore
    swfobject.getObjectById('cmsv6flash').stopVideo(index);
    // @ts-ignore
    swfobject.getObjectById('cmsv6flash').reSetVideo(index);
  }

  loadWsCams(chl: any) {
    var socketURL =
      'wss://live.gpschile.com/wss/' +
      chl.id_camara +
      '/' +
      chl.name +
      '/' +
      chl.tstr;
    // @ts-ignore
    var jmuxer = new JMuxer({
      node: 'playerVideo' + chl.id,
      mode: 'video',
      // @ts-ignore
      fps: 30,
      // @ts-ignore
      readFpsFromTrack: false,
      // @ts-ignore
      clearBuffer: false,
      debug: true,
    });
    // @ts-ignore
    console.log(
      '[Aviso] Se genera la conexión con la cámara ' +
        chl.patent +
        ' canal ' +
        chl.name +
        '.'
    );
    var ws = new WebSocket(socketURL);
    this.sockets.push(ws);
    chl.positionArray = this.sockets.length - 1;
    ws.binaryType = 'arraybuffer';
    var self = this;
    chl.dataReceived = 0;
    ws.addEventListener('message', function(event) {
      // @ts-ignore
      var data = self.parse(event.data);
      jmuxer.feed(data);
      chl.dataReceived += 1;
    });
    setTimeout(() => {
      self.valideReconnect(chl, 0);
    }, chl.timeout * 60000);
  }

  valideReconnect(chl: any, totalData: number) {
    const currentTime: Date = new Date();
    const time: string =
      currentTime.getHours() +
      ':' +
      (currentTime.getMinutes() < 10 ? '0' : '') +
      currentTime.getMinutes() +
      ':' +
      (currentTime.getSeconds() < 10 ? '0' : '') +
      currentTime.getSeconds();
    if (chl.dataReceived > totalData) {
      var newData: number = chl.dataReceived + 0;
      console.log(
        '[Aviso] La cámara ' +
          chl.patent +
          ' canal ' +
          chl.name +
          ' ha enviado paquetes en los últimos ' +
          chl.timeout +
          ' minutos || hora: ' +
          time
      );
      var self = this;
      setTimeout(() => {
        self.valideReconnect(chl, newData);
      }, chl.timeout * 60000);
      return;
    } else {
      console.log(
        '[Aviso] La cámara ' +
          chl.patent +
          ' canal ' +
          chl.name +
          ' no ha enviado paquetes en los últimos ' +
          chl.timeout +
          ' minutos; Se reinicia la conexión || hora: ' +
          time
      );
      this.sockets[chl.positionArray].onclose = function() {};
      this.sockets[chl.positionArray].close();
      this.loadWsCams(chl);
    }
  }

  focusCam(id: any) {
    //document.querySelector('#player' + id).requestFullscreen();
    var cam: any = document.querySelector('#player' + id);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      cam.requestFullscreen();
    }
  }

  destroyed() {
    var self = this;
    window.removeEventListener('resize', () => {
      setTimeout(() => {
        self.resize();
      }, 500);
    });
    this.closeConnect();
  }

  resize() {
    var width = document.getElementById('camContainerLive').offsetWidth - 5;
    var height = document.getElementById('camContainerLive').offsetHeight - 5;
    document.getElementById('cmsv6flash').style.width = width.toString() + 'px';
    document.getElementById('cmsv6flash').style.height =
      height.toString() + 'px';
  }

  initCms6Grid() {
    console.log('[Aviso] Se carga la grilla Cms6');
    var params = { lang: 'en' };
    var camContainer = document.getElementById('camContainerLive');
    // @ts-ignore
    ttxVideoAll.init(
      'cmsv6flash',
      [...Array(5).keys()],
      camContainer.getBoundingClientRect().width,
      camContainer.getBoundingClientRect().height,
      params,
      'auto'
    );
  }

  closeConnect() {
    try {
      for (var i = 0; i < 20; i++) {
        // @ts-ignore
        swfobject.getObjectById('cmsv6flash').stopVideo(i);
        // @ts-ignore
        swfobject.getObjectById('cmsv6flash').reSetVideo(i);
      }
      // @ts-ignore
    } catch (error) {
      console.log(null);
    }
  }

  //Are video plug loading complete
  initFlash() {
    if (
      // @ts-ignore
      typeof swfobject == 'undefined' ||
      // @ts-ignore
      swfobject.getObjectById('cmsv6flash') == null ||
      // @ts-ignore
      typeof swfobject.getObjectById('cmsv6flash').setWindowNum == 'undefined'
    ) {
      var self = this;
      setTimeout(() => {
        self.initFlash();
      }, 50);
    } else {
      var size: number = this.listCamMounted.length;

      if (size <= 4) {
        // @ts-ignore
        swfobject.getObjectById('cmsv6flash').setWindowNum(4);
      } else {
        // @ts-ignore
        swfobject.getObjectById('cmsv6flash').setWindowNum(9);
      }

      if (this.listCamCms6.length == 0) {
        // @ts-ignore
        swfobject
          .getObjectById('cmsv6flash')
          .setServerInfo('cms6.gpschile.com', '6605');
      }

      for (var [index, channel] of this.listCamMounted.entries()) {
        // @ts-ignore
        swfobject
          .getObjectById('cmsv6flash')
          .startVideo(
            index,
            '6b16377be0c142a8988fa030e84932d4',
            channel.id_camara,
            (parseInt(channel.name) - 1).toString(),
            1,
            true
          );
        // @ts-ignore
        swfobject
          .getObjectById('cmsv6flash')
          .setVideoInfo(index, channel.patent + '-CH' + channel.name);
      }
      this.resize();
      this.listCamCms6 = JSON.parse(JSON.stringify(this.listCamMounted));
    }
  }

  closeSockets() {
    // for (var s in this.sockets) {
    //   this.sockets[s].close();
    // }
    // this.sockets = [];
  }

  async proccessList() {
    var self = this;
    if (this.listCamMounted.length == 0) {
      this.listCamFill = [];
    } else {
      this.listCamFill = JSON.parse(JSON.stringify(this.listCamMounted));
    }
    var size: number = this.listCamMounted.length;
    if (size > 0) {
      this.valideSizeNewCams();
      this.listCamMounted.sort((x: any, y: any) => {
        return x.background - y.background;
      });
    }
  }

  fillbackground(total: number) {
    var difference: number = total - this.listCamMounted.length;

    for (var i = 0; i < difference; i++) {
      this.listCamFill.push({ background: true });
    }
  }

  get tipoLiveExperimental(): number {
    if (this.listCam.length == 0) {
      return 0;
    } else if (this.listCam[0].tipo_live.toLowerCase() == 'nuevo') {
      return 1;
    } else if (this.listCam[0].tipo_live.toLowerCase() == 'ceiba2') {
      return 3;
    } else {
      return 2;
    }
  }
  get tipoLive(): number {
    if (this.listCamMounted.length == 0) {
      return 0;
    } else if (this.listCamMounted[0].tipo_live == 'nuevo') {
      return 1;
    } else if (this.listCamMounted[0].tipo_live.toLowerCase() == 'ceiba2') {
      return 3;
    } else {
      return 2;
    }
  }

  valideSizeNewCams() {
    var size: number = this.listCamMounted.length;
    if (size <= 4) {
      document.getElementById('gridCams').style.gridTemplateColumns = '50% 50%';
      document.getElementById('gridCams').style.gridTemplateRows = '50% 50%';
      this.fillbackground(4);
    } else {
      var css = '';
      let x = Math.ceil(Math.sqrt(size));
      for (let i = 0; i < x; i++) {
        css += ' ' + 100 / x + '%';
      }
      this.fillbackground(x * x);
      document.getElementById('gridCams').style.gridTemplateColumns = css;
      document.getElementById('gridCams').style.gridTemplateRows = css;
    }
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: auto auto;
  height: 100%;
  width: 100%;
  /* Cambios para border */

  /* border: 1px solid black;
  grid-gap: 1px;
  background-color: black; */
}
.player {
  border: 1px solid #353535;
}

#camContainerLive {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
#withoutPatent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.contentCam {
  height: 100%;
  width: 100%;
}
.contentChild {
  /* border: 1px solid black; */
  border: white 3px ridge;
  box-sizing: border-box;
  float: left;
  width: 50%;
  height: 50%;
}
.contentChildOff {
  /* border: 1px solid black; */
  border: white 3px ridge;
  box-sizing: border-box;
  float: left;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(228, 228, 228);
}

.loadingDiv {
  cursor: wait;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: auto;
}

.imgCam {
  display: block;
  -webkit-user-select: none;
  width: 100%;
  height: 100%;
  cursor: -webkit-zoom-in;
}

.emptyDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
#textEmpty {
  margin-bottom: 12px;
  font-weight: 500;
  font-family: Asap, sans-serif;
  font-size: 1.25rem;
}

.focusCam {
  height: 100%;
  width: 100%;
  position: initial;
}

.loadingDiv {
  cursor: wait;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: auto;
}

.responsive-iframe {
  /* position: absolute; */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.imageLoadingClass {
  background-color: white;
}
.footerCam {
  background-color: #020202;
  width: 100%;
  height: 20px;
  overflow: hidden;
  display: flex;
  margin-top: -7px;
}

.btnFooter {
  height: 100%;
}
.backgroundfill {
  height: 100%;
  width: 100%;
}
</style>
