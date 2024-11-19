import './style.css'

const form = document.forms[0];
const ip = form.elements.namedItem('ip') as HTMLInputElement;

form.addEventListener('submit', e => {
  e.preventDefault();
  const submitterValue = (e.submitter as HTMLButtonElement).value;
  const props = ['red', 'yellow', 'green', 'buzzer', 'clear'] as const;
  const type = props.find(prop => submitterValue.includes(prop));
  if (!type) return;

  const url = new URL(`http://${ip.value}/api/control`);
  if (type === 'clear') {
    url.searchParams.set('clear', '1');
    fetch(url);
    return;
  }
  const alertParam = '999999'.split('');
  const replaceIndexes = {
    red: 0,
    yellow: 1,
    green: 2,
    buzzer: 5,
  };
  const num = submitterValue.replace(type, '');
  alertParam[replaceIndexes[type]] = num;
  url.searchParams.set('alert', alertParam.join(''));
  fetch(url);
});