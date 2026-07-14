import styled from "styled-components";
import { useState } from "react";

const CreateItemContainer = ({ className, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    count: "",
    image_url: "",
    category: "",
  });

  const [error, setError] = useState(null);

  const onSubmit = () => {
    onCreate({
      title: form.title,
      desc: form.desc,
      price: form.price,
      category: form.category,
      count: form.count,
      imageUrl: form.image_url,
    });

    setForm({
      title: "",
      price: 0,
      count: 0,
      image_url: "",
      category: "",
      desc: "",
    });
  };

  return (
    <div className={className}>
      <h2 className="create-header">Создание товара</h2>

      {error && <div className="error">{error}</div>}

      <input
        placeholder="Название"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Категория"
        value={form.category}
        onChange={(e) =>
          setForm({
            ...form,
            category: e.target.value,
          })
        }
      />
      <input
        placeholder="Цена"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <input
        placeholder="Image URL"
        value={form.image_url}
        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
      />

      <input
        className="count-input"
        placeholder="Количество"
        type="number"
        value={form.count}
        onChange={(e) => setForm({ ...form, count: Number(e.target.value) })}
      />

      <input
        placeholder="Описание товара"
        value={form.desc}
        onChange={(e) => setForm({ ...form, desc: e.target.value })}
      />

      <button className="create-btn" onClick={onSubmit}>
        Создать
      </button>
    </div>
  );
};

export const CreateItem = styled(CreateItemContainer)`
  padding: 50px;
  background: #fff5f7;
  height: 100vh;
  min-width: 400px;

  .create-header {
    margin-bottom: 20px;
    color: var(--choko-color);
  }

  input {
    display: block;
    border: none;
    background: #fff5f7;
    border-bottom: 2px solid var(--brand-color);
    margin-bottom: 10px;
    width: 100%;
    padding: 8px;
  }

  .count-input {
    width: 50px;
  }

  button {
    margin-top: 30px;
    padding: 10px;
    cursor: pointer;
  }

  .error {
    color: red;
  }

  .create-btn {
    width: 100%;
    height: 67px;
    font-size: 16px;
    color: var(--brand-color);
    background: #fff5f7;
    border: 1px solid var(--brand-color);
    border-radius: 15px;
    transition: 0.3s;
    &:hover {
      border: 1px solid var(--brand-color-hover);
      background: var(--brand-color-hover);
      color: #fff;
    }
  }
`;
