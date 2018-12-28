/**
 *
 * @type {{width: string, height: string, deneme2: string, videoPlayerId: string, vastOptions: {media_type: string, media_bitrate_min: number, media_bitrate_max: number, ad_caption: string}, DRM: {playReady: {mimeType: string, DRMSystemID: string, licenserUrl: string}}}}
 */
const Config = {
  width: '100%',
  height: '100%',
  debug: true,
  videoPlayerId: 'bluvideo',
  vastOptions: {
    media_type : 'video/mp4',
    media_bitrate_min : 200,
    media_bitrate_max : 1200,
    ad_caption: 'Advertisement'
  },
  DRM: {
    playReady: {
      mimeType: 'application/vnd.ms-playready.initiator+xml',
      DRMSystemID: 'urn:dvb:casystemid:19219',
      licenserUrl: 'http://ss.dogannet.tv/playreadylicenser/rightsmanager.asmx'
    }
  }
};

export default Config;
