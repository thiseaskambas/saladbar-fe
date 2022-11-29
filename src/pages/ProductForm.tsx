import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { createProduct, initializeProducts } from '../store/products.slice';
import { useAppDispatch } from '../store/store';
import { ProductCourseType } from '../types/product.types';

import {
  StyledProductForm,
  StyledProductMain,
} from './styles/productForm.styles';

interface IFormValues {
  name: string;
  price: string;
  productCourseType: string;
  image: File | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Please enter a name'),
  price: Yup.number().required('Please enter a price'),
  productCourseType: Yup.string().matches(
    /(starter|main|desert|drink|side|other)/
  ),
});

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const initialValues: IFormValues = {
    name: 'deleteme',
    price: '0',
    productCourseType: 'starter',
    image: null,
  };
  return (
    <StyledProductMain>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          console.log('submiting');
          console.log(values);
          const input = new FormData();
          if (values.image) {
            input.append('image', values.image, values.image?.name);
          }
          input.append('name', values.name);
          input.append('price', values.price);
          input.append('productCourseType', values.productCourseType);

          try {
            console.log({ input });
            await dispatch(createProduct(input)).unwrap();
            await dispatch(initializeProducts()).unwrap();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        {(formik) => (
          <StyledProductForm onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="name">Product name:</label>
              <Field type="text" name="name" />
            </div>
            <div>
              <label htmlFor="price">Product price:</label>
              <Field type="number" name="price" />
            </div>
            <div>
              <Field name="productCourseType" as="select">
                <option value="" disabled={true}>
                  --select a type--
                </option>
                {Object.values(ProductCourseType).map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <input
                type="file"
                name="image"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(event: any) => {
                  formik.setFieldValue('image', event.currentTarget.files[0]);
                }}
              />
            </div>
            <div>
              <button type="submit">Create product</button>
            </div>
          </StyledProductForm>
        )}
      </Formik>
    </StyledProductMain>
  );
};

export default ProductForm;
