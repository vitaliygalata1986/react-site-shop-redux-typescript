import { useParams } from 'react-router-dom';
// import { Await, useLoaderData } from 'react-router-dom';
//import { Product } from '../../interfaces/product.interface';
// import { Suspense } from 'react';

export function Product() {
  const params = useParams();
  const id = params.id;
  // console.log(params); // {id: '1'}
  // console.log(id);

  return (
    // но пока данные не получили, нужно что-то показать
    <>Product - {id}</>
  );
}
