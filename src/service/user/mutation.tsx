import httpUtils from "../../utils/httpBase.utils";

export const DELETE_USER = (id: any) => {
  return httpUtils.remove(`/user/${id}`);
};
