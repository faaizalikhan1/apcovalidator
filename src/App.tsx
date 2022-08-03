import type { Component } from "solid-js";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";

import { createSignal, onMount } from "solid-js";

import styles from "./App.module.css";

const obj1 = `{
  test: "random",
}`;

const obj2 = `{
  random: "Test",
}`;

const App: Component = () => {
  const [editor, setEditor] = createSignal<any>();
  const [objectEditor, setObjectEditor] = createSignal<any>();

  onMount(() => {
    let objectEl: any = document.getElementById("code--object");
    let monacoEl: any = document.getElementById("editormonaoc");

    const objected = new EditorView({
      state: EditorState.create({
        doc: obj1,
        extensions: [basicSetup, javascript()],
      }),
      parent: objectEl,
    });

    setObjectEditor(objected);

    const mained = new EditorView({
      state: EditorState.create({
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
      }),
      parent: monacoEl,
    });

    setEditor(mained);
  });

  return (
    <>
      <div class={styles["code--container"]}>
        <div class={styles["code--main"]} id="editormonaoc"></div>
        <div class={styles["object--box"]} id="code--object"></div>
      </div>

      <div class={styles["btn--container"]}>
        <button
          onClick={() => {
            objectEditor().dispatch({
              changes: {
                from: 0,
                to: objectEditor().state.doc.length,
                insert: obj1,
              },
            });
          }}
        >
          Observer
        </button>
        <button
          onClick={() => {
            objectEditor().dispatch({
              changes: {
                from: 0,
                to: objectEditor().state.doc.length,
                insert: obj2,
              },
            });
          }}
        >
          Rule
        </button>
      </div>
    </>
  );
};

export default App;
