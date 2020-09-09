import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

$(document).ready(function () {
  let request2 = new XMLHttpRequest();
  const url2 = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}&limit=10`;

  request2.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response2 = JSON.parse(this.responseText);
      trendingElements(response2);
    }
  };

  request2.open("GET", url2, true);
  request2.send();

  function trendingElements(response) {
    for (let i = 0; i < 10; i++) {
      $("#showTrending").append(`<img src=${response.data[i].images.fixed_height.url}>`);
    }
  }
  $("#searchButton").click(function () {
    const searchInput = $("#searchGIF").val();
    $("#showTrending").hide()
    $("#searchGIF").val("");
    $("#showSearch").html("");

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${process.env.API_KEY}&limit=10`;

    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      for (let i = 0; i < 10; i++) {
        $("#showSearch").append(`<img src=${response.data[i].images.fixed_height.url}>`);
      }
    }
  });
  $("#randomButton").click(function () {
    let request3 = new XMLHttpRequest();
    const url3 = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;

    request3.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response3 = JSON.parse(this.responseText);
        plzWork(response3);
      }
    };

    request3.open("GET", url3, true);
    request3.send();

    function plzWork(response3) {
      console.log(response3)
      $("#showRandom").html(`<img src=${response3.data.images.fixed_height.url}>`);
    }
  });
  $(`#uploadButton`).click(function () {
    const fileInput = $("#uploadFile").val();
    console.log(fileInput)
    let request4 = new XMLHttpRequest();
    const url4 = `http://upload.giphy.com/v1/gifs?api_key=${process.env.API_KEY}&file=${fileInput}`;

    request4.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response4 = JSON.parse(this.responseText);
        plzWork(response4);
      }
    };

    request4.open("POST", url4, true);
    request4.send();

    function plzWork(response4) {
      $("#showUpload").html(`<img src=${response4.data.images.fixed_height.url}>`);
    }
  });
});