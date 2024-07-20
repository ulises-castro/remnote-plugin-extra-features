import { declareIndexPlugin, ReactRNPlugin, RichTextElementTextInterface, RichTextInterface, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

const LANGUAGES_OPT = [
  ['Javascript', { code: 'js' }],
  ['Typescript', {
    code: 'ts',
  }],
  ['Python', {
    code: 'py',
  }],
  ['JSON', {
    code: 'json',
  }],
  ['SQL', {
    code: 'sql',
  }],
  ['HTML', {
    code: 'html',
  }],
  ['CSS', {
    code: 'css',
  }]]

const LanguageOptionsMap = new Map<string, { code: string }>(LANGUAGES_OPT)

async function registerCommands(plugin: ReactRNPlugin) {
  // TODO: Pending to request permissions to copy from clipboard
  const insertCodeBlockByLanguage = async (text?: string = ' ', language: string, insertFromClipboardContent: boolean = false) => {
    let codeContent: string = text;
    if (insertFromClipboardContent) {
    }

    const newRemCodeBlock = await plugin.richText.code(codeContent, 'javascript').value()
    plugin.editor.insertRichText(newRemCodeBlock)
  }

  for (const [language, values] of LanguageOptionsMap.entries()) {

    await plugin.app.registerCommand({
      id: 'insert-from-codeblock-' + language,
      quickCode: "c" + values.code,
      name: `Insert Clipboard content into a Codeblock ${language}`,
      action: async () => {

        const newRemCodeBlock = await plugin.richText.code(' ', language.toLowerCase()).value()
        plugin.editor.insertRichText(newRemCodeBlock)
      },
    });
  }

}

async function onActivate(plugin: ReactRNPlugin) {

  await registerCommands(plugin);
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);
