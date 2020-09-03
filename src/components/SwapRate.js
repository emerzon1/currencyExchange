import React from 'react';

const SwapRate = (props) => {
    return (
        <div className="swap-rate-container">
            <button className="btn" onClick={props.onSwap}> Swap </button>
            <p>1 {props.selectedA} = {props.conversionRate} {props.selectedB}</p>
        </div>
    );
}

export default SwapRate;
