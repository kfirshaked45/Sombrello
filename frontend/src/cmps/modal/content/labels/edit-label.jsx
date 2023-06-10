export function EditLabel() {
  const colors = [
    '#baf3db',
    '#f8e6a0',
    '#ffe2bd',
    '#ffd2cc',
    '#dfd8fd',
    '#4bce97',
    '#e2b203',
    '#faa53d',
    '#f87462',
    '#9f8fef',
    '#1f845a',
    '#946f00',
    '#b65c02',
    '#ca3521',
    '#6e5dc6',
    '#cce0ff',
    '#c1f0f5',
    '#d3f1a7',
    '#fdd0ec',
    '#dcdfe4',
    '#579dff',
    '#60c6d2',
    '#94c748',
    '#e774bb',
    '#8590a2',
    '#0c66e4',
    '#1d7f8c',
    '#5b7f24',
    '#ae4787',
    '#626f86',
  ];
  return (
    <div>
      div with the current Labvel color and text basicly show the label
      <div>Title with an input to put it</div>
      Select a color
      {colors.map((color) => (
        <div>{color}</div>
      ))}
      <button>
        <span>X</span> Remove color
      </button>
      <div>
        <button>Save</button>
        <button>Delete</button>
      </div>
    </div>
  );
}
