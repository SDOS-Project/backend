import { config } from './config';

const firebaseConfig = {
  projectId: config.projectId,
  private_key: config.private_key,
  client_email: config.client_email,
};

export default firebaseConfig;
