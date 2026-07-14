import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectSearch } from "../../selectors";
import { setProducts } from "../../actions";
import { ProductCard, Pagination, Loader } from "../../components";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGINAINON_LIMIT } from "../../constants";
import { request } from "../../utilits/request.js";

const CatalogContainer = ({ className }) => {
  const products = useSelector(selectProducts) || [];
  const search = useSelector(selectSearch) || "";

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.append("page", currentPage);
        params.append("limit", PAGINAINON_LIMIT);

        if (search) {
          params.append("search", search);
        }

        if (selectedCategory) {
          params.append("category", selectedCategory);
        }

        const result = await request(`/products?${params.toString()}`);
        console.log(result);
        console.log(result.data);
        console.log(result.data?.products);
        dispatch(setProducts(result.data.products));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [dispatch, currentPage, search, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  if (loading) {
    return <Loader />;
  }

  let filtered = [...products];

  if (selectedCategory) {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory,
    );
  }

  if (search) {
    const query = search.toLowerCase().trim();

    filtered = filtered.filter((product) => {
      const title = product.title?.toLowerCase() || "";
      const desc = product.desc?.toLowerCase() || "";

      return title.includes(query) || desc.includes(query);
    });
  }

  const totalPages = Math.ceil(filtered.length / PAGINAINON_LIMIT);

  const paginatedProducts = filtered.slice(
    (currentPage - 1) * PAGINAINON_LIMIT,
    currentPage * PAGINAINON_LIMIT,
  );

  return (
    <div className={className}>
      <div className="products">
        {filtered.length === 0 ? (
          <div className="not-found">Товары не найдены</div>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard {...product} key={product.id} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export const Catalog = styled(CatalogContainer)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  padding: 10px 40px;
  background: #fff8fb;

  .products {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  h2 {
    margin: 0;
    color: #5c3d42;
    font-size: 34px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;
