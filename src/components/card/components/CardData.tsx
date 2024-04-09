import '../style.scss';

import IconDelete from "../../../assets/svg/IconDelete";
import IconEdit from "../../../assets/svg/IconEdit";
import IconButton from '../../icon-button/IconButton';

interface Props {
  text?: string;
  description?: string;
  onDelete: () => Promise<void>;
  onEdit:  React.Dispatch<React.SetStateAction<boolean>>;
}

const CardData: React.FC<Props> = ({
  text,
  onEdit,
  onDelete,
  description,
}) => (
  <>
    <div className="cardTitle">{text}</div>
    <div className="cardDescription">{description}</div>

    <div className="cardButtons">
      <IconButton
        className='iconButton'
        onClick={onDelete}
        icon={<IconDelete />}
      />

      <IconButton
        className="iconButton"
        icon={<IconEdit />}
        onClick={() => onEdit(true)}
      />
    </div>
  </>
);

export default CardData;
