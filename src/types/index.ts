export interface Study {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
    };
    conditionsModule: {
      conditions: string[];
    };
  };
}

export interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  agree: boolean;
  nctId: string;
}
