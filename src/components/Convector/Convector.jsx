import React from 'react';
import './Convector.scss';

let listVaiue;
let info_l = 'USD';
let info_r = 'UAH';
let valut = {};
let convector_activ;

window.onload = () => {
  fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .then(response => response.json())
  .then(result => {
    for (let i of result) {
      valut[i.cc] = i.rate;
      if (i.cc === 'USD') { document.getElementById('header-1').innerHTML = `USD: ${+(i.rate).toFixed(2)}` };
      if (i.cc === 'EUR') { document.getElementById('header-2').innerHTML = `EUR: ${+(i.rate).toFixed(2)}` };
      if (i.cc === 'PLN') { document.getElementById('header-3').innerHTML = `PLN: ${+(i.rate).toFixed(2)}` };
      if (i.cc === 'GBP') { document.getElementById('header-4').innerHTML = `GBP: ${+(i.rate).toFixed(2)}` };
    };
    valut.UAH = 1;
  })
  .catch(error => console.log('error', error));

  document.getElementById('USD_l').style.cssText = 'color: blue; background-color: #e0e1e4';
  document.getElementById('UAH_r').style.cssText = 'color: blue; background-color: #e0e1e4';
}

const Convector = () => (
  <>
    <div className='convector'>
      <header className='convector__header'>
        <div id='header-1' className="convector__header__blok"></div>
        <div id='header-2' className="convector__header__blok"></div>
        <div id='header-3' className="convector__header__blok"></div>
        <div id='header-4' className="convector__header__blok"></div>
      </header>

      <div className="convector__blok">
        <div className="convector__blok__lr">
          <div className="convector__blok__panel">
            <a id='USD_l' onClick={valut_l} className='valut'>USD</a>
            <a id='UAH_l' onClick={valut_l} className='valut'>UAH</a>
            <a id='EUR_l' onClick={valut_l} className='valut'>EUR</a>
            <a id='PLN_l' onClick={valut_l} className='valut'>PLN</a>
          </div>
          <input
            id='list_l'
            onInput={convecto_l}
            className='convector__blok__info'
            type="number"
            min={0}
            placeholder={0}
          />
        </div>
        <div className="convector__blok__centr">⇄</div>
        <div className="convector__blok__centrBootam">⇅</div>
        <div className="convector__blok__lr">
          <div className="convector__blok__panel">
            <a id='USD_r' onClick={valut_r} className='valut'>USD</a>
            <a id='UAH_r' onClick={valut_r} className='valut'>UAH</a>
            <a id='EUR_r' onClick={valut_r} className='valut'>EUR</a>
            <a id='PLN_r' onClick={valut_r} className='valut'>PLN</a>
          </div>
          <input
            id='list_r'
            onInput={convecto_r}
            className='convector__blok__info'
            type="number"
            min={0}
            placeholder={0}
          />
        </div>
      </div>
    </div>
  </>
);

const convecto_l = () => {
  listVaiue = document.getElementById('list_l').value;
  document.getElementById('list_r').value = +((valut[info_l] / valut[info_r]) * listVaiue).toFixed(2);
  convector_activ = true;
};

const convecto_r= () => {
  listVaiue = document.getElementById('list_r').value;
  document.getElementById('list_l').value = +((valut[info_r] / valut[info_l]) * listVaiue).toFixed(2);
  convector_activ = false;
};

const valut_l = (event) => {
  document.getElementById('USD_l').style.cssText = '';
  document.getElementById('UAH_l').style.cssText = '';
  document.getElementById('EUR_l').style.cssText = '';
  document.getElementById('PLN_l').style.cssText = '';

  event.target.style = 'color: blue; background-color: #e0e1e4';

  info_l = event.target.innerHTML;

  if (convector_activ != undefined) {
    if (convector_activ) {
      document.getElementById('list_l').value = listVaiue;
      document.getElementById('list_r').value = +((valut[info_l] / valut[info_r]) * listVaiue).toFixed(2);
    } else {
      document.getElementById('list_l').value = +((valut[info_r] / valut[info_l]) * listVaiue).toFixed(2);
      document.getElementById('list_r').value = listVaiue;
    }
  };

};

const valut_r = (event) => {
  document.getElementById('USD_r').style.cssText = '';
  document.getElementById('UAH_r').style.cssText = '';
  document.getElementById('EUR_r').style.cssText = '';
  document.getElementById('PLN_r').style.cssText = '';

  event.target.style = 'color: blue; background-color: #e0e1e4';

  info_r = event.target.innerHTML;

  if (convector_activ != undefined) {
    if (convector_activ) {
      document.getElementById('list_l').value = listVaiue;
      document.getElementById('list_r').value = +((valut[info_l] / valut[info_r]) * listVaiue).toFixed(2);
    } else {
      document.getElementById('list_l').value = +((valut[info_r] / valut[info_l]) * listVaiue).toFixed(2);
      document.getElementById('list_r').value = listVaiue;
    }
  }

};

export default Convector