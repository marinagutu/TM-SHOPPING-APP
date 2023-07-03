import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../screens/ProductsScreen";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const isFocused = useIsFocused();

  const getCart = async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      const products = cart ? JSON.parse(cart) : [];
      setCartItems(products);
    } catch (error) {
      console.error("Error retrieving cart from local storage:", error);
      return [];
    }
  };

  const addToCart = async (item: Product, quantity: number) => {
    try {
      const cart: Product[] = cartItems;
      const existingItem = cart.find(
        (cartItem: Product) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity! += quantity;
      } else {
        item.quantity = quantity;
        cart.push(item);
      }

      console.log("triggered", cart);

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      console.log("Item added to cart:", item);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const removeFromCart = async (itemId: number, quantity: number = 1) => {
    try {
      const updatedCartItems = [...cartItems]; // Create a new array

      const itemIndex = updatedCartItems.findIndex(
        (item: Product) => item.id === itemId
      );

      if (itemIndex !== -1) {
        const existingItem = updatedCartItems[itemIndex];
        existingItem.quantity! -= quantity;

        if (existingItem.quantity! <= 0) {
          updatedCartItems.splice(itemIndex, 1);
        }
      }

      await AsyncStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems); // Update the state with the new array
      console.log("Item removed from cart:", itemId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    getCart();
  }, [isFocused]);

  return { addToCart, removeFromCart, cartItems };
};

export default useCart;
