"use client";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import { useGetProducts } from "@/hooks/react-query/useGetProducts";
import { Product } from "@/typescript/types/product.types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { useRouter } from "next/navigation";
import Loader from "@/ui/loader/loader";
import { useAppDispatch } from "@/hooks/redux/page";
import { addProduct } from "@/redux-toolkit/slice/cartSlice";

const truncateDescription = (description: string, wordLimit: number) => {
  const words = description.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return description;
};

const Products = () => {
  const { data, isLoading, isError } = useGetProducts();
  const router = useRouter();
  const dispatch = useAppDispatch();
  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching products</div>;

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <Grid container spacing={3}>
        {data.map((product: Product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: "contain", p: 2, cursor: "pointer" }}
                onClick={() => handleProductClick(product.id)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  noWrap
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    fontSize: "0.8rem",
                    height: "3em",
                    overflow: "hidden",
                  }}
                >
                  {truncateDescription(product.description, 10)}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  size="small"
                  onClick={() => {
                    dispatch(addProduct(product)), router.push("/product/cart");
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PaymentIcon />}
                  size="small"
                >
                  Buy Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
