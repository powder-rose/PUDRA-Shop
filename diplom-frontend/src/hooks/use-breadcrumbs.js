import { useMemo } from "react";

export const useBreadcrumbs = ({ product, category }) => {
  return useMemo(() => {
    const breadcrumbs = [
      {
        title: "Главная",
        to: "/",
      },
    ];

    if (category) {
      breadcrumbs.push({
        title: category.name,
        to: `/catalog/category/${category.id}`,
      });
    }

    if (product) {
      breadcrumbs.push({
        title: product.title,
      });
    }

    return breadcrumbs;
  }, [product, category]);
};
