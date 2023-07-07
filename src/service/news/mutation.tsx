import httpUtils from "../../utils/httpBase.utils";

export const CREATE_NEWS = (data: any) => {
  return httpUtils.saveWithFile("news", data);
};
