import httpUtils from "../../utils/httpBase.utils";

export const GET_ALL_LIVE = () => {
  return httpUtils.get("/live");
};

export const GET_LIVE_COMMENT = (id: any) => {
  return httpUtils.get(`/comment/admin/${id.queryKey[1]}`);
};
