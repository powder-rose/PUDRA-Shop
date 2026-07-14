import styled from "styled-components";
import { CreateItem } from "./components/edit-item/CreateItem.jsx";
import { TableRow } from "./components/TableRow.jsx";
import { TableHeader } from "./components/TableHeader.jsx";
import { useEffect, useState } from "react";
import { Content } from "../../components";
import { request } from "../../utilits/request.js";

const SettingsPageContainer = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    request("/settings/products").then(({ error, data }) => {
      if (error) {
        setError(error);
        return;
      }
      setProducts(data);
    });
  }, []);

  const handleDeleteProduct = async (id) => {
    const { error } = await request(`/settings/${id}`, "DELETE");

    if (error) {
      setError(error);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdateProduct = async (id, productData) => {
    const { error, data } = await request(
      `/settings/${id}`,
      "PATCH",
      productData,
    );

    if (error) {
      setError(error);
      return;
    }

    setProducts((prev) =>
      prev.map((product) => (product.id === id ? data.data : product)),
    );

    setEditingId(null);
  };

  const handleCreateProduct = async (productData) => {
    const { error, data } = await request("/settings", "POST", productData);

    if (error) {
      setError(error);
      return;
    }

    setProducts((prev) => [...prev, data.data]);
  };

  return (
    <div className={className}>
      <Content error={error}>
        <aside>
          <CreateItem onCreate={handleCreateProduct} />
        </aside>
        <section className="products-table">
          <div className="table-headers">
            <TableHeader>id</TableHeader>
            <TableHeader>Имя товара</TableHeader>
            <TableHeader>Категория</TableHeader>
            <TableHeader>Стоимость</TableHeader>
            <TableHeader>Количество</TableHeader>
            <TableHeader>URL</TableHeader>
          </div>
          {products.map(({ id, title, category, price, count, image_url }) => (
            <TableRow
              key={id}
              id={id}
              title={title}
              category={category}
              price={price}
              count={count}
              image_url={image_url}
              isEditing={editingId === id}
              onEdit={() => setEditingId(id)}
              onCancel={() => setEditingId(null)}
              onSave={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </section>
      </Content>
    </div>
  );
};

export const SettingsPage = styled(SettingsPageContainer)`
  display: flex;
  height: 100%;
  width: 100%;
  overflow: auto;

  .products-table {
    margin-top: 50px;
  }

  .table-headers {
    display: flex;
    justify-content: space-evenly;
    background: #fff;
    margin-right: 20px;
  }
`;
