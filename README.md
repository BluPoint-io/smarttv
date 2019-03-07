# SmartTV Framework

Framework is still under development.

Current version is only designated to use it as a standalone javascript library. But future plans are including write a framework which including a complete smarttv solution with UI and Core. I'll update documentation as soon as possible. If you have any questions regarding how to use or future plans please write us from [dev@blutv.com](mailto:dev@blutv.com)
  

### Usage

```
import SmartTVFramework from "smarttv-framework";

//Optional
const config = {
  width: '100%',
  height: '100%',
  debug: true,
  videoPlayerId: 'test-video',
  vastOptions: {
    media_type : 'video/mp4',
    media_bitrate_min : 200,
    media_bitrate_max : 1200,
    ad_caption: 'Advertisement'
  },
  DRM: {
    playReady: {
      mimeType: 'application/vnd.ms-playready.initiator+xml',
      DRMSystemID: '',
      licenserUrl: ''
    }
  },
  appId: ''
}

const SmartTVDevice = new SmartTVFramework.Device(config);
```

Docs are will be continued...
