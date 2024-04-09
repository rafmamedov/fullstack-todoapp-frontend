import './style.scss';

interface Props {
  className?: string;
  icon: JSX.Element;
  onClick: () => void;
};

const IconButton: React.FC<Props> = ({ onClick, icon, className }) => (
  <div onClick={onClick} className={className}>{icon}</div>
);

export default IconButton;
