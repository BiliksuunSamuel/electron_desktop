import { INewOrder, IUser } from "../interface/IModel";

export const phone_regex = /^\d{10}$/;
const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateUserInfo(info: {
  phone: string;
  username: string;
  password: string;
}) {
  try {
    if (info.username.length <= 0) {
      throw "user name required";
    }
    if (!phone_regex.test(info.phone)) {
      throw "Invalid Phone Number";
    }
    if (info.password.length <= 0) {
      throw "Password Required";
    }
  } catch (error) {
    throw error;
  }
}

export function ValidateOrderInfo(info: INewOrder) {
  if (info.customer.name.length <= 0) {
    throw "Customer Name Required";
  }
  if (!phone_regex.test(info.customer.phone)) {
    throw "Invalid Phone Number";
  }
  if (Boolean(info.customer.email) && !email_regex.test(info.customer.email)) {
    throw "Invalid Email Address";
  }
  if (info.order.content.length <= 0) {
    throw "Please Add Item To The Order";
  }
}
