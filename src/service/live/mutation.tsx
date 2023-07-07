import httpUtils from "../../utils/httpBase.utils";

export const CREATE_LIVE = (data: any) => {
  return httpUtils.saveWithFile("live", data);
};

export const DELETE_COMMENT = (id: any) => {
  return httpUtils.remove(`/comment/${id}`);
};
