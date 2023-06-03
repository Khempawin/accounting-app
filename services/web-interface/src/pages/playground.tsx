import * as React from "react";
import Button from "@mui/material/Button";
import {
  InvoiceBaseRecord,
  InvoiceBaseLineItem,
  InvoiceSaveForm,
} from "../app/interfaces/invoice";
import { Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import TextInput from "../app/components/forms/TextInput";
import DateInput from "../app/components/forms/DateInput";
import SelectInput from "../app/components/forms/SelectInput";
import {
  defaultPaymentOption,
  lineItemCategoryOptions,
  paymentMethodOptions,
} from "../app/data/options";
import { defaultLineItem } from "@/app/data/default_values";

export default function Playground() {
  const { handleSubmit, reset, control, watch } =
    useForm<InvoiceSaveForm>({
      defaultValues: {
        date: new Date(),
        place: "",
        payment_method: defaultPaymentOption.value,
        total: 0,
        lineitems: [],
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineitems",
  });
  const watchLineItem = watch("lineitems");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchLineItem[index],
    };
  });

  const onSubmit = handleSubmit((data: InvoiceSaveForm) => {
    console.log(data);
  });

  const handleClose = () => {
    reset({
      date: new Date(),
      place: "",
      payment_method: defaultPaymentOption.value,
      total: 0,
    });
  };

  const handleAddLineItem = () => {
    append(defaultLineItem);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Add New Invoice</h1>
        <div>
          <div>To add a new invoice. Fill in the details below.</div>
          <List>
            <ListItem>
              <DateInput name="date" control={control} label="Date" />
            </ListItem>
            <ListItem>
              <TextInput
                name="place"
                control={control}
                label="Place"
                text_type="text"
              />
            </ListItem>
            <ListItem>
              <TextInput
                name="total"
                control={control}
                label="Total"
                text_type="number"
              />
            </ListItem>
            <ListItem>
              <SelectInput
                name="payment_method"
                control={control}
                label="Payment Method"
                options={paymentMethodOptions}
              />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5">Line items</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="outlined" onClick={handleAddLineItem}>
                    Add Line Item
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            {controlledFields.map((field, index) => {
              return (
                <ListItem key={field.id}>
                  <Grid container>
                    <Grid item xs={2}>
                      <TextInput
                        name={`lineitems.${index}.name`}
                        control={control}
                        label="Name"
                        text_type="text"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <SelectInput
                        name={`lineitems.${index}.category`}
                        control={control}
                        label="Category"
                        options={lineItemCategoryOptions}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextInput
                        name={`lineitems.${index}.quantity`}
                        control={control}
                        label="Quantity"
                        text_type="number"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <TextInput
                        name={`lineitems.${index}.total`}
                        control={control}
                        label="Total"
                        text_type="number"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0 auto",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmit}>Save</Button>
        </div>
      </form>
    </div>
  );
}
