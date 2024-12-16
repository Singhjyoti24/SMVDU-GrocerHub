import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Form from '../common/Form';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from '@/store/shop/address-slice';
import AddressCard from './AddressCard';
import { useToast } from '@/hooks/use-toast';
import { Variable } from 'lucide-react';

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: ""
}

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.shopAddress);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: 'You can add max 3 adddress.',
        variant: 'destructive'
      });
      return;
    }

    currentEditedId !== null ? dispatch(editaAddress({
      userId: user?.id, addressId: currentEditedId, formData
    })).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        setFormData(initialAddressFormData);
        toast({
          title: 'Address updated sucessfully!'
        });
      }
    }) : dispatch(addNewAddress({
      ...formData,
      userId: user?.id
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
        toast({
          title: 'Address added sucessfully!'
        })
      }
    })
  }

  function handleDeleteAddress(getCurrentAddress) {
    console.log(getCurrentAddress);

    dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
      if (data?.payload.success) {
        dispatch(fetchAllAddresses(user?.id));
      }
      toast({
        title: 'Address deleted sucessfully!'
      })
    })
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
        {
          addressList && addressList.length > 0 ?
            addressList.map((item) =>
              <AddressCard
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={item}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />)
            : null
        }
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? 'Edit Address' : 'Add new Address'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Form
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
          onSubmit={handleManageAddress}
        // isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  )
}

export default Address