import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({cabinToEdit={} }) {
  const{id:editId,...editValues}=cabinToEdit;
  const isEditSession=Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm( {defaultValues:isEditSession? editValues:{}});
  const { errors } = formState;
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate:createCabin} = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("cabin created successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading: isEditing, mutate:editCabin} = useMutation({
    mutationFn: ({newCabinData,id})=>createEditCabin(newCabinData,id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      toast.success("cabin edited successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
const isWorking=isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const image= typeof data.image=== String ? data.image: data.image[0];

    if(isEditSession)editCabin({newCabinData:{...data,image},id:editId})
   else createCabin({...data,image:image});
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "name is required",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "maxCapacity  is required",
            min: {
              value: 1,
              message: "capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "regularPrice is required",
            min: {
              value: 600,
              message: "price should be atleast 600",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "discount is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than or equal to regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "description is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
      <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button variation="primary" disabled={isWorking}>
       {isEditSession? "Edit Cabin":   "create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
