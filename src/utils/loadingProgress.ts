import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
});

export const start = NProgress.start;
export const done = NProgress.done;
