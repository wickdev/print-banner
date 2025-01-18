<script setup>
import { Textarea, Button, Panel } from 'primevue'
import { ref, onMounted } from 'vue'

const editorText = ref(``)

const textPreview = ref('test')
const style = ref('Javascript')
const inputText = ref('Testmessage')

const getLineNumbers = () => {
  return editorText.value.split('\n').map((_, index) => index + 1)
}

function copyToClipboard() {
  navigator.clipboard.writeText(editorText.value)
  alert('Code copied!')
}

function generateBanner(text, style, width) {
  textPreview.value = generatePreviewBanner(text, width)
  switch (style) {
    case 'Javascript':
      editorText.value = generateJavascriptBanner(text, width)
      break
    case 'Python':
      editorText.value = generatePythonBanner(text, width)
      break
    case 'C':
      editorText.value = generateCBanner(text, width)
      break
    case 'Shell':
      editorText.value = generateShellBanner(text, width)
      break
  }
}

function generatePreviewBanner(text, width = 50) {
  const banner = '#'.repeat(width) + '\n'
  const emptyLine = '#'.padEnd(width - 1, ' ') + '#\n'

  // the text can have multiple lines. We need to calculate the padding for each line
  const textlines = text.split('\n')
  let finalTextLines = ''

  for (let i = 0; i < textlines.length; i++) {
    const line = textlines[i]
    const textLength = line.length
    const textStart = emptyLine.length / 2 - textLength / 2 - 2
    const textEnd =
      line.length % 2 === 0
        ? emptyLine.length - textStart - textLength - 2
        : emptyLine.length - textStart - textLength - 3

    finalTextLines += `#${' '.repeat(textStart)}${line}${' '.repeat(textEnd)}#\n`
  }
  return banner + emptyLine + finalTextLines + emptyLine + banner
}

function generateJavascriptBanner(text, width = 30) {
  return `console.log(\`${generatePreviewBanner(text, width)}\`)`
}

// create a function that generates a Python banner with the given text and return as string
function generatePythonBanner(text, width) {
  return `print('''${generatePreviewBanner(text, width)}''')`
}

// create a function that generates a C banner with the given text and return as string
function generateCBanner(text, width) {
  return `printf("%s", '''${generatePreviewBanner(text, width)}''')`
}

function generateShellBanner(text, width) {
  return `echo '''${generatePreviewBanner(text, width)}'''`
}

function onStyleChange() {
  generateBanner(inputText.value, style.value, 50)
}

function onInputChange() {
  generateBanner(inputText.value, style.value, 50)
}

onMounted(() => {
  generateBanner(inputText.value, style.value, 50)
})
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold">Print Banner</h1>
    </div>
    <div class="flex flex-wrap gap-4">
      <Panel class="w-full">
        <h2 class="text-xl font-bold">Input</h2>
        <div class="flex flex-col gap-4 w-full">
          <Textarea
            v-model="inputText"
            name="message"
            placeholder="Message"
            autoResize
            fluid
            class="w-full"
            @value-change="onInputChange"
          />
        </div>
        <div class="flex flex-wrap gap-4 my-4">
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="style"
              inputId="style1"
              name="style"
              value="Javascript"
              @value-change="onStyleChange"
            />
            <label for="style1">Javascript</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="style"
              inputId="style2"
              name="style"
              value="Python"
              @value-change="onStyleChange"
            />
            <label for="style2">Python</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="style"
              inputId="style3"
              name="style"
              value="C"
              @value-change="onStyleChange"
            />
            <label for="style3">C</label>
          </div>
          <div class="flex items-center gap-2">
            <RadioButton
              v-model="style"
              inputId="style4"
              name="style"
              value="Shell"
              @value-change="onStyleChange"
            />
            <label for="style4">Shell</label>
          </div>
        </div>
      </Panel>

      <Panel class="w-full flex flex-col">
        <h2 class="text-xl font-bold">Preview</h2>
        <pre class="p-4 bg-black-100 border rounded shadow my-4">{{ textPreview }}</pre>

        <h2 class="text-xl font-bold">Code</h2>
        <div class="relative flex border rounded shadow bg-black-50 my-3">
          <div class="flex-shrink-0 w-10 bg-black-200 text-right text-sm text-gray-600 p-2">
            <div v-for="line in getLineNumbers()" :key="line">{{ line }}</div>
          </div>

          <textarea
            v-model="editorText"
            class="flex-grow p-2 text-sm font-mono bg-transparent focus:outline-none resize-none"
            :rows="getLineNumbers()"
          ></textarea>
        </div>

        <Button
          @click="copyToClipboard"
          class="py-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Copy code
        </Button>
      </Panel>
    </div>
  </div>
</template>
