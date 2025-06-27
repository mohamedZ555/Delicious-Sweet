import React from 'react'
import Wish from '../../component/wishList/WishList'
import '../../../../styles/pagesStyle/wishlist.css'

export const metadata = {
  title: 'Wishlist - Delicious Sweet',
  description: 'View and manage your favorite products in your wishlist',
}

async function Wishlist({ params }) {
  const { locale } = await params;
  return (
    <Wish locale={locale} />
  )
}

export default Wishlist