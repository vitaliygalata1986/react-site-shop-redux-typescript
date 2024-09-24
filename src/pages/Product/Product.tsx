import { useLoaderData } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/product.interface';
// import { Suspense } from 'react';

export function Product() {
  const data = useLoaderData() as IProduct; // приведем useLoaderData к одному продукту, потому, что useLoaderData - unknown
  // throw new Error('error');
  return <>Product - {data.name}</>;
}
