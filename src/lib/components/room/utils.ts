export const pointTextSize = (point: number) => {
  switch (point.toString()) {
    case '0':
    case '0.5':
    case '1':
      return '1rem';
    case '2':
      return '1.2rem';
    case '3':
      return '1.4rem';
    case '5':
      return '2rem';
    case '8':
    case '13':
      return '3rem';
    case '20':
    case '40':
    case '60':
    case '80':
    case '100':
      return '4rem';
    default:
      return '1rem';
  }
};

export const pointTextColor = (point: number) => {
  switch (point.toString()) {
    case '0':
    case '0.5':
    case '1':
    case '2':
      return undefined;
    case '3':
      return 'orange';
    case '5':
    case '8':
    case '13':
    case '20':
    case '40':
    case '60':
    case '80':
    case '100':
      return 'red';
    default:
      return undefined;
  }
};
