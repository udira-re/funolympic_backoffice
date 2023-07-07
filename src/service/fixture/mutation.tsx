import httpUtils from "../../utils/httpBase.utils";

export const CREATE_FIXTURE = (data: any) => {
  return httpUtils.store("/fixture", data);
};
