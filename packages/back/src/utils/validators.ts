export const checkEnv = (envVar:string) => {
  if (process.env[envVar]) return process.env[envVar] as string;

  throw new Error(`Please define the Enviroment variable ${envVar}`);
};
