import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product } from "../screens/ProductsScreen";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const isFocused = useIsFocused();

  const getCart = async () => {
    try {
      setIsLoading(true);
      const cart = await AsyncStorage.getItem("cart");
      const products = cart ? JSON.parse(cart) : [];
      setIsLoading(false);
      setCartItems(products);
    } catch (error) {
      // console.error("Error retrieving cart from local storage:", error);
      setError(error as string);
      setIsLoading(false);

      return [];
    }
  };

  const addToCart = async (item: Product, quantity: number) => {
    try {
      const cart: Product[] = [...cartItems];
      const existingItem = cart.find(
        (cartItem: Product) => cartItem.id === item.id
      );

      if (existingItem?.quantity) {
        existingItem.quantity += quantity;
      } else {
        item.quantity = quantity;
        cart.push(item);
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      setCartItems(cart); // Update the state with the new cart items

      Toast.show({
        type: "success",
        text1: "Product added to basket successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Try again",
      });
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

        if (existingItem.quantity) {
          existingItem.quantity -= quantity;

          if (existingItem.quantity <= 0) {
            updatedCartItems.splice(itemIndex, 1);
          }
        }
      }

      await AsyncStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems); // Update the state with the new array
      console.log("Item removed from cart:", itemId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem("cart");
      setCartItems([]); // Assuming you have a state setter for cartItems
      Toast.show({
        type: "success",
        text1: "Basket cleared successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Try again",
      });
    }
  };

  useEffect(() => {
    getCart();
  }, [isFocused]);

  return { addToCart, removeFromCart, clearCart, cartItems, error, loading };
};

export default useCart;
