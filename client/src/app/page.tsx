import ProductList from "@/components/ProductList";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div>
      <div className="mb-12">
        <img src="/featured.png" alt="Featured Product" className="w-full h-auto" />
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  );
};

export default Homepage;
