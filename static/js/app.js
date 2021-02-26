function Plot(id) {
        d3.json("samples.json").then (data =>{
            console.log(data)
            var ids = data.samples[0].otu_ids;
            console.log(ids)
            var sValues =  data.samples[0].sample_values.slice(0,10).reverse();
            console.log(sValues)
            var labels =  data.samples[0].otu_labels.slice(0,10);
            console.log (labels)
            var OTU_top = ( data.samples[0].otu_ids.slice(0, 10)).reverse();
            var OTU_id = OTU_top.map(d => "OTU " + d);
            console.log(`OTU IDS: ${OTU_id}`)
            var labels =  data.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            var data = [trace];
            var layout = {
                title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
        Plotly.newPlot("bar", data, layout);
            var trace1 = {
                x: data.samples[0].otu_ids,
                y: data.samples[0].sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: data.samples[0].sample_values,
                    color: data.samples[0].otu_ids
                },
    
            };
            var data1 = [trace1];   
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                showlegend: true,
                height: 600,
                width: 1000
            };
    
    
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    function DemoIn(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
    
            console.log(metadata)
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
           var demographicInfo = d3.select("#sample-metadata");   
           demographicInfo.html("");
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    function optionChanged(id) {
        Plot(id);
        DemoIn(id);
    }
    
    function init() {
        var dropdown = d3.select("#selDataset");

        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
            Plot(data.names[0]);
            DemoIn(data.names[0]);
        });
    }
    
    init();