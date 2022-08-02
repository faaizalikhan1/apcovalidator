import type { Component } from "solid-js";
// import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

import { createSignal, onMount } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  // const [editor, setEditor] =
  //   createSignal<monaco.editor.IStandaloneCodeEditor | null>(null);

  onMount(() => {
    let objectEl: any = document.getElementById("code--object");
    let monacoEl: any = document.getElementById("editormonaoc");

    new EditorView({
      extensions: [basicSetup, javascript()],
      parent: objectEl,
    });

    new EditorView({
      doc: `// Code here`,
      extensions: [
        basicSetup,
        javascript(),
        EditorView.theme({
          "&.cm-focused .cm-content": {
            color: "black",
          },
        }),
      ],
      parent: monacoEl,
    });
    // let monacoEditor: any;
    // if (!editor()) {
    //   monacoEditor = monaco.editor.create(monacoEl, {
    //     value:
    //       "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
    //     language: "javascript",
    //     roundedSelection: false,
    //     scrollBeyondLastLine: false,
    //     theme: "vs-dark",
    //   });
    //   setEditor(monacoEditor);
    // }
    // monaco.editor.create(objectEl, {
    //   value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
    //     "\n"
    //   ),
    //   readOnly: true,
    //   minimap: { enabled: false },
    //   automaticLayout: true,
    //   language: "javascript",
    // });
    // onCleanup(() => editor?.dispose());
  });

  return (
    <div class={styles["code--container"]}>
      <div class={styles["code--main"]} id="editormonaoc"></div>
      <div class={styles["object--box"]} id="code--object"></div>
    </div>
  );
};

export default App;
