import { declareIndexPlugin, ReactRNPlugin, RichTextElementTextInterface, RichTextInterface, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // A command that inserts text into the editor if focused.
  await plugin.app.registerCommand({
    id: 'insert-codeblock-js',
    name: 'Insert Codeblock Javascript',
    action: async () => {

      const newRemCodeBlock: RichTextInterface = [{
        code: true,
        text: "",
        i: "m"
      }]

      plugin.editor.insertRichText(newRemCodeBlock)
      // plugin.editor.insertPlainText('Hello World!');
    },
  });


  // // Register a sidebar widget.
  // await plugin.app.registerWidget('sample_widget', WidgetLocation.RightSidebar, {
  //   dimensions: { height: 'auto', width: '100%' },
  // });
}

async function onDeactivate(_: ReactRNPlugin) { }

declareIndexPlugin(onActivate, onDeactivate);
