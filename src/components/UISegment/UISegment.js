import React from 'react';
import './UISegment.css';

function Segment(props) {
    const list = props.segmentList;
    const selected = props.selectedSegment;

    const rendingSegmentBar = [];

    for (let i in list) {
        let currSegment = '';

        if (list[i] === selected) {
            currSegment = 
                <button key={list[i]} className="segment-btn segment-selected">
                    {list[i]}
                </button>
            ;
        } else {
            currSegment = 
                <button key={list[i]} className="segment-btn segment-selecteable" onClick={() => props.onClick(list[i])}>
                    {list[i]}
                </button>
            ;
        }

        rendingSegmentBar.push(currSegment);
    }

    return (
        <div className="ui-segment">
            {rendingSegmentBar}
        </div>
    );
}

export default Segment;