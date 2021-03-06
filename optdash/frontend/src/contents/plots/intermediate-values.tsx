import React, { useEffect, useState } from 'react';
import Plot from "react-plotly.js";
import ElementSelection from '../inputs/element-selection';
import fetch_data from "../../utils/fetch-data"

function InterMediatePlot(
    props: {
        study_summaries: Array<any>,
        study_name: string,
        setStudyName: (x: string) => void,
        height: number,
        width: number,
    }
) {
    const [plot_data, setPlotData] = useState([]);
    const study_name = props.study_name;
    const setStudyName = props.setStudyName;

    let study_names = props.study_summaries.map((x) => x["name"]);

    useEffect(() => {
        if (!study_names.includes(study_name)) { return }
        fetch_data(
            "/api/plot-data",
            [
                ["type", "intermediate-values"],
                ["study-name", study_name],
            ],
            setPlotData,
        );
    }, [study_name]);

    return (
        <div>
            <div className="param-selector">
                <ElementSelection candidates={study_names} display_name="Study Name" setter={setStudyName} default_value={study_name} />
            </div>

            <Plot
                data={plot_data}
                layout={
                    {
                        width: props.width,
                        height: props.height,
                        title: 'Intermediate values.',
                        xaxis: { title: "Step" },
                        yaxis: { title: "Value" },
                    }
                }
            />
        </div>
    );
}

export default InterMediatePlot;