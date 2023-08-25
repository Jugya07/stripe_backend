function response(msg, status) {
  return {
    status,
    msg,
  };
}

function error(msg = "Internal Server Error", status = 500) {
  return response(msg, status);
}

export { response, error };
