import StatusCode from '../enums';

interface IDomainError extends Error {
  domain: boolean;
  message: string;
  code: StatusCode
}

export default IDomainError;
