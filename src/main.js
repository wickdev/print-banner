import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import { Form } from '@primevue/forms'
import Textarea from 'primevue/textarea'
import Panel from 'primevue/panel'
import RadioButton from 'primevue/radiobutton'

import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Message', Message)
app.component('Textarea', Textarea)
app.component('Form', Form)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('Panel', Panel)
app.component('RadioButton', RadioButton)
app.mount('#app')
