define(function () {
  return function () {
    const option = document.createElement('option');
    option.innerHTML = 'All';
    option.value = '*';
    return option;
  };
});
