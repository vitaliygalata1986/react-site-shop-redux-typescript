import { Await, useLoaderData } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
import { Suspense } from 'react';
// import { Suspense } from 'react';

export function Product() {
  // const data = useLoaderData() as IProduct; // приведем useLoaderData к одному продукту, потому, что useLoaderData - unknown
  const data = useLoaderData() as { data: IProduct }; // так как мы уже возвращаем объект data: axios.get(`${PREFIX}/products/${params.id}`).then((data) => data)
  // throw new Error('error');
  // мы получаем data, когда промис развезолвится
  // перед тем, как получить данные - нужно что-то показать
  return (
    <>
      <Suspense fallback={'Загружаю...'}>
        <Await resolve={data.data}>
          {(
            { data }: { data: IProduct } // получаем продукт
          ) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
}
