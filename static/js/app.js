//Read in JSON file and establish dropdown menu of options
var jsonPath = `data/samples.json`;
d3.json(jsonPath).then(function (data) {
    console.log(data);

    var names = Object.values(data.names);
    var dropDownlist = document.getElementById('selDataset');
    for (i = 0; i < names.length; i++) {
        dropDownlist.options[i] = new Option(names[i]);
    };
});

// Initialize Dashboard with an ID
function init() {
    buildPlot('940');
};

init();

// Connect html dropdown menu to plot constructor function
function optionChanged() {
    dropDownMenu = d3.select('#selDataset');
    id = dropDownMenu.property('value');
    console.log(id);
    buildPlot(id);
};

optionChanged();


// // Unpack function for listed arrays
// function unpack(rows, index) {
//     return rows.map(function (row) {
//         return row[index];
//     });
// };


// Extract Transform and Load Desired JSON Data Into Dashboard Elements
function buildPlot(id) {

    var jsonPath = `data/samples.json`;
    d3.json(jsonPath).then(function (data) {
        console.log(data);

        // Assign 'sample' json data to a variable
        var sampleSet = data['samples'];

        // Assign 'metadata' json data to a variable
        var metaData = data['metadata'];

        // Filter metadata on chosen id from dropdown menu
        var chosenMeta = metaData.filter(record => record.id == id);
        console.log(chosenMeta);

        // Extract Transform and Load Metadata into Panel
        var wayTooMeta = Object.entries(chosenMeta[0]);
        console.log(wayTooMeta);

        // Format Metadata  
        var cleanedMeta = wayTooMeta.map(entry => entry.join(': '));

        // Reset List
        d3.select('#sample-metadata>ul').remove();

        // Build UL Tag in index.html using d3 command
        var metaList = d3.select('#sample-metadata').append('ul');

        // Append li tags and content to ul
        cleanedMeta.forEach(item => {
            var itemText = metaList.append('li');
            itemText.text(`${item}`);
        });

        // Filter Dataset on chosen id from dropdown menu
        var chosenData = sampleSet.filter(record => record.id == id);
        console.log(chosenData);

        // Extract primary plot arrays from json call
        var sampleValues = chosenData[0]['sample_values'];
        var otuLabels = chosenData[0]['otu_labels'];
        var otuIds = chosenData[0]['otu_ids'];

        // Clean Transform OTU ID's into plottable categorical variable //
        var cleanOtuIDs = [];

        Object.values(otuIds).forEach((id) => {
            var items = (`OTU:${id}`);
            cleanOtuIDs.push(items);
        });
        console.log(cleanOtuIDs);

        // Horizontal Bar Chart
        var trace1 = {
            y: cleanOtuIDs.slice(0, 10).reverse(),
            x: sampleValues.slice(0, 10).reverse(),
            type: 'bar',
            hovertext: otuLabels.slice(0, 10).reverse(),
            orientation: 'h',
        };

        var data = [trace1];

        var layout = {
            title: 'Top 10 OTU IDs by Sample Value',
            font: {
                family: 'Raleway, sans-serif'
            },
            // showlegend: false,
            xaxis: {
                tickangle: -45
            }
        };

        Plotly.newPlot('bar', data, layout);

        // Bubble Chart //
        var trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                colorscale: 'Viridis',
                size: sampleValues
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Belly Button Bubble Chart',
            showlegend: false,
            xaxis: {
                title: 'OTU IDs'
            },
            yaxis: {
                title: 'Sample Value'
            }
        };

        Plotly.newPlot('bubble', data, layout);

        // Gauge Chart //
        var data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: chosenMeta[0]['wfreq'],
                title: { text: "Belly Button Wash Frequencey (d/wk)", font: { size: 24 } },
                gauge: {
                    axis: {
                        range: [null, 9], tickmode: 'linear', tickwidth: 1, tickcolor: "#34495e", tickfont: {
                            size: 18, family: 'Raleway, sans-serif'
                        }
                    },
                    bar: { color: "#34495e" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "#34495e",
                    steps: [
                        { range: [0, 1], color: '#e74c3c' },
                        { range: [1, 2], color: '#d35400' },
                        { range: [2, 3], color: '#e67e22' },
                        { range: [3, 4], color: '#f39c12' },
                        { range: [4, 5], color: '#f1c40f' },
                        { range: [5, 6], color: '#27ae60' },
                        { range: [6, 7], color: '#2ecc71' },
                        { range: [7, 8], color: '#3498db' },
                        { range: [8, 9], color: '#9b59b6' },
                    ],

                }
            }
        ];

        var layout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "#34495e", family: "Raleway, sans-serif" }
        };

        Plotly.newPlot('gauge', data, layout);

    });

};



