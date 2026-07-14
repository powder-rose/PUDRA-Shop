import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faFloppyDisk,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TableRowContainer = ({
  className,
  id,
  title,
  category,
  price,
  count,
  image_url,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}) => {
  const [form, setForm] = useState({
    id,
    title,
    category,
    price,
    count,
    image_url,
  });
  if (!isEditing) {
    return (
      <div className={className}>
        <div className="column-id">{id}</div>
        <div className="column">{title}</div>
        <div className="column">{category}</div>
        <div className="column">{price} Р</div>
        <div className="column">{count}</div>
        <div className="column">
          <a href={image_url} className="column-image">
            URL
          </a>
        </div>
        <div className="control-panel">
          <button onClick={onEdit} className="control-panel-btn" type="submit">
            <FontAwesomeIcon
              size="lg"
              icon={faPen}
              style={{ color: "rgb(255, 67, 68)", marginRight: "20px" }}
            />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="control-panel-btn"
            type="submit"
          >
            <FontAwesomeIcon
              size="lg"
              icon={faXmark}
              style={{ color: "rgb(255, 67, 68)" }}
            />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <div className="column-id">{id}</div>

        <input
          className="edit-input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="edit-input"
          value={form.category || ""}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          className="edit-input"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />

        <input
          className="edit-input"
          value={form.count}
          onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
        />

        <input
          className="edit-input"
          value={form.image_url}
          onChange={(e) =>
            setForm({
              ...form,
              image_url: e.target.value,
            })
          }
        />

        <div className="control-panel-edit">
          <button
            title="Сохранить"
            className="control-panel-btn"
            onClick={() => onSave(id, form)}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              size="lg"
              style={{ color: "rgb(255, 67, 68)" }}
            />
          </button>
          <button
            title="Отменить"
            className="control-panel-btn"
            onClick={onCancel}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "rgb(255, 67, 68)" }}
            />
          </button>
        </div>
      </div>
    );
  }
};

export const TableRow = styled(TableRowContainer)`
  display: flex;

  .column {
    flex: 1;
    margin: 20px 0;
    padding: 10px 0 20px 30px;
    min-width: 10vw;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    color: #522e2e;
    border-bottom: 2px solid var(--brand-color);
  }

  .column-image {
    padding-left: 50px;
    text-decoration: none;
    color: #8d5050;
    padding-right: 20px;
  }

  .column-id {
    border: none;
    align-self: center;
    margin: 0 50px 0 100px;
    width: 50px;
    font-size: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .control-panel {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--brand-color);
  }

  .control-panel-btn {
    background: transparent;
    border: none;
    width: 20px;
    cursor: pointer;
    margin-right: 20px;
  }

  .edit-input {
    margin: 10px;
    min-width: 180px;
    text-align: end;
    border: 1px solid var(--brand-color);
  }

  .control-panel-edit {
    background: transparent;
  }

  .control-panel-btn {
    background: transparent;
    font-size: 18px;
  }
`;
