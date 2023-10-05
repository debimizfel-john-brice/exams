/// <reference path="/home/deborah/.local/share/jquery-3.7.0.js"/>

$(() => {


  $("#all").on("click", get_all);

  async function get_all() {
    $('#search_input').val("");
    try {
      const data = await get_json("https://restcountries.com/v3.1/all");
      display_stats(data);
      display_regions(data);
      get_currencies(data);
      display_all(data);
    } catch (error) {
      alert(error.message)
    }
  }


  $("#search").on("click", get_search);

  async function get_search() {
    try {
      const input_value = $('#search_input').val();
      $("#search_input").css("border-color", "");
      if (input_value === "") {
        $("#search_input").css("border-color", "red");
        return;
      }

      const data = await get_json(`https://restcountries.com/v3.1/name/${input_value}`);
      if (data.message === "Page Not Found") {
        alert("Page Not Found");
        return;
      }

      display_stats(data);
      display_regions(data);
      get_currencies(data);
      display_all(data);
    } catch (error) {
      alert(error.message);

    }
  }

  function get_json(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        success: resolve,
        error: err => reject(err.statusText)
      });
    });
  }

  function display_stats(countries) {

    let total_population = 0;
    for (const country of countries) {
      total_population += country.population;
    }

    const total_countries = countries.length;
    const avg_population = total_population / total_countries;

    $("#stats").text(`Total countries result: ${total_countries}`);
    $("#stats").append(`<br>Total Countries Population: ${total_population}`);
    $("#stats").append(`<br>Average Population: ${avg_population.toFixed(0)}<hr>`);
  }

  function get_currencies(countries) {
    let currencies = {};
    let list_of_currencies = "";
    const cur = new Set();

    for (const country of countries) {
      for (const key in country.currencies) {
        if (key in currencies) {
          currencies[key]++;
        } else {
          currencies[key] = 1;
        }
        cur.add(key);
      }
    }

    for (const key in currencies) {
      list_of_currencies += `<li>${key} - ${currencies[key]}</li>`;
    }

    $("#currency").html(`<h5>Currencies - Useage</h5><ul>${list_of_currencies}</ul>`);
  }


  function display_all(countries) {
    let row = "";
    for (const country of countries) {
      row += stats_html(country);
    }

    $("#countries").html(`
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Country Name</th>
          <th scope="col">Number of citizens</th>
        </tr>
      </thead>
      <tbody>${row}</tbody>
    </table>`
    );
  }

  function stats_html(country) {
    return `
    <tr>
      <td>${country.name.common}</td>
      <td>${country.population}</td>
    </tr>
    `;
  }

  function display_regions(countries) {
    let regions = {};

    for (const country of countries) {
      if (country.region in regions) {
        regions[country.region]++;
      } else {
        regions[country.region] = 1;
      }
    }

    let table_content = "";
    for (const key in regions) {
      table_content += `<tr><td>${key}</td><td>${regions[key]}</td></tr>`;
    }

    $("#regions").html(`
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">Region</th>
          <th scope="col">Number of countries</th>
        </tr>
      </thead>
      <tbody>${table_content}</tbody>
    </table>`
    );
  }
});


