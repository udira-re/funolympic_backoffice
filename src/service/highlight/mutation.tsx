import httpUtils from "../../utils/httpBase.utils";

export const CREATE_HIGHLIGHT = (data: any) => {
  return httpUtils.saveWithFile(`highlight`, data);
};
