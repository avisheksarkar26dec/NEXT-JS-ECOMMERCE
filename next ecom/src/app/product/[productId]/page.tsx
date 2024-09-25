"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  Chip,
  Rating,
  IconButton,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useGetProductDetails } from "@/hooks/react-query/useGetProductDetails";
export default function page({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const { data, isLoading, isError } = useGetProductDetails(productId);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={data?.image}
                alt="Classic Leather Loafers"
              />
            </Card>
            {/* Add thumbnail images here */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Chip label="NEW" color="primary" size="small" sx={{ mb: 1 }} />
              <Chip
                label="IN STOCK"
                color="success"
                size="small"
                sx={{ ml: 1, mb: 1 }}
              />
              <Typography variant="h4" gutterBottom>
                {data?.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={4} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  (9.12k reviews)
                </Typography>
              </Box>
              <Typography variant="h5" color="primary" gutterBottom>
                ${data?.price}
              </Typography>
              <Typography variant="body2" paragraph>
                {data?.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1">Quantity</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    sx={{ p: 1 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    sx={{
                      px: 2,
                      borderLeft: "1px solid #ccc",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    sx={{ p: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Button variant="contained" sx={{ mr: 2, width: "45%" }}>
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ width: "45%" }}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
