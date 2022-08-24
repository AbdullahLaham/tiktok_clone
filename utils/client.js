import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ulw905va',
  dataset: 'production',
  apiVersion: '2022-08-23',
  useCdn: false,
  token: 'skWN5N7BiKJ6WcWYPu3MCzTYF4CBMlhSGFaKMm3FubJmkFBLpMUdjeEADHFGuuPTgrtmlvL5y0yyf1TWlZjdbfAHDFHpMX10eCO7wmYkbN4iVxHsJ1ooySiKElgsEb6fi0bQ0LnMGaNOFalHmfvzGny9LgNWfVrXinFlCyyQEKdqgBfTvCsC',
});