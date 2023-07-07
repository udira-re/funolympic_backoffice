import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_USER = () => {
  return httpUtils.get("/user");
};
