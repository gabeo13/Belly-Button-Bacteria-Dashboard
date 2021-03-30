//Read in JSON file and establish dropdown menu of options
var jsonPath = `../../data/samples.json`;
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

// Connect dropdown menu to plot constructor
function optionChanged() {
    dropDownMenu = d3.select('#selDataset');
    id = dropDownMenu.property('value');
    console.log(id);
    buildPlot(id);
};

optionChanged();


// Unpack function for listed arrays
function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
};


// Extract Transform and Load Desired JSON Data Into Dashboard Elements
function buildPlot(id) {

    var jsonPath = `../../data/samples.json`;
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

        // reformat the info  
        const cleanedMeta = wayTooMeta.map(entry => entry.join(': '));

        // clear existing list
        d3.select('#sample-metadata>ul').remove();

        // create a list of subject's demographic data
        const metaList = d3.select('#sample-metadata').append('ul');

        // append demographic info to metadata panel
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

        //Clean Transform OTU ID's into plottable categorical variable
        const cleanOtuIDs = [];

        Object.values(otuIds).forEach((id) => {
            var items = (`OTU:${id}`);
            cleanOtuIDs.push(items);
        });
        console.log(cleanOtuIDs);

        // Horizontal Bar Chart
        var trace1 = {
            y: cleanOtuIDs,
            x: sampleValues,
            type: 'bar',
            hovertext: otuLabels,
            orientation: 'h'
        };

        var data = [trace1];

        var layout = {
            title: 'Sample Value by ID',
            font: {
                family: 'Raleway, sans-serif'
            },
            // showlegend: false,
            xaxis: {
                tickangle: -45
            }
        };

        Plotly.newPlot('bar', data, layout);

        // Bubble Chart 
        var trace1 = {
            x: otuIds,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIds,
                size: sampleValues
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Belly Button Bubble Chart',
            showlegend: false,
        };

        Plotly.newPlot('bubble', data, layout);

    });




    // // Gauge Chart
    // var data = [
    //     {
    //         type: "indicator",
    //         mode: "gauge+number+delta",
    //         value: 420,
    //         title: { text: "Speed", font: { size: 24 } },
    //         delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    //         gauge: {
    //             axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
    //             bar: { color: "darkblue" },
    //             bgcolor: "white",
    //             borderwidth: 2,
    //             bordercolor: "gray",
    //             steps: [
    //                 { range: [0, 250], color: "cyan" },
    //                 { range: [250, 400], color: "royalblue" }
    //             ],
    //             threshold: {
    //                 line: { color: "red", width: 4 },
    //                 thickness: 0.75,
    //                 value: 490
    //             }
    //         }
    //     }
    // ];

    // var layout = {
    //     width: 500,
    //     height: 400,
    //     margin: { t: 25, r: 25, l: 25, b: 25 },
    //     paper_bgcolor: "lavender",
    //     font: { color: "darkblue", family: "Arial" }
    // };

    // Plotly.newPlot('gauge', data, layout);

};



