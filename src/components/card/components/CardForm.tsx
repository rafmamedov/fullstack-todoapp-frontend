import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Todo } from "../../../types/Todo";
import IconButton from "../../icon-button/IconButton";
import IconCheck from "../../../assets/svg/IconCheck";
import IconDelete from "../../../assets/svg/IconDelete";

interface Props {
  isEmpty?: boolean;
  register:  UseFormRegister<Todo>;
  deleteHandler: () => Promise<void>
  addHandler: (data: Todo) => Promise<void>;
  updateHandler: (data: Todo) => Promise<void>;
  submit: UseFormHandleSubmit<Todo, undefined>;
}

const CardForm: React.FC<Props> = ({
  submit,
  isEmpty,
  register,
  addHandler,
  deleteHandler,
  updateHandler,
}) => (
  <>
    <input
      {...register('text')}
      className="input cardInput cardTitle"
      placeholder="e.g. Buy apple"
    />
      <textarea
        {...register('description')}
        className="textarea cardDescription"
        placeholder="e.g. Hello world"
      />

    <div className="cardButtons">
      {!isEmpty && (
        <IconButton
          className="iconButton"
          onClick={deleteHandler}
          icon={<IconDelete />}
        />
      )}

      <div
        className="iconButton"
        onClick={submit(isEmpty ? addHandler : updateHandler)}
      >
        <IconCheck />
      </div>
    </div>
  </>
);

export default CardForm;