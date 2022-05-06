import React, { useState } from 'react';
import { useField } from 'formik';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toolbarConfig } from './toolbar';

export const TextEditor: React.FC<{ name: string }> = ({ name }) => {
  const [field, meta, helpers] = useField(name);

  const blocksFromHtml = htmlToDraft(field.value);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  const onEditorChange = (newState: EditorState) => {
    helpers.setValue(draftToHtml(convertToRaw(newState.getCurrentContent())));
    setEditorState(newState);
  };

  return (
    <div className="edit__form__text_editor">
      <Editor
        editorState={editorState}
        wrapperClassName="edit__form__text_editor_wrapper"
        editorClassName="edit__form__text_editor_editor"
        onEditorStateChange={onEditorChange}
        toolbar={toolbarConfig}
      />
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </div>
  );
};
