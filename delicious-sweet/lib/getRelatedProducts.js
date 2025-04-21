export async function getRelatedProducts(productId, guestId = 1) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/related-products/${productId}?guest_id=${guestId}`,
        { cache: "no-store" } // Disable caching to always fetch fresh data
      );
  
      if (!res.ok) {
        throw new Error("Failed to fetch related products");
      }

      return await res.json();
    } catch (error) {
      console.error("Error fetching related products:", error);
      return [];
    }
  }
  