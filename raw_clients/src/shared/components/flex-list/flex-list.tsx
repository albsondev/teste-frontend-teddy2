interface FlexListProps<T> {
  data: T[];
  columns?: number;
  containerStyle?: React.CSSProperties;
  renderItem(obj: T, index: number, arr: T[]): JSX.Element;
}

export function FlexList<T>({
  data,
  columns,
  containerStyle,
  renderItem,
}: FlexListProps<T>) {
  const _render = () => {
    return data.map((item, index) => {
      return renderItem(item, index, data);
    });
  };

  return <div style={containerStyle}>{_render()}</div>;
}
