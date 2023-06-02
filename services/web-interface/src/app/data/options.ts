import { ISelectOption } from "../interfaces/invoice";

export const defaultPaymentOption: ISelectOption = {
  label: "Chase Credit Card",
  value: "chase credit card",
};

export const paymentMethodOptions: ISelectOption[] = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Chase Checking",
    value: "chase checking",
  },
  {
    label: "Chase Credit Card",
    value: "chase credit card",
  },
  {
    label: "Chase Debit Card",
    value: "chase debit card",
  },
  {
    label: "Travel Card",
    value: "travel card",
  },
];

export const defaultLineItemCategoryOption: ISelectOption = {
  label: "Food",
  value: "food",
};

export const lineItemCategoryOptions: ISelectOption[] = [
  {
    label: "Clothes & Gear",
    value: "clothes & gear",
  },
  {
    label: "Cosmetics",
    value: "cosmetics",
  },
  {
    label: "Electronics",
    value: "electronics",
  },
  {
    label: "Food",
    value: "food",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
  {
    label: "Laundry",
    value: "laundry",
  },
  {
    label: "Leisure",
    value: "leisure",
  },
  {
    label: "Other",
    value: "other",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Services",
    value: "services",
  },
  {
    label: "Tax",
    value: "tax",
  },
  {
    label: "Tip",
    value: "tip",
  },
];
