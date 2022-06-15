export interface Results {
  results: [UserDetails];
}
interface UserDetails {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: [];
  dob: [];
  registered: [];
  phone: string;
  cell: string;
  id: [];
  picture: [];
  nat: string;
}
interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: {
    number: number;
    name: string
  };
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: {
    latitude: string;
    longitude: string
  };
  timezone: {
    offset: string;
    description: string
  };
}
