/* eslint-disable max-len */

export const timeRegex = /^[0-2][0-9]:[0-5]0$/;

export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// -- Accepts date format: YYYY-MM-DD ex:(2022-02-23)
export const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
