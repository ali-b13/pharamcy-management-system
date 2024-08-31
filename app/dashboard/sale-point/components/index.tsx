"use client";

import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { MedicineType } from '@/types.dt';
import { getMedicines } from '@/app/actions/medicine/queries';
import SearchComponent from './Search';
import CartComponent from './Cart';
import AlertBox from '@/components/Alert';
import { placeOrder } from '@/app/actions/order/queries';

interface CartItem {
  medicineId: string;
  name: string;
  batchId: string;
  batchNumber: string;
  quantity: number;
  availableQuantity: number;
  salePrice: number;
}

const POS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MedicineType[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [amountReceived, setAmountReceived] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successOrder,setSuccessOrder]=useState(false)

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    await handleSearch(e.target.value);
  };

  const handleSearch = async (term: string) => {
    setHasSearched(true)
    setIsLoading(true)
    if(!term.length){
      setSearchResults([]) 
      setHasSearched(false)
      setIsLoading(false)
      return
    } 
      
    try {
      const response = await getMedicines(term, 1, 5);
      setSearchResults(response.medicines);
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddToCart = (medicineId: string) => {
    const medicine = searchResults.find((med) => med.id === medicineId);
    if (medicine && medicine.batches?.length > 0) {
      // Get current date
      const currentDate = new Date();
  
      // Filter out expired batches and sort the remaining ones
      const sortedBatches = medicine.batches
        .map(batch => ({
          ...batch,
          expiryDate: new Date(batch.expiryDate)
        }))
        .filter(batch => batch.expiryDate > currentDate) // Filter out expired batches
        .sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());
  
      // Find the first batch with available quantity
      const validBatch = sortedBatches.find(batch => batch.quantity > 0);
  
      if (validBatch) {
        const existingItemIndex = cart.findIndex(item => item.batchId === validBatch.batchId);
  
        if (existingItemIndex >= 0) {
          handleQuantityChange(existingItemIndex, cart[existingItemIndex].quantity + 1);
        } else {
          const newItem = {
            medicineId: validBatch.medicineId,
            name: medicine.name,
            batchId: validBatch.batchId,
            batchNumber: validBatch.batchNumber,
            quantity: 1,
            availableQuantity: validBatch.quantity,
            supplierId: validBatch.supplierId,
            salePrice: medicine.price,
            totalPrice: medicine.price // Calculate the price for a single item
          };
          setCart(prevCart => [...prevCart, newItem]);
        }
      } else {
        setShowMessage(true); // No batches with available quantity
      }
    } else {
      setShowMessage(true); // No batches available
    }
  };
  

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const item = updatedCart[index];

      if (newQuantity <= item.availableQuantity && newQuantity >= 0) {
        if (newQuantity === 0) {
          updatedCart.splice(index, 1); // Remove item if quantity is zero
        } else {
          item.quantity = newQuantity;
        }
      }

      return updatedCart;
    });
  };

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => total + item.quantity * item.salePrice, 0);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const handlePayment = async (paymentMethod:string,buyerName?: string, buyerPhone?: string) => {
    try {
      const orderDetails = {
        cart, 
        paymentMethod, 
        ...(paymentMethod === "DEBT" && { buyerName, buyerPhone }) // Add buyer details only if DEBT
      };
      const response = await placeOrder(orderDetails)
      if(response.success){
        setSuccessOrder(true)
          setCart([]); // Reset after successful sale
          setTotalPrice(0);
          setAmountReceived(0);
      }else {
         setShowError(true)
      }
    } catch (error) {
        setShowError(true)

    }
  };

  return (
    <div className="bg-gray-100 md:p-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <SearchComponent
          hasSearched={hasSearched}
          isLoading={isLoading}
            searchTerm={searchTerm}
            searchResults={searchResults}
            onSearchChange={handleSearchChange}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
          <CartComponent
            cart={cart}
            onQuantityChange={handleQuantityChange}
            totalPrice={totalPrice}
            amountReceived={amountReceived}
            onAmountReceivedChange={(e) => setAmountReceived(Number(e.target.value))}
            onPayment={handlePayment}
          />
        </div>
      </div>
      {showMessage && (
        <AlertBox
          type='warning'
          title='لا دفعات موجودة'
          show={showMessage}
          onCancel={() => setShowMessage(false)}
          message='لا توجد دفعات لهاذا الدواء او نفذت الكمية'
        />
      )}
      {showError && (
        <AlertBox
          type='error'
          title='خطاء '
          show={showError}
          onCancel={() => setShowError(false)}
          message='تعذر استكمال الطلب'
        />
      )}
         {successOrder && (
        <AlertBox
          type='success'
          title='الطلب استكمل بنجاح '
          show={successOrder}
          onCancel={() => setSuccessOrder(false)}
          message='تم استكمال طلبك بنجاح '
        />
      )}
    </div>
  );
};

export default POS;
