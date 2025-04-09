import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
  products: [],
  
  fetchProducts: async () => {
    try {
      const res = await axios.get('/api/products');
      set({ products: res.data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  addProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) 
      return { success: false };
    try {
      const res = await axios.post('/api/products', newProduct);
      set((state) => ({ products: [...state.products, res.data.data] }));
      return { success: true };
    } catch (error) {
      console.error("Error adding product:", error);
      return { success: false };
    }
  },
  deleteProduct: async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      return { success: true };

    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false };

    }
  },
  updateProduct: async (id, updatedProduct) => {
    try {
      const res = await axios.put(`/api/products/${id}`, updatedProduct);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? res.data.data : product
        ),
      }));
      return { success: true };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false };
    }
  },
  
}));

export default useProductStore;
