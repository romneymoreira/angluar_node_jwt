declare var iziToast: any;

export function successMessage(message: any) {
  return iziToast.show({
    title: 'Success',
    color: 'green',
    icon: 'fa fa-check',
    position: 'bottomCenter',
    layout: 2,
    balloon: true,
    message
  });
}

export function errorMessage(message: any) {
  return iziToast.show({
    title: 'Error',
    color: 'red',
    icon: 'fa fa-exclamation',
    position: 'bottomCenter',
    layout: 2,
    balloon: true,
    message
  });
}
