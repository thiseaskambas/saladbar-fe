import React, { useState } from 'react';
import { IProduct } from '../types/product.types';
import ProductGridRow from './ProductGridRow';
import Modal from './Modal';
import {
  StyledProductPriceItem,
  StyledProductsGridDiv,
} from './styles/productsTables.styles';

import ProductUpdateForm from '../pages/ProductUpdateForm';

const ProductsTable = ({ products }: { products: IProduct[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState<null | IProduct>(
    null
  );
  const openModalHandler = (product: IProduct) => {
    setIsModalOpen(true);
    setIsSelectedProduct(product);
  };
  return (
    <>
      <StyledProductsGridDiv>
        <h2>Name</h2>
        <StyledProductPriceItem>Price</StyledProductPriceItem>
        <h2>Image</h2>
        <h2>Type</h2>
        <div></div>
        <div></div>
        {products.map((el) => (
          <ProductGridRow
            key={`${el.id}`}
            product={el}
            onEdit={() => openModalHandler(el)}
          />
        ))}
      </StyledProductsGridDiv>
      <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen}>
        {isSelectedProduct && (
          <ProductUpdateForm existingProduct={isSelectedProduct} />
        )}
      </Modal>
    </>
  );
};

export default ProductsTable;
