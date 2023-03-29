"use strict";

const no = document.querySelector(".no0");
const maincont = document.querySelector(".maincont");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

//lat, lng pos
const getposdata = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then((res) => res.json())
    .then((obj) => {
      console.log(obj);
      const html = ` <div class="no1">현재 위치</div>
      <p class="no2">
        <span class="no3">latitude: ${lat}</span><span class="no4">longitude: ${lng}</span>
      </p>`;

      no.insertAdjacentHTML("beforeend", html);
      ///////////////////////////////////////////////////////
    });
};

const pos = function () {
  return new Promise(function (res, rej) {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

const npos = function () {
  pos().then((res) => {
    getposdata(res.coords.latitude, res.coords.longitude);
  });
};

npos();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//search
const getapi = function (con) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://restcountries.com/v3.1/name/${con}`);
  req.send();

  req.addEventListener("load", function () {
    const [obj] = JSON.parse(this.responseText);
    console.log(obj);
  });
};
const getdata = function (obj) {
  const html = `<section class="box">
    <img class="flag__img" src="${obj.flags.svg}"/>
    <div class="index">
      <h1 class="name">${obj.name.common} (${obj.region}) </h1>
      <p class="el1">${obj.population.toLocaleString("ko-KR")} people</p>
       <p class="el2">languages: ${Object.values(obj.languages)[0]}</p>
      <p class="el3">currencies: ${Object.values(obj.currencies)[0].name}</p>
      <p class="el4">capital: ${obj.capital[0]}</p>
    </div>
  </section>
  `;

  maincont.insertAdjacentHTML("beforeend", html);
};

/////////////////////////////////////////////////////////
const getapianddata = function (con) {
  const req = new XMLHttpRequest();
  try {
    req.open("GET", `https://restcountries.com/v3.1/name/${con}`);
    req.send();

    req.addEventListener("load", function () {
      const [obj] = JSON.parse(this.responseText);
      console.log(obj);

      //obj data

      getdata(obj);

      neighborcount(obj.borders[0]);
    });
  } catch (err) {
    console.err(err);
  }
};

const start = function (con) {
  const req = new XMLHttpRequest();
  try {
    req.open("GET", `https://restcountries.com/v3.1/name/${con}`);
    req.send();
    req.addEventListener("load", function () {
      const [obj] = JSON.parse(this.responseText);
      console.log(obj);
      //obj data
      getdata(obj);
    });
  } catch (err) {
    console.err(err);
  }
};
start("korea");
//neighbor

const neighborcount = function (con) {
  const req = new XMLHttpRequest();
  req.open("GET", `https://restcountries.com/v3.1/name/${con}`);
  req.send();

  req.addEventListener("load", function () {
    const [obj] = JSON.parse(this.responseText);
    console.log(obj);

    const html = `<section class="box neighbor">
        <img class="flag__img" src="${obj.flags.svg}"/>
        <div class="index">
          <h1 class="name">${obj.name.common} (${obj.region}) </h1>
          <p class="el1">${obj.population.toLocaleString("ko-KR")} people</p>
           <p class="el2">languages: ${Object.values(obj.languages)[0]}</p>
          <p class="el3">currencies: ${
            Object.values(obj.currencies)[0].name
          }</p>
          <p class="el4">capital: ${obj.capital[0]}</p>
        </div>
      </section>
      `;

    maincont.insertAdjacentHTML("beforeend", html);
  });
};

//event

const eve = function (e) {
  e.preventDefault();
  const inp = document.querySelector(".input").value;
  // const box = document.querySelector(".box");
  // box.style.opacity = 1;
  const maincont = document.querySelector(".maincont");
  maincont.innerHTML = "";
  getapianddata(inp);
};

btn.addEventListener("click", function (e) {
  eve(e);
  no.style.opacity = 0;
});

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    eve(e);
    no.style.opacity = 0;
  }
});

  