import RichMarkdownEditor from "rich-markdown-editor";

type MarkdownProps = {
  readonly?: boolean;
  initialValue?: string;
  onChange?: (value: string) => void;
};

export default function Markdown(props: MarkdownProps): JSX.Element {
  const { initialValue, readonly, onChange } = props;

  return (
    <RichMarkdownEditor
      defaultValue={initialValue}
      readOnly={readonly}
      onChange={(value) => onChange && onChange(value())}
    />
  );
}
