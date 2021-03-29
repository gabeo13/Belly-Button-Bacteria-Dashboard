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



function buildPlot(id) {

    var jsonPath = `../../data/samples.json`;
    d3.json(jsonPath).then(function (data) {
        console.log(data);
        var sampleSet = data['samples'];
        console.log(sampleSet);

        var chosenData = sampleSet.filter(record => record.id == id);
        console.log(chosenData);

        var sampleValues = chosenData[0]['sample_values'];
        var otuLabels = chosenData[0]['otu_labels'];
        var otuIds = chosenData[0]['otu_ids'];

        // Horizontal Bar Chart
        var trace1 = {
            y: otuIds,
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

    });

    // // Bubble Chart 
    // var trace1 = {
    //     x: [1, 2, 3, 4],
    //     y: [10, 11, 12, 13],
    //     text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
    //     mode: 'markers',
    //     marker: {
    //         color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    //         size: [40, 60, 80, 100]
    //     }
    // };

    // var data = [trace1];

    // var layout = {
    //     title: 'Bubble Chart Hover Text',
    //     showlegend: false,
    //     height: 600,
    //     width: 600
    // };

    // Plotly.newPlot('bubble', data, layout);


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



