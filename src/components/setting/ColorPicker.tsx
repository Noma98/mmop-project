import { SketchPicker } from 'react-color';

type Props = {
  color: string;
  onChange: (color: string, direction: 'left' | 'right') => void;
  onChangeComplete: (color: string, direction: 'left' | 'right') => void;
  direction: 'left' | 'right';
};
export default function ColorPicker({
  color,
  direction,
  onChange,
  onChangeComplete,
}: Props) {
  return (
    <SketchPicker
      onChange={(color) => onChange(color.hex, direction)}
      onChangeComplete={(color) => onChangeComplete(color.hex, direction)}
      color={color}
    />
  );
}
