/// <reference path="/home/deborah/.local/share/jquery-3.7.0.js"/>

$(() => {


  $("#all").on("click", get_all);

  async function get_all() {
    $('#search_input').val("");
    await get_url("https://restcountries.com/v3.1/all");
    // try {
    //   const data = await get_json("https://restcountries.com/v3.1/all");
    //   display_stats(data);
    //   display_regions(data);
    //   get_currencies(data);
    //   display_all(data);
    // } catch (error) {
    //   alert(error.message)
    // }
  }


  $("#search").on("click", get_search);
  $("#search_input").on("keyup", function () {
    if ($(this).val() !== "") {
      $(this).attr("aria-invalid", null);
    }
  });

  async function get_search() {
    const input_value = $('#search_input').val();
    // $("#search_input").attr("aria-invalid", "false");
    if (input_value === "") {
      $("#search_input").attr("aria-invalid", "true");
      return;
    }

    await get_url(`https://restcountries.com/v3.1/name/${input_value}`);
    // try {
    //   const data = await get_json(`https://restcountries.com/v3.1/name/${input_value}`);
    //   if (data.message === "Page Not Found") {
    //     alert("Page Not Found");
    //     return;
    //   }

    //   display_stats(data);
    //   display_regions(data);
    //   get_currencies(data);
    //   display_all(data);
    // } catch (error) {
    //   alert(error.message);
    // } finally {
    //   $(this).attr("aria-busy", null)
    // }
  }

  async function get_url(url) {
    $(this).attr("aria-busy", true);
    try {
      const data = await get_json(url);

      display_stats(data);
      display_regions(data);
      get_currencies(data);
      display_all(data);
    } catch (error) {
      alert(error.message);
    } finally {
      $(this).attr("aria-busy", null)
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

    $("#stats").append(`
      <h5>Stats</h5>
      <div>Total countries result: ${total_countries}</div>
      <div>Total Countries Population: ${total_population}</div>
      <div>Average Population: ${avg_population.toFixed(0)}</div>`
    ).show();
  }

  function get_currencies(countries) {
    let currencies = {};
    let list_of_currencies = "";

    for (const country of countries) {
      for (const key in country.currencies) {
        currencies[key] = (currencies[key] || 0) + 1;
        // if (key in currencies) {
        //   currencies[key]++;
        // } else {
        //   currencies[key] = 1;
        // }
      }
    }

    for (const key in currencies) {
      list_of_currencies += `<li>${key} - ${currencies[key]}</li>`;
    }

    $("#currency").html(`<h5>Currencies - How many useage</h5><ul>${list_of_currencies}</ul>`).show();
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
    ).show();
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
    ).show();
  }
});


