// .vitepress/theme/index.js
import Documate from '@documate/vue'
import '@documate/vue/dist/style.css'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout: h(DefaultTheme.Layout, null, {
    'nav-bar-content-before': () => h(
      Documate,
      {
        endpoint: 'https://qzzf2uhfp8.us.aircode.run/ask',
      },
    )
  })
}