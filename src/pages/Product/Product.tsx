import { useLoaderData } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
// import { Suspense } from 'react';

export function Product() {
  const data = useLoaderData() as Product; // приведем useLoaderData к одному продукту, потому, что useLoaderData - unknown

  return <>Product - {data.name}</>;
}
