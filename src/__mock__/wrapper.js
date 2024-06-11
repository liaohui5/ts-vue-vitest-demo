export const success = (data = null, msg = "success") => ({
  success: true,
  data,
  msg,
});

export const error = (data = null, msg = "error") => ({
  success: false,
  data,
  msg,
});
