import React, { useEffect, useState } from 'react';
import { IProduct } from '../types/product.types';
import ProductTr from './ProductTr';
import Modal from './Modal';

import ProductForm from './ProductForm';
import DeleteProduct from './DeleteProduct';
import { useAppDispatch } from '../store/store';
import { deleteProduct } from '../store/products.slice';
import { StyledSharedTable } from '../pages/styles/shared.styles';
import { StyledModalCtnDiv } from './styles/modal.styles';

type SortKey = 'name' | 'price' | 'productCourseType';

const ProductsTable = ({ products }: { products: IProduct[] }) => {
  const dispatch = useAppDispatch();
  const [sortedProducts, setSortedProducts] = useState(products);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSelectedProduct, setIsSelectedProduct] = useState<null | IProduct>(
    null
  );
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handleSorting = (sortBy: SortKey) => {
    setAscending((prev) => !prev);
    const temp = [...sortedProducts];
    ascending
      ? setSortedProducts(temp.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)))
      : setSortedProducts(
          temp.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1))
        );
  };

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
    console.log(product);
  };

  const deleteHandler = async () => {
    if (isSelectedProduct) {
      try {
        await dispatch(deleteProduct(isSelectedProduct.id)).unwrap();
        closeModalHandler();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <StyledSharedTable>
        <thead>
          <tr>
            <th onClick={() => handleSorting('name')}>Name</th>
            <th onClick={() => handleSorting('price')}>Price</th>
            <th>Image</th>
            <th onClick={() => handleSorting('productCourseType')}>Type</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((el) => (
            <ProductTr
              key={el.id}
              product={el}
              onEdit={() => openEditHandler(el)}
              onDelete={() => openDeleteHandler(el)}
            />
          ))}
        </tbody>
      </StyledSharedTable>
      <Modal
        onClose={closeModalHandler}
        open={isEditOpen}
        modalTitle="Edit Product"
      >
        {isSelectedProduct && (
          <StyledModalCtnDiv>
            <ProductForm
              existingProduct={isSelectedProduct}
              onEndSubmit={closeModalHandler}
            />
          </StyledModalCtnDiv>
        )}
      </Modal>
      <Modal
        onClose={closeModalHandler}
        open={isDeleteOpen}
        modalTitle="Delete Product?"
      >
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
