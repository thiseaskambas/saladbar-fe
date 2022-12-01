import React, { useState } from 'react';
import { IProduct } from '../types/product.types';
import ProductTr from './ProductTr';
import Modal from './Modal';
import { StyledTable } from './styles/productsTables.styles';

import ProductUpdateForm from '../pages/ProductUpdateForm';
import DeleteProduct from './DeleteProduct';

const ProductsTable = ({ products }: { products: IProduct[] }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState<null | IProduct>(
    null
  );

  const closeModalHandler = () => {
    setIsEditOpen(false);
    setIsDeleteOpen(false);
    setIsSelectedProduct(null);
  };

  const openEditHandler = (product: IProduct) => {
    setIsEditOpen(true);
    setIsSelectedProduct(product);
  };
  const openDeleteHandler = (product: IProduct) => {
    setIsDeleteOpen(true);
    setIsSelectedProduct(product);
  };

  const deleteHandler = () => {
    console.log('deletiiiinng');
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {products.map((el) => (
            <ProductTr
              key={`${el.id}`}
              product={el}
              onEdit={() => openEditHandler(el)}
              onDelete={() => openDeleteHandler(el)}
            />
          ))}
        </tbody>
      </StyledTable>
      <Modal onClose={closeModalHandler} open={isEditOpen}>
        {isSelectedProduct && (
          <ProductUpdateForm existingProduct={isSelectedProduct} />
        )}
      </Modal>
      <Modal onClose={closeModalHandler} open={isDeleteOpen}>
        {isSelectedProduct && (
          <DeleteProduct
            productName={isSelectedProduct.name}
            onCancel={closeModalHandler}
            onDelete={deleteHandler}
          />
        )}
      </Modal>
    </>
  );
};

export default ProductsTable;
