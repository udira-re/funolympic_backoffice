import httpUtils from "../../utils/httpBase.utils";

export const LOGIN = (data: any) => {
  return httpUtils.store("auth/admin/login", data);
};
