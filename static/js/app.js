//Grab List of Sample Names
idArray = d3.json(`../../data/samples.json`, function (data) { data['names'] });
console.log(idArray);

// Fill dropdown selection menu
function assignOptions(textArray, selector) {
    for (var i = 0; i < textArray.length; i++) {
        var currentOption = document.createElement('option');
        currentOption.text = textArray[i];
        selector.appendChild(currentOption);
    }
}

assignOptions(listofCountries, countrySelector);

countrySelector.addEventListener('change', updateCountry, false);

// Assign User Selection to Variable
var id = d3.select('#selDataset');

// Fetch data from samples.json

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

function getJsonData(id) {

    var jsonPath = `../../data/samples.json`;
    d3.json(jsonPath).then(function (data) {
        console.log(data);
        if (data['samples']['id'] == id && data['metadata']['id'] == id) {
            var sampleValues = data['samples']['sample_values'];
            var otuIds = data['samples']['otu_ids'];
            var otuLabels = data['samples']['otu_labels'];
            var id = unpack(data['metadata'], 0);
            var ethnicity = unpack(data['metadata'], 1);
            var age = unpack(data['metadata'], 2);
            var location = unpack(data['metadata'], 3);
            var bbtype = unpack(data['metadata'], 4);
            var wfreq = unpack(data['metadata'], 5);
            buildPanel(id, ethnicity, age, location, bbtype, wfreq)
        };
    });
};

function buildPanel(id, ethnicity, age, location, bbtype, wfreq) {
    var table = d3.select("#sample-metadata");
    var tbody = table.select("tbody");
    var trow;
    for (var i = 0; i < 1; i++) {
        trow = tbody.append("tr");
        trow.append("td").text(id[i]);
        trow.append("td").text(ethnicity[i]);
        trow.append("td").text(age[i]);
        trow.append("td").text(location[i]);
        trow.append("td").text(bbtype[i]);
        trow.append("td").text(wfreq[i]);
    }
};

// Horizontal Bar Chart
var trace1 = {
    y: ['Liam', 'Sophie', 'Jacob', 'Mia', 'William', 'Olivia'],
    x: [8.0, 8.0, 12.0, 12.0, 13.0, 20.0],
    type: 'bar',
    text: ['4.17 below the mean', '4.17 below the mean', '0.17 below the mean', '0.17 below the mean', '0.83 above the mean', '7.83 above the mean'],
    marker: {
        color: 'rgb(142,124,195)'
    },
    orientation: 'h'
};

var data = [trace1];

var layout = {
    title: 'Number of Graphs Made this Week',
    font: {
        family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
        tickangle: -45
    },
    yaxis: {
        zeroline: false,
        gridwidth: 2
    },
    bargap: 0.05
};

Plotly.newPlot('bar', data, layout);

// Bubble Chart 
var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    mode: 'markers',
    marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        size: [40, 60, 80, 100]
    }
};

var data = [trace1];

var layout = {
    title: 'Bubble Chart Hover Text',
    showlegend: false,
    height: 600,
    width: 600
};

Plotly.newPlot('bubble', data, layout);


// Gauge Chart
var data = [
    {
        type: "indicator",
        mode: "gauge+number+delta",
        value: 420,
        title: { text: "Speed", font: { size: 24 } },
        delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
            axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
                { range: [0, 250], color: "cyan" },
                { range: [250, 400], color: "royalblue" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: 490
            }
        }
    }
];

var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('gauge', data, layout);