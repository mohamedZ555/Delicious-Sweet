import { getRelatedProducts } from "@/lib/getRelatedProducts";
import RelatedProductClient from "./RelatedProductClient";

export default async function RelatedProduct({ productId }) {
  const relatedProducts = await getRelatedProducts(productId);

  return <RelatedProductClient relatedProducts={relatedProducts} />;
}
